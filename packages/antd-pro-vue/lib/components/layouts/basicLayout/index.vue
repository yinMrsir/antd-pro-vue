<template>
  <a-layout class="components-layout-base" style="min-height: 100vh;">
    <SliderLayout :collapsed="collapsed" @setCollapsed="setCollapsed"/>
    <a-layout class="right-layout_height">
      <HeaderLayout :collapsed="collapsed" @setCollapsed="setCollapsed" :headerConfig="headerConfig"/>
      <BreadcrumbLayout v-if="breadcrumb"/>
      <a-layout-content class="layout-content">
        <div style="background: #fff" class="margin-bottom">
          <router-view/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SliderLayout from './components/SliderLayout.vue'
import HeaderLayout from './components/HeaderLayout.vue'
import BreadcrumbLayout from './components/BreadcrumbLayout.vue'

export default defineComponent({
  components: {
    SliderLayout,
    HeaderLayout,
    BreadcrumbLayout,
  },
  props: {
    breadcrumb: {
      type: Boolean,
      default: true,
    },
    headerConfig: {
      type: Object,
      default: {
        logout: () => {}
      }
    }
  },
  setup() {
    const collapsed = ref(false);

    const setCollapsed = (data) => {
      collapsed.value = data
    }

    return {
      collapsed,
      setCollapsed
    }
  }
})
</script>

<style lang="less">
@import '../../../assets/less/var.less';

.components-layout-base {
  .layout-content {
    min-height: 280px;
    margin: @margin @margin @margin @margin;
    background: #fff;
  }

  .right-layout_height {
    max-height: 100vh;
    overflow-y: auto;
  }
}
</style>
