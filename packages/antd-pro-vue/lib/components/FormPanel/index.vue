<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item
      :label="item.label"
      v-bind="validateInfos[key]"
      v-for="(item, key) in renderForm"
      :key="key"
    >
      <template v-if="item.scopedSlots && item.scopedSlots.customRender">
        <slot
          :name="item.scopedSlots.customRender"
          v-bind="{ ...item.props }"
        ></slot>
      </template>
      <template v-else>
        <template v-if="item.type === 'input' || item.type === 'password'">
          <a-input
            :type="item.type"
            v-model:value="modelRef[key]"
            v-bind="{ ...item.props }"
          />
        </template>
        <template v-if="item.type === 'select'">
          <a-select v-model:value="modelRef[key]" v-bind="{ ...item.props }" />
        </template>
        <template v-if="item.type === 'checkbox'">
          <a-checkbox-group
            v-model:value="modelRef[key]"
            v-bind="{ ...item.props }"
          />
        </template>
        <template v-if="item.type === 'datePicker'">
          <a-date-picker v-model:value="modelRef[key]" v-bind="{ ...item.props }" />
        </template>
      </template>
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: wrapperCol.span, offset: labelCol.span }"
      v-if="isShowSaveBtn"
    >
      <a-button type="primary" @click.prevent="onSubmit">提交</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { defineComponent, toRaw, watch, reactive } from "vue";
import { Form } from 'ant-design-vue';

const useForm = Form.useForm;
export default defineComponent({
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item
  },
  props: {
    renderForm: {
      type: Object,
      default: () => ({}),
    },
    defaultValue: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    isShowSaveBtn: {
      type: Boolean,
      default: true,
    },
    labelCol: {
      type: Object,
      default: () => ({ span: 6 }),
    },
    wrapperCol: {
      type: Object,
      default: () => ({ span: 14 }),
    },
  },
  setup(props, { emit }) {
    const { defaultValue, rules, renderForm } = props;
    /**
     * 设置表单初始值
     * @type {{}}
     */
    let modeRefTemp = {};
    Object.keys(renderForm).forEach((key) => {
      modeRefTemp[key] = defaultValue[key] || undefined;
    });
    const modelRef = reactive(modeRefTemp);
    const rulesRef = reactive(rules);
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );
    /**
     * 点击确定提交按钮
     */
    const onSubmit = () => {
      return new Promise((resolve, reject) => {
        validate()
          .then(() => {
            emit("submit", toRaw(modelRef));
            resolve(toRaw(modelRef));
          })
          .catch(() => {
            reject(new Error("验证不通过"));
          });
      });
    };

    /**
     * 设置表单字段值
     * @param key
     * @param value
     */
    const setFieldValue = (key, value) => {
      modelRef[key] = value;
    };

    /**
     * 监听表单值变化，触发change事件
     */
    watch(modelRef, (newValue) => {
      emit("change", newValue);
    });

    return {
      validateInfos,
      validate,
      resetFields,
      modelRef,
      onSubmit,
      setFieldValue,
    };
  },
});
</script>
