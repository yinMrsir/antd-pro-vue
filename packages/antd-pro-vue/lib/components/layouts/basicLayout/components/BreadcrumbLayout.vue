<template>
  <div class="breadcrumb-layout">
    <a-breadcrumb>
      <template v-for="item in list">
        <a-breadcrumb-item  :key="item" v-if="item.meta.title">{{ item.meta.title }}</a-breadcrumb-item>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const list = computed(() => router.currentRoute.value.matched)
    return {
      list
    }
  }
})
</script>

<style lang="less" scoped>
.breadcrumb-layout {
  padding: 14px 0 0 0;
  background: #fff;
  height: 30px;

  h1 {
    padding-top: 5px;
    font-size: 20px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
