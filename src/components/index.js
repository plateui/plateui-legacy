import icons from './icons'
import Tag from './Tag'
import Count from './Count'
import TableData from './table/TableData'

const _COMPONENTS = [
  Tag,
  Count,
  TableData,
]

function install (Vue) {
  Vue.use(icons)
  _COMPONENTS.forEach(C => {
    Vue.component('p-' + C.name, C)
  })
}

export default { install }
