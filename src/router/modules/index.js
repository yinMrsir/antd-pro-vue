export default {
  orderNo: 1,
  path: '',
  name: 'home',
  component: () => import('@/router/layout/index.vue'),
  hideChildrenInMenu: true,
  meta: {
    icon: 'HomeOutlined',
    title: '首页',
  },
  redirect: '/index',
  children: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index/index.vue'),
      meta: {}
    }
  ]
}
