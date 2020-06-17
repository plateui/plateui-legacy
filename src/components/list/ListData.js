import './list.css'
import ListContent from './ListContent'
import Pagination from '../fragments/Pagination'

export default {
  name: 'list-data',
  props: {
    media: Object,
    title: [String, Object],
    subtitle: [String, Object],
    information: Array,
    metadata: [String, Object],
    endpoint: String,
  },
  watch: {
    endpoint: {
      immediate: true,
      handler () {
        this.pagination = null
        this.items = []
        this.fetch()
      },
    },
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
          { !this.loading && <empty /> }
        </div> }
        { this.loading && <spinner /> }
      </div>
      { this.pagination && <div class="list_pagination">
        <Pagination { ...{ props: this.pagination } } onSelect={this.onPage} />
      </div> }
    </div>)
  },
}
