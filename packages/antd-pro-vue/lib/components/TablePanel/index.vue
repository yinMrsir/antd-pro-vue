<template>
  <div :class="['padding', style]">
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
    <template #headerCell="{ column }">
      <slot name="headerCell" v-bind="{ column }"></slot>
    </template>
      <template #bodyCell="{ column, text, record }">
        <slot name="bodyCell" v-bind="{ column, text, record }"></slot>
      </template>
    </a-table>
  </div>
</template>

<script>
import { useRequest } from "vue-request";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  props: {
    request: {
      type: Function,
      default: () => {}
    },
    columns: {
      type: Array,
      default: () => [],
    },
    style: String,
  },
  setup(props, context) {
    /**
     * 定义变量
     */
    const columns = props.columns;
    const dataSource = ref([]);
    const pagination = reactive({
      total: 0,
      current: 1,
    });
    /**
     * table 数据请求
     * @param params
     * @return {Promise<unknown>}
     */
    const queryData = (params) => props.request(params);
    let { run, loading } = useRequest(queryData, {
      defaultParams: [
        {
          pageSize: 10,
        },
      ],
      onError: () => {
        loading = false;
      },
      onSuccess: (res) => {
        /**
         * 此处可通过不同项目接口请求返回的列表数据进行修改
         */
        dataSource.value = res.data.list;
        pagination.total = res.data.total;
      },
    });
    /**
     * 点击切换分页
     * @param pag
     * @param filters
     * @param sorter
     */
    const handleTableChange = (pag, filters, sorter) => {
      Object.assign(pagination, pag);
      run({
        pageSize: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };

    /**
     * 请求table数据
     * @param params
     */
    const featTable = (params = {}) => {
      if (params.hasOwnProperty("page")) {
        pagination.current = params.page;
      }
      run({
        pageSize: pagination.pageSize,
        page: pagination.current,
        ...params,
      });
    };

    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      featTable,
    };
  },
});
</script>
