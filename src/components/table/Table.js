import TableHead from './TableHead'
import TableRow from './TableRow'

export default {
  name: 'p-table',
  props: {
    columns: Array,
    endpoint: String,
  },
  data () {
    return {
      loading: true,
      items: [],
    }
  },
  methods: {
    async fetch () {
      const url = this.endpoint
      const { data } = await this.$http.get(url)
      this.items = data.items
    },
  },
  render () {
    const rows = this.items.map(item => {
      return (<TableRow item={item} columns={this.columns} />)
    })
    return (<div class="table">
      <div class="table_content">
        <table>
          <TableHead columns={this.columns} />
          <tbody>{rows}</tbody>
        </table>
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
