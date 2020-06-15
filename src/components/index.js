import icons from './icons'
import Tag from './Tag'
import Empty from './Empty'
import Spinner from './Spinner'
import Count from './count/Count'
import CountStats from './count/CountStats'
import TableData from './table/TableData'
import ListData from './list/ListData'
import Chart from './charts/Chart'
import LineChart from './charts/LineChart'

const _COMPONENTS = [
  Tag,
  Empty,
  Spinner,
  Count,
  CountStats,
  TableData,
  ListData,
  Chart,
  LineChart,
]

function install (Vue) {
  Vue.use(icons)
  _COMPONENTS.forEach(C => {
    Vue.component('p-' + C.name, C)
  })
}

export default { install }
