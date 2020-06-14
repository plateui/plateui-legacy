<template>
<div class="chart">
  <slot name="head" v-bind:chart="chart"></slot>
  <div class="chart_content" :style="{'height': height + 'px'}">
    <canvas :width="width" :height="height" ref="chart"></canvas>
  </div>
  <slot name="foot" v-bind:chart="chart"></slot>
</div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'chart',
  props: {
    type: String,
    options: Object,
    labels: Array,
    datasets: Array,
    height: {
      type: Number,
      default: 230,
    },
  },
  data () {
    return {
      width: 0,
      chart: null,
    }
  },
  watch: {
    datasets () {
      this.$nextTick(() => {
        this.update()
      })
    },
  },
  methods: {
    update () {
      if (this.chart) {
        this.chart.data = {
          labels: this.labels,
          datasets: this.datasets,
        }
        this.chart.update()
      }
    },
    loadChart () {
      this.chart = new Chart(this.$refs.chart, {
        options: this.options,
        type: this.type,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
      })
    },
  },
  mounted () {
    this.width = this.$el.clientWidth
    if (this.datasets.length) {
      this.$nextTick(() => {
        this.loadChart()
      })
    }
  },
  beforeDestroy () {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  },
}
</script>
