import icons from './icons'
import Count from './Count'

const _COMPONENTS = [
  Count,
]

function install (Vue) {
  Vue.use(icons)
  _COMPONENTS.forEach(C => {
    Vue.component('p-' + C.name, C)
  })
}

export default { install }
