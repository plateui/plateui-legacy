import icons from './icons'
import Count from './Count'
import Table from './table/Table'

const _COMPONENTS = [
  Count,
  Table,
]

function install (Vue) {
  Vue.use(icons)
  _COMPONENTS.forEach(C => {
    if (/^p-/.test(C.name)) {
      Vue.component(C.name, C)
    } else {
      Vue.component('p-' + C.name, C)
    }
  })
}

export default { install }
