import '@babel/polyfill'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import LoadScript from 'vue-plugin-load-script'
import VueRecaptcha from 'vue-recaptcha'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import cfg from '../config'

Vue.config.productionTip = false

Vue.prototype.$cfg = cfg

Vue.use(VeeValidate)
Vue.use(LoadScript)

Vue.loadScript("https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit")
  .then(() => {
    Vue.component('vue-recaptcha', VueRecaptcha)
  })
  .catch((e) => {
    console.error(`google api load failed: ${e.message}`)
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
