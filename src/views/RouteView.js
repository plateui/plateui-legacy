import http from '@/services/http'
import renderViews from '@/services/render'

export default {
  name: 'Route',
  data () {
    return {
      loading: true,
      name: '',
      views: [],
    }
  },
  watch: {
    '$route.meta.endpoint': {
      immediate: true,
      async handler (endpoint) {
        this.loading = true
        const { data } = await http.get(endpoint)
        this.name = data.name
        this.views = data.views
        this.loading = false
      },
    },
  },
  render (createElement) {
    const children = renderViews(createElement, this.views)
    return createElement('div', { class: 'route-view' }, children)
  },
}
