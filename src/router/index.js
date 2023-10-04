import Vue from "vue"
import VueRouter from "vue-router"
import Items from "../views/Items.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    alias: "/items",
    name: "Items",
    component: Items,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/items/:item_id",
    name: "Item",
    component: () => import("../views/Item.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
