import './list.css'
import ListContent from './ListContent'
import Pagination from '../Pagination'

export default {
  name: 'list-data',
  props: {
    media: Object,
    title: Object,
    subtitle: Object,
    information: Array,
    metadata: Object,
    endpoint: String,
  },
  data () {
    return {
      loading: true,
      items: [],
      pagination: null,
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
      const { pagination, items } = await this.$http.paginate(url, params)

      this.items = items
      this.pagination = pagination
      this.loading = false
    },
    onPage (page) {
      this.$set(this.pagination, 'page', page)
      this.fetch()
    },
  },
  render () {
    return (<div class="list">
      <div class="list_content">
        <ListContent items={this.items} media={this.media}
          title={this.title} subtitle={this.subtitle}
          information={this.information} metadata={this.metadata} />
        { !this.items.length && <div class="list_none">
          { !this.loading && <p-empty /> }
        </div> }
        { this.loading && <p-spinner /> }
      </div>
      { this.pagination && <div class="list_pagination">
        <Pagination { ...{ props: this.pagination } } onSelect={this.onPage} />
      </div> }
    </div>)
  },
  created () {
    this.fetch()
  },
}
