import icons from './icons'
import Empty from './fragments/Empty'
import Spinner from './fragments/Spinner'
import Count from './count/Count'
import CountStats from './count/CountStats'
import TableData from './table/TableData'
import ListData from './list/ListData'
import Chart from './charts/Chart'
import LineChart from './charts/LineChart'

const _COMPONENTS = [
  Count,
  CountStats,
  TableData,
  ListData,
  Chart,
  LineChart,
]

function install (Vue) {
  Vue.use(icons)
  // fragments can not be used by views
  Vue.component(Spinner.name, Spinner)
  Vue.component(Empty.name, Empty)
  _COMPONENTS.forEach(C => {
    Vue.component('p-' + C.name, C)
  })
}

export default { install }
