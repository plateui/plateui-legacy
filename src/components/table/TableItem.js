import renderItem from './renderItem'

export default {
  name: 'TableItem',
  props: {
    type: String,
    config: Object,
    item: Object,
    value: [String, Boolean, Number, Array, Object],
  },
  render (h) {
    let content = renderItem(h, this.type, this.value, this.config)
    if (this.config && this.config.route) {
      const routeTo = {
        name: this.config.route,
        params: this.item,
      }
      content = (<router-link to={routeTo}>{content}</router-link>)
    }
    const className = 'td-' + this.type
    return (<td class={className}>{content}</td>)
  },
}
