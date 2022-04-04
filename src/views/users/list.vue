<template>
  <div>
    <search-panel
      v-model:value="formData"
      :render-form="renderForm"
      @search="onSearch"
    >
      <a-button @click="setUserModalVisible('新增')">新增</a-button>
    </search-panel>
    <table-panel ref="refTablePanel" :columns="columns" :request="getUserList">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'sex'">
          {{ sexObject[text] }}
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <router-link :to="{ name: 'usersInfo', query: { id: record.id } }">
              查看
            </router-link>
            <a-divider type="vertical" v-if="+record.id !== 1" />
            <a
              @click="setUserModalVisible('修改', record)"
              v-if="+record.id !== 1"
              >修改</a
            >
            <a-divider type="vertical" v-if="+record.id !== 1" />
            <a @click="onDelete(record)" v-if="+record.id !== 1">删除</a>
          </span>
        </template>
      </template>
    </table-panel>
    <user-modal ref="userModal" render-form="userModalColumns" @ok="onOk" />
  </div>
</template>
<script>
import dayjs from "dayjs";
import {
  defineComponent,
  ref,
  reactive,
  watch,
  createVNode,
  onMounted,
  toRaw,
} from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { SearchPanel, TablePanel } from "antd-pro-vue";
import UserModal from "@/views/users/components/UserModal.vue";
import { userAdd, userUpdate, userDel } from "@/views/users/service";
import { message, Modal } from "ant-design-vue";
import { sysRoleList, getUserList } from "./service";

const sexObject = {
  1: "男",
  2: "女",
};

const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    sorter: true,
  },
  {
    title: "角色",
    key: "role_name",
    dataIndex: ["sys_role", "role_name"],
  },
  {
    title: "性别",
    key: "sex",
    dataIndex: "sex",
  },
  {
    title: "电话",
    dataIndex: "mobile",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "出生日期",
    key: "birthday",
    dataIndex: "birthday",
  },
  {
    title: "创建时间",
    key: "createdAt",
    dataIndex: "createdAt",
  },
  {
    title: "操作",
    key: "action",
  },
];

export default defineComponent({
  components: {
    SearchPanel,
    TablePanel,
    UserModal,
  },
  setup() {
    const refTablePanel = ref();
    const userModal = ref();
    let formData = reactive({});
    const renderForm = reactive({
      username: {
        label: "用户名",
        type: "input",
        props: {
          allowClear: true,
          placeholder: "请输入用户名",
        },
      },
      role_id: {
        label: "角色",
        type: "select",
        props: {
          allowClear: true,
          placeholder: "请选择角色",
          options: [],
        },
      },
      sex: {
        label: "性别",
        type: "select",
        props: {
          allowClear: true,
          placeholder: "请选择性别",
          options: (() => {
            const arr = [];
            Object.keys(sexObject).forEach((key) => {
              arr.push({ label: sexObject[key], value: key });
            });
            return arr;
          })(),
        },
      },
      mobile: {
        label: "电话",
        type: "input",
        props: {
          allowClear: true,
          placeholder: "请选择电话",
        },
      },
      birthday: {
        label: "出生日期",
        type: "rangePicker",
        props: {
          allowClear: true,
          placeholder: ["开始日期", "结束日期"],
        },
      },
    });

    onMounted(async () => {
      const { data } = await sysRoleList();
      renderForm.role_id.props.options = data.map((value) => ({
        label: value.role_name,
        value: value.id,
      }));
    });

    /**
     * 显示UserModal组件
     */
    const setUserModalVisible = (topTitle, data) => {
      userModal.value.showModal(true, {
        topTitle,
        data:
          topTitle === "修改"
            ? {
                id: data.id,
                username: data.username,
                sex: data.sex,
                role_id: data.role_id,
                mobile: data.mobile,
                email: data.email,
                birthday: data.birthday
                  ? dayjs(data.birthday, "YYYY-MM-DD")
                  : "",
              }
            : {},
      });
    };

    /**
     * 提交新增/修改用户
     */
    const onOk = async (data) => {
      if (data.id) {
        await userUpdate({
          id: data.id,
          ...data,
          birthday: dayjs(data.birthday).format("YYYY-MM-DD"),
        });
        message.success("更新成功");
      } else {
        await userAdd({
          ...data,
          birthday: dayjs(data.birthday).format("YYYY-MM-DD"),
        });
        message.success("创建成功");
      }
      userModal.value.showModal(false);
      refTablePanel.value.featTable({ page: 1 });
    };

    const onDelete = (data) => {
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: `您确定要删除用户【${data.username}】吗?`,
        cancelText: "取消",
        okText: "确定",
        onOk: async () => {
          await userDel({ id: data.id });
          message.success("删除成功");
          refTablePanel.value.featTable();
        },
      });
    };

    /**
     * 点击搜索 请求table列表数据接口
     */
    const onSearch = (data) => {
      const params = { ...data }
      if (data.birthday) {
        params.birthdayStart = dayjs(data.birthday[0]).format('YYYY-MM-DD')
        params.birthdayEnd =  dayjs(data.birthday[1]).format('YYYY-MM-DD')
        delete params.birthday
      }
      refTablePanel.value.featTable({
        ...params,
        page: 1,
      });
    };

    /**
     * 监听筛选表单数据变化
     */
    watch(formData, (newValue) => {
      console.log(`筛选表单数据发生了变化`, newValue);
    });

    return {
      getUserList,
      sexObject,
      columns,
      renderForm,
      formData,
      refTablePanel,
      userModal,
      onSearch,
      setUserModalVisible,
      onOk,
      onDelete,
    };
  },
});
</script>
