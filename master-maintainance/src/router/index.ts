import { createRouter, createWebHistory } from 'vue-router'
import TablesView from '@/views/TablesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TablesView
    },
    {
      path: '/blog_categories',
      name: 'blog_categories',
      component: () => import('@/views/BlogCategoriesView.vue')
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import('@/views/BlogCategoriesView.vue')
    }
  ]
})

export default router
