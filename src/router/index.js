import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/NewMonku.vue')
  },
  {
    path: '/monku',
    name: 'monku',
    component: () => import('../views/Monku.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
