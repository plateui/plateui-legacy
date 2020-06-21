<template>
<div class="count-stats row _same" :class="'row_' + columns.length">
  <div class="col" v-for="c in stats" :key="c.key">
    <count :label="c.label" :value="c.value" :color="c.color" :summary="c.summary" />
  </div>
</div>
</template>

<script>
import _get from 'lodash/get'
import http from '@/services/http'
import { wordColor } from '@/services/color'
import Count from './Count'
const COLORS = ['blue', 'red', 'green', 'yellow', 'purple']

export default {
  name: 'counts-data',
  components: { Count },
  props: {
    columns: Array,
    endpoint: String,
  },
  watch: {
    endpoint: {
      immediate: true,
      handler () {
        this.fetch()
      },
    },
  },
  data () {
    return {
      item: null,
    }
  },
  computed: {
    stats () {
      return this.columns.map((col, i) => {
        const rv = {}
        if (typeof col === 'string') {
          rv.key = col
        } else {
          Object.keys(col).forEach(k => {
            rv[k] = col[k]
          })
        }
        if (!rv.label) {
          rv.label = rv.key
        }
        if (!rv.color) {
          rv.color = COLORS[i] || wordColor(rv.key)
        }
        if (this.item) {
          rv.value = _get(this.item, rv.key)
        } else {
          rv.value = '-'
        }
        return rv
      })
    },
  },
  methods: {
    async fetch () {
      const { data } = await http.get(this.endpoint)
      this.item = data
    },
  },
}
</script>
