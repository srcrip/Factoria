import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import VueTimers from 'vue-timers'

// Vue.prototype.$notifications = new Vue(Game)

import './assets/sass/app.sass'

Vue.use(Buefy)
Vue.use(VueTimers)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
