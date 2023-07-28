import Vue from 'vue'
import {
  createPinia,
  PiniaVuePlugin
} from 'pinia'
import App from '@/App.vue'
import router from '@/router'
// import { Lazyload } from 'vant'
import InitApp from '@/system/init'
import apis from '@/apis'
import '@/common/flexible'

// import VConsole from 'vconsole/dist/vconsole.min.js'
// new VConsole()

// Vue.use(Lazyload, {
//   lazyComponent: true,
//   loading: 'https://s1.huishoubao.com/static/hw/placeholder.png',
//   error: 'https://s1.huishoubao.com/static/hw/placeholder.png'
// })

Vue.use(PiniaVuePlugin)

Vue.prototype.$apis = apis

new InitApp({
  App,
  router,
  store: createPinia(),
})
