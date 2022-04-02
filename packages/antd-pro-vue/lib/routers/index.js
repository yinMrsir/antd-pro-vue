import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'
import { setPermissionRouter } from './permission'

const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes,
})

// 配置路由
export function setupRouter(app) {
  app.use(router)
  setPermissionRouter(router)
}

export default router
