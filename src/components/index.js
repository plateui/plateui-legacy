import icons from './icons'
import Empty from './fragments/Empty'
import Spinner from './fragments/Spinner'
import Count from './count/Count'
import CountsData from './count/CountsData'
import TableData from './table/TableData'
import ListData from './list/ListData'
import Content from './display/Content'
import ContentData from './display/ContentData'
import Chart from './charts/Chart'
import LineChart from './charts/LineChart'
import LineChartData from './charts/LineChartData'

const _COMPONENTS = [
  Count,
  CountsData,
  TableData,
  ListData,
  Content,
  ContentData,
  Chart,
  LineChart,
  LineChartData,
]

function install (Vue) {
  Vue.use(icons)
  // fragments can not be used by views
  Vue.component(Spinner.name, Spinner)
  Vue.component(Empty.name, Empty)
  _COMPONENTS.forEach(C => {
    if (/^p-/.test(C.name)) {
      Vue.component(C.name, C)
    } else {
      Vue.component('p-' + C.name, C)
    }
  })
}

export default { install }
