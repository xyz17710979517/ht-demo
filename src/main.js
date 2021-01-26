import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入axios
import axios from './http/api'
import './plugins/element.js'
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
