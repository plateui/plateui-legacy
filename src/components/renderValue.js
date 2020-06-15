import moment from 'moment'
import Tag from './Tag'

const components = {
  image (h, src, { style }) {
    if (src) {
      return h('img', { attrs: { src }, style })
    } else {
      return h('span', { attrs: { class: 'image' }, style })
    }
  },
  boolean (h, value, { style }) {
    if (value === true) {
      return h('svg-icon', { props: { name: 'check-circle' }, style })
    } else if (value === false) {
      return h('svg-icon', { props: { name: 'x-circle' }, style })
    } else {
      return h('svg-icon', { props: { name: 'circle' }, style })
    }
  },
  tag (h, value, { style }) {
    if (Array.isArray(value)) {
      return value.map(v => {
        if (v) {
          return h(Tag, { props: { value: v }, style })
        }
      })
    } else if (value) {
      return h(Tag, { props: { value }, style })
    }
  },
  link (h, value, { style, text }) {
    if (!value) {
      return h('span', { attrs: { class: 'no-value' } }, ['-'])
    }
    let href
    if (typeof value === 'string') {
      text = text || value
      href = value
    } else {
      text = value.text || text
      href = value.href
    }
    const attrs = { href, target: '_blank', rel: 'noopener noreferrer' }
    return h('a', { attrs, style }, [text])
  },
  datetime (h, value, { style, format }) {
    if (!value) {
      return h('span', { attrs: { class: 'no-value' } }, ['-'])
    }
    const attrs = { datetime: value }
    const text = moment(value).format(format)
    return h('time', { attrs, style }, [text])
  },
}

export default function (h, type, value, config) {
  const options = config || {}
  const style = options.style
  if (components[type]) {
    return components[type](h, value, options)
  } else if (value) {
    return h('span', { style }, [value])
  } else {
    return h('span', { style, attrs: { class: 'no-value' } }, ['-'])
  }
}
