<template>
  <div class="search-section">
    <a-form>
      <a-row :gutter="10">
        <template v-for="(item, index) in renders">
          <a-col
            :key="index"
            :span="6"
            v-if="isUpStatus ? isUpStatus && index < 3 : true"
          >
            <a-form-item
              :label="item.label"
              :labelCol="{ span: 8 }"
              :wrapperCol="{ span: 16 }"
              :style="{ width: '100%', marginBottom: '8px' }"
            >
              <template v-if="item.type === 'input'">
                <a-input
                  v-bind="{ ...item.props }"
                  v-model:value="formData[item.key]"
                />
              </template>
              <template v-if="item.type === 'select'">
                <a-select
                  v-bind="{ ...item.props }"
                  v-model:value="formData[item.key]"
                />
              </template>
              <template v-if="item.type === 'datePicker'">
                <a-date-picker
                  v-bind="{ ...item.props }"
                  v-model:value="formData[item.key]"
                  style="width: 100%"
                />
              </template>
              <template v-if="item.type === 'rangePicker'">
                <a-range-picker
                  v-bind="{ ...item.props }"
                  v-model:value="formData[item.key]"
                  style="width: 100%"
                />
              </template>
            </a-form-item>
          </a-col>
        </template>
        <a-col :span="isUpStatus ? count : span" class="text-right padding-top">
          <a-button type="primary" class="search-btn" @click="onSearch">
            查询
          </a-button>
          <slot />
          <span v-if="renders.length > 3">
            <a class="ant-dropdown-link" @click="isUpStatus = !isUpStatus">
              {{ isUpStatus ? "更多筛选" : "收起" }}
              <DownOutlined v-if="isUpStatus" />
              <UpOutlined v-else />
            </a>
          </span>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";

function computeSpan(number) {
  switch (number % 4) {
    case 0:
      return 24;
    case 1:
      return 18;
    case 2:
      return 12;
    case 3:
      return 6;
    default:
      return 0;
  }
}

export default defineComponent({
  props: {
    renderForm: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const { renderForm, value: formData } = props;
    const isUpStatus = ref(true);
    const count = computed(() =>
      Object.keys(renderForm).length < 4
        ? computeSpan(Object.keys(renderForm).length)
        : 6
    );
    const span = computed(() => computeSpan(Object.keys(renderForm).length));
    const renders = computed(() => {
      let arr = [];
      Object.keys(renderForm).forEach((key) => {
        arr.push({
          ...renderForm[key],
          key,
        });
      });
      return arr;
    });
    /**
     * 监听formData的变化，把值返回的父组件 实现双向数据绑定
     */
    watch(formData, (newValue) => {
      context.emit("value", newValue);
    });

    const onSearch = () => {
      context.emit("search", formData);
    };

    return {
      onSearch,
      renders,
      formData,
      isUpStatus,
      count,
      span,
    };
  },
});
</script>

<style lang="less" scoped>
@import "@/assets/less/var.less";

.search-section {
  width: 100%;
  padding: @padding @padding 16px @padding;
  border-bottom: @bgColor @margin solid;

  .search-btn {
    margin-right: 8px;
  }

  .padding-top {
    padding-top: 3px;
  }

  .ant-dropdown-link {
    display: inline-block;
    margin-left: 8px;
  }
}
</style>
