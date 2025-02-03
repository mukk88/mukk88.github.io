import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dice',
      name: 'dice',
      // route level code-splitting
      // this generates a separate chunk (Dice.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DiceView.vue'),
    },
    {
      path: '/food',
      name: 'food',
      component: () => import('../views/FoodView.vue'),
    },
  ],
})

export default router
