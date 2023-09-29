import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import VueAxios from "vue-axios"
import VueCookies from "vue-cookies"
import vuetify from "./plugins/vuetify"

axios.defaults.baseURL = process.env.VUE_APP_MENDOKUSAI_API_URL

Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
