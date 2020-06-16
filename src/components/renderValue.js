import moment from 'moment'
import Tag from './Tag'
import Audio from './Audio'

const components = {
  image (h, value, { style }) {
    if (typeof value === 'string') {
      return h('img', { attrs: { src: value }, style })
    }
    if (value && value.src) {
      return h('img', { attrs: value, style })
    } else {
      return h('span', { attrs: { class: 'image' }, style })
    }
  },
  audio (h, value) {
    if (value) {
      return h(Audio, { props: { src: value } })
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
  route (h, value, config) {
    if (!value) {
      return h('span', { attrs: { class: 'no-value' } }, ['-'])
    }
    const text = value.text || value.name || value.title
    const to = Object.assign({ params: value }, config)
    return h('router-link', { props: { to } }, [text])
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
