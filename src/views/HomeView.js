import renderViews from '@/services/render'

export default {
  name: 'Home',
  render (createElement) {
    const children = renderViews(createElement, this.$parent.overview)
    return createElement('div', { class: 'route-view' }, children)
  },
}
