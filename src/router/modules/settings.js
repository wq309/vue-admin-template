import Layout from '@/layout'

export default {
  path: '/settings',
  component: Layout,
  children: [{
    path: '', // 作为默认渲染路由
    name: 'settings',
    component: () => import('@/views/settings/settings.vue'),
    meta: { title: '公司设置', icon: 'settings' }
  }]
}
