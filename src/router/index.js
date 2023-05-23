import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'houseView',
      component: () => import('../views/HouseView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/houses/:id',
      name: 'houseDetail',
      component: () => import('../views/HouseDetails.vue')
    },
    {
      path: '/houses/:id/edit',
      name: 'houseEdit',
      component: () => import('../views/HouseEdit.vue')
    },
    {
      path: '/houses/create',
      name: 'houseCreate',
      component: () => import('../views/HouseCreate.vue')
    }
  ]
})

export default router
