import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'
import VueImgOrientationChanger from 'vue-img-orientation-changer'

Vue.use(Meta)
Vue.use(VueImgOrientationChanger)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
