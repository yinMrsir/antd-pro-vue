<template>
  <BasicLayout :headerConfig="headerConfig"></BasicLayout>
</template>

<script setup>
import { BasicLayout } from "antd-pro-vue";
import { useStore } from "vuex";

const store = useStore();
import { userInfo, getLocalStorage } from '@/utils/storage'

const headerConfig = {
  username: getLocalStorage(userInfo).userInfo.username,
  menuList: [],
  logout: () => {
    store.dispatch('logout', {
      msg: '退出成功，即将跳转登录页...',
      time: 1.5
    })
  },
};
</script>
