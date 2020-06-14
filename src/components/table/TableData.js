import TableContent from './TableContent'

export default {
  name: 'table-data',
  props: {
    columns: Array,
    endpoint: String,
  },
  data () {
    return {
      loading: true,
      items: [],
      orders: [],
    }
  },
  methods: {
    async fetch () {
      const url = this.endpoint
      const { data } = await this.$http.get(url)
      this.items = data.items
    },
    onOrder ({ key, order }) {
      let found = false
      this.orders = this.orders.map(o => {
        if (o.key === key) {
          found = true
          o.order = order
          return o
        }
        return o
      })
      if (!found) {
        this.orders.push({ key, order })
      }
      this.fetch()
    },
  },
  render () {
    return (<div class="table">
      <div class="table_content">
        <TableContent items={this.items} columns={this.columns}
          onOrder={this.onOrder} />
      </div>
      <div class="table_pagination">
      </div>
      <div class="table_spinner"></div>
    </div>)
  },
  created () {
    this.fetch()
  },
}
