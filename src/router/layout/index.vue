<template>
  <BasicLayout :headerConfig="headerConfig"></BasicLayout>
</template>

<script setup>
import { BasicLayout } from "antd-pro-vue";
import { message } from 'ant-design-vue'
import { useRouter } from "vue-router";

const router = useRouter();

const headerConfig = {
  username: 'admin',
  menuList: [],
  logout: () => {
    message.success("退出成功，即将跳转登录页...");
    setTimeout(() => {
      router.push("/login");
    }, 1500)
  },
};
</script>
