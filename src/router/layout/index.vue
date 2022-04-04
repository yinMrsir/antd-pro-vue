<template>
  <BasicLayout :headerConfig="headerConfig"></BasicLayout>
</template>

<script setup>
import { computed } from 'vue'
import { BasicLayout } from "antd-pro-vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { sleep } from "@/utils";

const store = useStore();
const router = useRouter();
import { userInfo, getLocalStorage } from '@/utils/storage'

const headerConfig = {
  username: getLocalStorage(userInfo).userInfo.username,
  menuList: [],
  logout: async () => {
    await store.dispatch("logout");
    message.success("退出成功，即将跳转登录页...");
    await sleep(2);
    router.replace('/login')
  },
};
</script>
