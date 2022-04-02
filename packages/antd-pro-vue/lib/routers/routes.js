const modules = import.meta.globEager('./modules/**/*.js');
const routeModuleList = [];
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList]

export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: '/index',
  hide: true
};

export const LoginRoute = {
  path: '/login',
  name: 'login',
  hidden: true,
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  }
}

// 基础路由 不用权限
export const basicRoutes = [LoginRoute, RootRoute]
