<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import zh_CN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";
import "moment/dist/locale/zh-cn";
moment.locale("zh-cn");

const zhCN = zh_CN;

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
