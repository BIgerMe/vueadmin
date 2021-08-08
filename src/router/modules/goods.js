/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const goodsRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goods',
  name: '商品管理',
  meta: {
    title: '商品管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'add',
      component: () => import('@/views/goods/add'),
      name: '商品新增',
      meta: { title: '商品新增' },
    },
    {
      path: 'list',
      name: '商品列表',
      component: () => import('@/views/goods/list'),
      meta: { title: '商品列表' }
    }
  ]
}

export default goodsRouter
