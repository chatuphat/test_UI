import { createRouter, createWebHistory } from 'vue-router'
import  show_users from '../views/show_users.vue'
import add_user from '../views/add_users.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: show_users
    },
    {
      path: '/add_user',
      component: add_user
    },
  ]
})

export default router
