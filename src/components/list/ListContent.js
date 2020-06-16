import _get from 'lodash/get'
import renderValue from '../renderValue'

const ListRow = {
  name: 'ListRow',
  props: {
    media: Object,
    title: [String, Object],
    subtitle: [String, Object],
    information: Array,
    metadata: [String, Object],
    item: Object,
  },
  render (h) {
    const propElement = (prop, type) => {
      if (typeof prop === 'string') {
        prop = { key: prop }
      }
      const value = _get(this.item, prop.key)
      const content = renderValue(h, type || prop.type, value, prop.config)
      if (prop.config && prop.config.route) {
        const routeTo = {
          name: prop.config.route,
          params: this.item,
        }
        return (<router-link to={routeTo}>{content}</router-link>)
      }
      return content
    }

    const children = []

    if (this.media && this.media.key) {
      children.push((<div class="list_media">
        {propElement(this.media, 'image')}
      </div>))
    }

    const content = []
    if (this.title) {
      content.push(<h3 class="list_title">
        {propElement(this.title)}
      </h3>)
    }
    if (this.subtitle) {
      content.push(<h4 class="list_subtitle">
        {propElement(this.subtitle)}
      </h4>)
    }
    if (this.information) {
      const infoChildren = this.information.map(prop => {
        let className = 'list_infoitem'
        if (prop.type) {
          className = `${className} ${prop.type}`
        }
        return (<span class={className}>{propElement(prop)}</span>)
      })
      content.push(<div class="list_info">{infoChildren}</div>)
    }
    if (this.metadata) {
      children.push(<div class="list_main">
        <div class="list_content">{content}</div>
        <div class="list_meta">{propElement(this.metadata)}</div>
      </div>)
    } else {
      children.push(<div class="list_main">
        <div class="list_content">{content}</div>
      </div>)
    }
    return (<li class="list_row">{children}</li>)
  },
}

export default {
  name: 'list-content',
  props: {
    media: Object,
    title: [String, Object],
    subtitle: [String, Object],
    information: Array,
    metadata: [String, Object],
    items: Array,
  },
  render () {
    const rows = this.items.map(item => {
      return (<ListRow item={item} media={this.media}
        title={this.title} subtitle={this.subtitle}
        information={this.information} metadata={this.metadata}
      />)
    })
    return (<ul>{rows}</ul>)
  },
}
