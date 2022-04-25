export default {
  orderNo: 1,
  path: '',
  name: 'list',
  component: () => import('@/router/layout/index.vue'),
  meta: {
    icon: 'HomeOutlined',
    title: '新闻',
  },
  redirect: '/list',
  children: [
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/list/index.vue'),
      meta: {
        icon: 'HomeOutlined',
        title: '数据列表',
      },
    }
  ]
}
