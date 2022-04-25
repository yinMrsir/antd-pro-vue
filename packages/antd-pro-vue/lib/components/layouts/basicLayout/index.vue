<template>
  <a-layout class="components-layout-base" style="min-height: 100vh;">
    <SliderLayout :collapsed="collapsed" @setCollapsed="setCollapsed" @addPanes="addPanes" />
    <a-layout class="right-layout_height">
      <HeaderLayout :collapsed="collapsed" @setCollapsed="setCollapsed" :headerConfig="headerConfig">
        <BreadcrumbLayout v-if="breadcrumb"/>
      </HeaderLayout>
      <a-layout-content class="layout-content">
        <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit" :tabBarStyle="{ paddingLeft: '5px', paddingTop: '5px' }" v-if="navTab">
          <a-tab-pane v-for="(pane, index) in panes" :key="pane.name" :tab="pane.meta.title" :closable="index !== 0"></a-tab-pane>
        </a-tabs>
        <div style="background: #fff; padding-left: 5px;">
          <router-view/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import SliderLayout from './components/SliderLayout.vue'
import HeaderLayout from './components/HeaderLayout.vue'
import BreadcrumbLayout from './components/BreadcrumbLayout.vue'
import { useRouter } from "vue-router";

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
    },
    navTab: {
      type: Boolean,
      default: true,
    }
  },
  setup() {
    const router = useRouter();
    const collapsed = ref(false);
    const panes = ref([router.options.routes.find(value => value.name === 'index')]);
    const activeKey = ref(panes.value[0].name);

    const setCollapsed = (data) => {
      collapsed.value = data
    }

    const addPanes = (item) => {
      // 如果不存在 添加到选项卡
      if (!panes.value.find(value => value.name === item.name)) {
        panes.value.push(item)
        activeKey.value = item.name;
      }
    }

    addPanes(router.currentRoute.value);

    watch(() => router.currentRoute.value, (value) => {
      activeKey.value = value.name;
    })

    watch(activeKey, (name) => {
      router.push({ name })
    })

    const onEdit = (targetKey, action) => {
      if (action === 'add') {
      } else {
        let index = panes.value.findIndex(value => value.name === targetKey);
        panes.value = panes.value.filter(value => value.name !== targetKey);
        activeKey.value = panes.value[--index].name;
      }
    };

    return {
      collapsed,
      setCollapsed,
      panes,
      activeKey,
      addPanes,
      onEdit
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
