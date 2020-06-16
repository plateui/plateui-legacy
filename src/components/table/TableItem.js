import _get from 'lodash/get'
import renderValue from '../renderValue'

export default {
  name: 'TableItem',
  props: {
    type: String,
    config: Object,
    item: Object,
    value: [String, Boolean, Number, Array, Object],
  },
  render (h) {
    let content = renderValue(h, this.type, this.value, this.config)
    if (this.config && this.config.route) {
      const routeTo = Object.assign({ params: this.item }, this.config.route)
      content = (<router-link to={routeTo}>{content}</router-link>)
    } else if (this.config && this.config.href) {
      const href = _get(this.item, this.config.href)
      if (href) {
        content = (<a href={href} target='_blank' rel='noopener noreferrer'>{content}</a>)
      }
    }
    const className = 'td-' + (this.type || 'none')
    return (<td class={className}>{content}</td>)
  },
}
