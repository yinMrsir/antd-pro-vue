<template>
  <div class="login-page">
    <div class="login-box">
      <h1 style="text-align: center">后台管理系统</h1>
      <form-panel
        ref="formPanel"
        :render-form="renderForm"
        :rules="rules"
        :isShowSaveBtn="false"
        :wrapperCol="{span: 15}"
      >
        <template #code>
          <a-row>
            <a-col :span="12">
              <a-input
                v-model:value="formData.code"
                placeholder="请输入验证码"
              />
            </a-col>
            <a-col :span="12">
              <div style="padding: 0 15px 0">
                <div id="v_container" style="height: 30px"></div>
              </div>
            </a-col>
          </a-row>
        </template>
      </form-panel>
      <div class="login-button">
        <a-button type="primary" block size="large" @click="onLogin">登 录</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { FormPanel } from "antd-pro-vue";
import { GVerify } from "@/plugins/index";
import { userLogin } from "./service";

const renderForm = {
  username: {
    type: "input",
    label: "用户名",
    props: {
      placeholder: "用户名：admin",
    },
  },
  password: {
    type: "password",
    label: "密码",
    props: {
      placeholder: "密码: admin",
    },
  },
  code: {
    label: "验证码",
    scopedSlots: { customRender: "code" },
  },
};

const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
  code: [{ required: true, message: "请输入验证码" }],
};

export default defineComponent({
  components: {
    FormPanel,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const formData = reactive({
      code: "",
    });
    const formPanel = ref();
    let verifyCode = null;

    const onLogin = async () => {
      if (!verifyCode.validate(formData.code)) {
        message.error("验证码错误");
        return;
      }
      const params = await formPanel.value.onSubmit();
      const { data } = await userLogin(params);
      await store.dispatch("login", data);
      message.success("登录成功");
      router.push("/");
    };

    /**
     * 设置FormPanel组件中code的值，保证验证能通过
     */
    watch(formData, (newValue) => {
      formPanel.value.setFieldValue("code", newValue.code);
    });

    onMounted(() => {
      verifyCode = new GVerify({
        id: "v_container",
      });
    });

    return {
      renderForm,
      rules,
      formData,
      formPanel,
      onLogin,
    };
  },
});
</script>

<style lang="less" scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  background: url("../../assets/images/banner.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    width: 475px;
    background: #fff;
    padding: 20px;
    transform: translateY(-60px);
    box-shadow: 0px 0px 10px 2px rgb(0 0 0 / 45%);
    border-radius: 5px;
    h1 {
      padding: 20px 0;
    }
    .login-button {
      margin:40px 0 20px 0;
      padding: 0 55px 0 49px;
    }
  }
}
</style>
