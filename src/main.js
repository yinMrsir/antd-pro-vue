import { createApp } from 'vue'
import { init } from 'antd-pro-vue'
import App from './App.vue'
import { setupStore } from './store'
import routes, { asyncRoutes } from './router'
import { userInfo, getLocalStorage } from '@/utils/storage'


const app = createApp(App)
let isNeedGetRoutes = true

// 配置vuex store
setupStore(app)

init(app, {
  routesConfig: {
    routes,
    beforeEach: async (router, { to, from, next }) => {
      if (to.path === '/login') {
        next()
      } else {
        const userInfoData = getLocalStorage(userInfo)
        if (!userInfoData) {
          next({ path: '/login' })
        } else {
          if (isNeedGetRoutes) {
            /**
             * 获取动态路由列表
             * 此处只获取，路由权限过滤
             */
            asyncRoutes.forEach(route => {
              router.addRoute(route)
            })
            /**
             * 添加到路由options列表中，如果不执行此步骤会导致动态路由不能在左侧的菜单显示
             */
            router.options.routes.push(...asyncRoutes)
            isNeedGetRoutes = false
            next({ ...to, replace: true })
          } else {
            next()
          }
        }
      }
    }
  }
});

app.mount('#app')
