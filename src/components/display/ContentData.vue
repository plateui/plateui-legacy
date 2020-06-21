<template>
<p-content :box="box" :type="type" :text="text" v-if="text" />
</template>

<script>
import PContent from './Content.vue'
import http from '@/services/http'

export default {
  name: 'content-data',
  components: { PContent },
  props: {
    box: Boolean,
    endpoint: String,
  },
  data () {
    return {
      text: '',
      type: '',
    }
  },
  watch: {
    endpoint: {
      immediate: true,
      handler (url) {
        if (url) {
          this.fetch(url)
        }
      },
    },
  },
  methods: {
    async fetch (url) {
      const xhr = await http.get(url)
      const ct = xhr.getResponseHeader('Content-Type')
      if (ct) {
        this.type = ct.split(';')[0].trim()
      }
      this.text = xhr.responseText
    },
  },
}
</script>
