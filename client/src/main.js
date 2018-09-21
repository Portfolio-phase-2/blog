import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = process.env.NODE_ENV === 'development'
Vue.prototype.$baseUrl = 'https://tulisinapi.padangjs.com'
Vue.prototype.$eventHub = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
