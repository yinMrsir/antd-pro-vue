import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// 配置路由
export function setupRouter(app, { routes, history, beforeEach, afterEach }) {
  const router = createRouter({
    history: history === 'hash' ? createWebHashHistory() : createWebHistory(),
    routes,
  });

  app.use(router);

  typeof beforeEach ==='function' && router.beforeEach((to, from, next) => {
    beforeEach(router, { to, from, next })
  });

  typeof afterEach ==='function' &&  router.afterEach((to, from) => {
    afterEach(router, { to, from })
  })
}