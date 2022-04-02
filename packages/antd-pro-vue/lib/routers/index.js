import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes,
})

// 配置路由
export function setupRouter(app) {
  app.use(router)
}

export default router
