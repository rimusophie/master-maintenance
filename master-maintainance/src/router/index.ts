import { createRouter, createWebHistory } from "vue-router"
import TablesView from "@/views/TablesView.vue"
import RecordListView from "@/views/RecordListView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TablesView,
    },
    {
      path: "/records",
      name: "records",
      component: RecordListView,
      children: [
        {
          path: "blog_categories",
          name: "blog_categories",
          component: () => import("@/views/BlogCategoriesView.vue"),
        },
        {
          path: "blogs",
          name: "blogs",
          component: () => import("@/views/BlogsView.vue"),
        }
      ],
    },
  ]
})

export default router
