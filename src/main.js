import { createApp } from 'vue'
import { init } from 'antd-pro-vue'
import App from './App.vue'
import routes, { asyncRoutes } from './router'

const app = createApp(App)
let isNeedGetRoutes = true

init(app, {
  routesConfig: {
    history: 'hash',
    routes,
    beforeEach: async (router, { to, from, next }) => {
      if (isNeedGetRoutes) {
        /**
         * 添加动态路由
         * 可在此处过滤无权限路由
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
});

app.mount('#app')
