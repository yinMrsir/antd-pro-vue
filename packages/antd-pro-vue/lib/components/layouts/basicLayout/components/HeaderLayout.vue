<template>
  <a-layout-header class="header-layout">
    <div style="display: flex;">
      <div>
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="emit('setCollapsed', false)"/>
        <menu-fold-outlined v-else class="trigger" @click="emit('setCollapsed', true)"/>
      </div>
      <slot></slot>
    </div>
    <div class="header-layout-right">
      <a-dropdown class="user-info">
        <div>
          <img :src="headerConfig.avatar || defaultHeader" alt="" />
          <span>{{ headerConfig.username || '-' }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="(item, index) in headerConfig.menuList" :key="index" @click="item.onClick">{{ item.text }}</a-menu-item>
            <a-menu-item>
              <a @click="headerConfig.logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
import { defineComponent } from 'vue'
import defaultHeader from '../../../../assets/images/default-head.png'

export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    headerConfig: {
      type: Object,
      default: {
        logout: () => {}
      }
    }
  },
  setup(props, { emit }) {
    return {
      defaultHeader,
      emit
    }
  }
})
</script>

<style lang="less" scoped>
.header-layout {
  height: 48px;
  padding: 0;
  line-height: 48px;
  background: #fff;
  border-bottom: #dedede solid 1px;

  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 60px;
    cursor: pointer;
    transform: translateY(-2px);
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .header-layout-right {
    float: right;
    padding-right: 20px;

    .user-info {
      img {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
  }
}
</style>
