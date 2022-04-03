export default {
  orderNo: 2,
  path: '',
  name: 'users',
  component: () => import('@/layouts/basicLayout/index.vue'),
  meta: {
    icon: 'TeamOutlined',
    title: '用户管理',
  },
  redirect: '/users/list',
  children: [
    {
      path: '/users/list',
      name: 'usersList',
      component: () => import('@/views/users/list.vue'),
      meta: {
        title: '用户列表',
      }
    },
    {
      path: '/users/info',
      name: 'usersInfo',
      hidden: true,
      component: () => import('@/views/users/info.vue'),
      meta: {
        parentName: 'usersList',
        title: '用户详情',
      }
    }
  ]
}
