import Vue from 'vue'
import VueRouter from 'vue-router'
import buildRoutes from './views'
import App from './App.vue'
import components from './components'
import http from './services/http'

Vue.use(VueRouter)
Vue.use(components)

Vue.config.productionTip = false
Vue.prototype.$http = http

export default {
  http,
  ready: false,
  app: null,
  async init (url) {
    const { data } = await http.get(url)
    const routes = buildRoutes(data.menus)
    const router = new VueRouter({ routes })
    const app = new Vue({
      router,
      render: h => h(App, { props: data }),
    })
    this.ready = true
    this.app = app
    return app
  },
}
