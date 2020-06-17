<template>
<div class="line-chart">
  <div v-if="!loading" style="height:20em">
    <p-chart type="line" :options="options" :labels="labels"
      :datasets="datasets" v-if="datasets.length">
      <template v-slot:head="slot">
        <div class="chart_head">
          <div class="chart_stat" v-for="(d, i) in datasets" :key="d.label"
            @click="onSelect(slot.chart, i)">
            <div class="chart_dot" :class="{'_active': !hidden[i]}"
              :style="{'--color': d.backgroundColor}">
              <span v-text="d.label"></span>
            </div>
            <strong v-text="sum(d.data)"></strong>
          </div>
        </div>
      </template>
    </p-chart>
    <empty v-else />
  </div>
  <div class="chart_spinner" v-else style="height:20em">
    <spinner />
  </div>
</div>
</template>

<script>
import { genLineOptions, formatArrayData } from './util'

export default {
  name: 'line-chart',
  props: {
    endpoint: String,
  },
  data () {
    return {
      loading: true,
      options: null,
      datasets: [],
      labels: [],
      hidden: [],
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
    sum (data) {
      return data.reduce((a, c) => a + c, 0)
    },
    onSelect (chart, index) {
      const meta = chart.getDatasetMeta(index)
      if (meta.hidden) {
        meta.hidden = false
      } else {
        meta.hidden = true
      }
      this.$set(this.hidden, index, meta.hidden)
      chart.update()
    },
    async fetch () {
      this.loading = true
      const url = this.endpoint
      const { data } = await this.$http.get(url)
      const { labels, datasets } = formatArrayData(data)
      this.labels = labels
      this.datasets = datasets
      if (this.datasets.length) {
        const datalen = this.datasets[0].data.length
        this.options = genLineOptions(datalen)
      }
      this.hidden = datasets.map(() => false)
      this.loading = false
    },
  },
}
</script>

<style>
.line-chart {
  box-shadow: var(--border-shadow);
  border-radius: 8px;
  overflow: hidden;
}
.line-chart .chart_head {
  padding: 1.4em 0;
}
.chart_stat {
  display: inline-block;
  padding: 0 1.6em;
  cursor: pointer;
}
.chart_stat + .chart_stat {
  border-left: 1px solid var(--border-hex);
}
.chart_stat > div {
  font-size: 14px;
  color: var(--subtitle-hex);
  text-transform: capitalize;
}
.chart_stat > strong {
  display: block;
  padding-left: 14px;
}
.chart_dot:before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  background: var(--color);
  margin-right: 4px;
  opacity: 0.4;
  transition: opacity 0.16s ease;
}
.chart_dot._active:before {
  opacity: 1;
}
.chart_spinner {
  position: relative;
}
</style>
