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
    path: '/monku',
    name: 'monku',
    component: () => import('../views/Monku.vue')
  },
  {
    path: '/new_monku',
    name: 'new_monku',
    component: () => import('../views/NewMonku.vue')
  },
  {
    path: '/new_proposal',
    name: 'new_proposal',
    component: () => import('../views/NewProposal.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
