import TableContent from './TableContent'
import Pagination from '../Pagination'

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
      pagination: null,
      orders: [],
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      const url = this.endpoint
      const params = {}
      if (this.pagination) {
        params.page = this.pagination.page
      }
      // TODO: order
      const { pagination, items } = await this.$http.paginate(url, params)

      this.items = items
      this.pagination = pagination
      this.loading = false
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
      this.$set(this.pagination, 'page', 1)
      this.fetch()
    },
    onPage (page) {
      this.$set(this.pagination, 'page', page)
      this.fetch()
    },
  },
  render () {
    return (<div class="table">
      <div class="table_content">
        <TableContent items={this.items} columns={this.columns}
          onOrder={this.onOrder} />
        { !this.items.length && <div class="table_none">
          { !this.loading && <p-empty /> }
        </div> }
        { this.loading && <p-spinner /> }
      </div>
      { this.pagination && <div class="table_pagination">
        <Pagination { ...{ props: this.pagination } } onSelect={this.onPage} />
      </div> }
    </div>)
  },
  created () {
    this.fetch()
  },
}
