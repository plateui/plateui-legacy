import './css/index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import buildRoutes from './views'
import App from './App.vue'
import components from './components'
import http from './services/http'

Vue.use(VueRouter)
Vue.use(components)

Vue.config.productionTip = false

export default {
  http,
  ready: false,
  app: null,
  component (Comp) {
    // register external components
    if (/^(p|x)-/.test(Comp.name)) {
      Vue.component(Comp.name, Comp)
    } else {
      Vue.component('x-' + Comp.name, Comp)
    }
  },
  async init (url, el) {
    Vue.prototype.$http = this.http
    const { data } = await this.http.get(url)
    const routes = buildRoutes(data)
    const router = new VueRouter({ routes })
    const app = new Vue({
      router,
      render: h => h(App, { props: data }),
    })
    this.ready = true
    this.app = app
    if (el) {
      app.$mount(el)
    }
    return app
  },
}
