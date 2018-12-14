import '@babel/polyfill'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import LoadScript from 'vue-plugin-load-script'
import VueRecaptcha from 'vue-recaptcha'
import VueAnalytics from 'vue-analytics'
import Trend from 'vuetrend'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import cfg from '../config'

Vue.config.productionTip = false

Vue.prototype.$cfg = cfg
if (process.env.NODE_ENV === 'production' && location.protocol === 'http:' && cfg.httpsOnly) location.replace(`https://${location.hostname}`)
Vue.use(VeeValidate)
Vue.use(LoadScript)
Vue.use(VueAnalytics, {
  id: cfg.analyticsID,
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})
Vue.use(Trend)

Vue.loadScript('https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
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
