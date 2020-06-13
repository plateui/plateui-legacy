<template>
<div class="count">
  <div class="count_label" v-text="label"></div>
  <div class="count_num" v-text="value"></div>
  <div class="count_sum" v-text="summary" v-if="summary"></div>
</div>
</template>

<script>
export default {
  name: 'count',
  props: {
    label: String,
    value: [String, Number],
    color: String,
    summary: String,
  },
}
</script>
