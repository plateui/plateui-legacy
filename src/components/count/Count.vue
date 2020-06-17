<template>
<div class="count" :class="classes" :style="style">
  <div class="count_label" v-text="label"></div>
  <div class="count_num" v-text="value"></div>
  <div class="count_sum" v-text="summary" v-if="summary"></div>
</div>
</template>

<script>
import { hex2rgb, isColor } from '@/services/color'

export default {
  name: 'count',
  props: {
    label: String,
    value: [String, Number],
    color: String,
    summary: String,
  },
  computed: {
    classes () {
      if (this.color && !isColor(this.color)) {
        return this.color
      }
      return ''
    },
    style () {
      if (this.color && isColor(this.color)) {
        return { '--using-rgb': hex2rgb(this.color) }
      }
      return ''
    },
  },
}
</script>

<style>
.count {
  padding: 1em;
  line-height: 1.2;
  text-align: center;
  border-radius: 8px;
  box-shadow: var(--border-shadow);
  border-top: 4px solid rgba(var(--using-rgb, 0.6));
  box-sizing: border-box;
}
.col .count {
  height: 100%;
}
.count_label {
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--subtitle-hex);
}
.count_num {
  margin: 10px 0;
  font-size: 1.6em;
  font-weight: 400;
  color: var(--text-hex);
}
.count_sum {
  color: var(--metadata-hex);
}
</style>
