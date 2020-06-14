import { compile } from 'path-to-regexp'
import http from '@/services/http'

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
    $route: {
      immediate: true,
      deep: true,
      async handler ({ meta, params }) {
        this.loading = true
        let endpoint = meta.endpoint
        if (Object.keys(params).length) {
          endpoint = compile(endpoint, { encode: encodeURIComponent })(params)
        }
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

function renderViews (createElement, views) {
  return views.map(view => {
    return renderItem(createElement, view)
  })
}

function renderGroup (createElement, views, className) {
  let grid = false
  const components = {}
  const cols = views.map(d => {
    components[d.component] = true
    const _classes = ['col']
    if (d.grid) {
      grid = true
      _classes.push(`col_${d.grid}`)
    }
    return createElement('div', { class: _classes }, [
      createElement('p-' + d.component, { props: d.data }),
    ])
  })
  const classes = ['row', `row_${cols.length}`]
  if (grid) {
    classes.push('grid')
  }
  if (Object.keys(components).length === 1) {
    classes.push('_same')
  }
  if (className) {
    classes.push(className)
  }
  return createElement('div', { class: classes }, cols)
}

function renderItem (createElement, view) {
  const children = []
  if (view.name) {
    children.push(createElement('h1', { class: 'section_title' }, [view.name]))
  }
  if (view.views) {
    children.push(renderGroup(createElement, view.views))
  } else {
    children.push(createElement('p-' + view.component, { props: view.data }))
  }
  return createElement('section', { class: 'section' }, children)
}
