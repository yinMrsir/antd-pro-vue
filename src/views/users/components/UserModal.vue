<template>
  <div>
    <a-modal v-model:visible="visible" :title="title" @ok="onOk" forceRender>
      <form-panel
        ref="formPanel"
        :render-form="userModalColumns"
        :rules="userModalRules"
        :is-show-save-btn="false"
      />
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
import { FormPanel } from "antd-pro-vue";
import { sysRoleList } from "../service";

const userModalRules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
    },
  ],
  role_id: [
    {
      required: true,
      message: "请选择角色",
    },
  ],
  sex: [
    {
      required: true,
      message: "请选择性别",
    },
  ]
};

export default defineComponent({
  components: {
    FormPanel,
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const title = ref("新增");
    const formPanel = ref();
    const currId = ref("");

    const userModalColumns = reactive({
      username: {
        type: "input",
        label: "用户名",
        props: {
          placeholder: "请输入用户名",
        },
      },
      role_id: {
        type: "select",
        label: "角色",
        props: {
          placeholder: "请选择角色",
          options: [],
        },
      },
      sex: {
        type: "select",
        label: "性别",
        props: {
          placeholder: "请选择性别",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 2 },
          ],
        },
      },
      password: {
        type: "password",
        label: "密码",
        props: {
          placeholder: "请输入密码",
        },
      },
      mobile: {
        type: "input",
        label: "电话",
        props: {
          placeholder: "请输入电话",
        },
      },
      email: {
        type: "input",
        label: "邮箱",
        props: {
          placeholder: "请输入邮箱",
        },
      },
      birthday: {
        type: "datePicker",
        label: "生日",
        props: {
          placeholder: "请选择生日",
        },
      },
    });

    onMounted(async () => {
      const { data } = await sysRoleList();
      userModalColumns.role_id.props.options = data.map(value => ({ label: value.role_name, value: value.id }))
    });

    /**
     * 显示弹层并回显表单值
     */
    const showModal = (status, data = {}) => {
      visible.value = status;
      data.topTitle && (title.value = data.topTitle);
      if (data.data) {
        currId.value = data.data["id"];
        Object.keys(data.data).forEach((key) => {
          formPanel.value.setFieldValue(key, data.data[key]);
        });
      } else {
        currId.value = "";
      }
    };

    /**
     * 点击提交触发表单验证
     */
    const onOk = async () => {
      try {
        const data = await formPanel.value.onSubmit();
        emit("ok", {
          ...data,
          id: currId.value,
        });
      } catch (e) {}
    };

    /**
     * 如果弹层隐藏就重置表单
     */
    watch(visible, (newValue) => {
      if (!newValue) {
        formPanel.value.resetFields();
      }
    });

    return {
      userModalColumns,
      userModalRules,
      visible,
      title,
      formPanel,
      showModal,
      onOk,
    };
  },
});
</script>
