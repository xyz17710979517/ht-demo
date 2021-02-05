import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入axios
import axios from './http/api'
import './plugins/element.js'
Vue.prototype.$http = axios;
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.config.productionTip = false
//将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
