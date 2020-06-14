import icons from './icons'
import Tag from './Tag'
import Count from './Count'
import TableData from './table/TableData'
import LineChart from './charts/LineChart'

const _COMPONENTS = [
  Tag,
  Count,
  TableData,
  LineChart,
]

function install (Vue) {
  Vue.use(icons)
  Vue.component('p-chart', () => import('./charts/Chart.vue'))
  _COMPONENTS.forEach(C => {
    Vue.component('p-' + C.name, C)
  })
}

export default { install }
