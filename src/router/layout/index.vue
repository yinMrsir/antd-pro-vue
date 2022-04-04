<template>
  <BasicLayout :headerConfig="headerConfig"></BasicLayout>
</template>

<script setup>
import { BasicLayout } from 'antd-pro-vue'

const headerConfig = {
  username: '前端老鹰',
  menuList: [],
  logout: () => {}
}
</script>