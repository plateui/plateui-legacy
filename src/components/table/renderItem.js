import Tag from '../Tag'

const components = {
  image (h, src, config) {
    if (src) {
      let style = {}
      if (config) {
        style = config.style || {}
      }
      return h('img', { attrs: { src }, style })
    } else {
      return h('span', ['-'])
    }
  },
  boolean (h, value) {
    if (value === true) {
      return h('svg-icon', { props: { name: 'check-circle' } })
    } else if (value === false) {
      return h('svg-icon', { props: { name: 'x-circle' } })
    } else {
      return h('svg-icon', { props: { name: 'circle' } })
    }
  },
  tag (h, value) {
    if (Array.isArray(value)) {
      return value.map(v => {
        if (v) {
          return h(Tag, { props: { value: v } })
        }
      })
    } else if (value) {
      return h(Tag, { props: { value } })
    }
  },
  link (h, value) {
    if (!value) {
      return h('span', ['-'])
    }
    let text, href
    if (typeof value === 'string') {
      text = value
      href = value
    } else {
      text = value.text
      href = value.href
    }
    const attrs = { href, target: '_blank', rel: 'noopener noreferrer' }
    return h('a', { attrs }, [text])
  },
}

export default function (h, type, value, config) {
  if (components[type]) {
    return components[type](h, value, config)
  } else {
    return h('span', [value])
  }
}
