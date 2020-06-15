import _get from 'lodash/get'
import TableItem from './TableItem'

const TableRow = {
  name: 'TableRow',
  props: {
    columns: Array,
    item: Object,
  },
  render () {
    const children = this.columns.map(c => {
      const value = _get(this.item, c.key)
      return (<TableItem type={c.type} config={c.config}
        value={value} item={this.item} />)
    })
    return (<tr>{children}</tr>)
  },
}

const TableSort = {
  name: 'table-sort',
  props: {
    column: Object,
  },
  data () {
    return {
      orderBy: '',
    }
  },
  methods: {
    onClick () {
      if (this.orderBy === '') {
        this.orderBy = 'desc'
      } else if (this.orderBy === 'desc') {
        this.orderBy = 'asc'
      } else {
        this.orderBy = ''
      }
      this.$emit('order', { key: this.column.key, order: this.orderBy })
    },
  },
  render () {
    return (<div class="th-sort" data-order={this.orderBy} onClick={this.onClick}>
      <span>{this.column.name}</span>
      <span class="th-sort_arrow">
        <svg-icon name="chevron-up" />
        <svg-icon name="chevron-down" />
      </span>
    </div>)
  },
}

export default {
  name: 'table-content',
  props: {
    columns: Array,
    items: Array,
  },
  methods: {
    onOrder (data) {
      this.$emit('order', data)
    },
  },
  render () {
    const cols = this.columns.map(c => {
      const config = c.config
      if (config && config.sortable) {
        return (<th><TableSort column={c} onOrder={this.onOrder} /></th>)
      } else {
        return (<th>{c.name}</th>)
      }
    })
    const head = (<thead><tr>{cols}</tr></thead>)
    const rows = this.items.map(item => {
      return (<TableRow item={item} columns={this.columns} />)
    })
    return (<table>{head}<tbody>{rows}</tbody></table>)
  },
}
