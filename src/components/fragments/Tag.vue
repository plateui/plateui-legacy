<template>
<span class="p-tag" :class="classes" :style="style" v-text="text"></span>
</template>

<script>
import { hex2rgb, isColor } from '@/services/color'

export default {
  name: 'tag',
  props: {
    value: [String, Object],
  },
  computed: {
    text () {
      if (typeof this.value === 'string') {
        return this.value
      }
      if (this.value) {
        return this.value.text
      }
      return ''
    },
    classes () {
      const color = this.value.color
      if (color && !isColor(color)) {
        return color
      }
      return ''
    },
    style () {
      const color = this.value.color
      if (color && isColor(color)) {
        return { '--using-rgb': hex2rgb(color) }
      }
      return ''
    },
  },
}
</script>

<style>
.p-tag {
  display: inline-block;
  padding: 0.1em 0.4em;
  border-radius: 4px;
  border: 1px solid rgba(var(--using-rgb), 0.4);
  background-color: rgba(var(--using-rgb), 0.2);
  color: var(--text-hex);
  font-size: 0.8em;
}
.p-tag + .p-tag {
  margin-left: 0.2em;
}
</style>
