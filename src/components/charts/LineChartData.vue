<template>
<line-chart :loading="loading" :options="options"
  :datasets="datasets" :labels="labels">
</line-chart>
</template>

<script>
import http from '@/services/http'
import LineChart from './LineChart.vue'
import { genLineOptions, formatArrayData } from './util'

export default {
  name: 'line-chart-data',
  components: { LineChart },
  props: {
    endpoint: String,
  },
  data () {
    return {
      loading: true,
      options: null,
      datasets: [],
      labels: [],
    }
  },
  watch: {
    endpoint: {
      immediate: true,
      handler () {
        this.fetch()
      },
    },
  },
  methods: {
    async fetch () {
      this.loading = true
      const url = this.endpoint
      const { data } = await http.get(url)
      const { labels, datasets } = formatArrayData(data)
      this.labels = labels
      this.datasets = datasets
      if (this.datasets.length) {
        const datalen = this.datasets[0].data.length
        this.options = genLineOptions(datalen)
      }
      this.loading = false
    },
  },
}
</script>
