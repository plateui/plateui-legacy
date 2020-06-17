<template>
<section class="p-content" :class="{_box: box}" v-html="html">
</section>
</template>

<script>
export default {
  name: 'p-content',
  props: {
    type: {
      type: String,
      default: 'text/html',
    },
    box: Boolean,
    value: [String, Object, Array],
    endpoint: String,
  },
  data () {
    return {
      text: this.value || '',
      ct: this.type,
    }
  },
  computed: {
    html () {
      // handle JSON data
      if (typeof this.text !== 'string') {
        const code = JSON.stringify(this.text, null, 2)
        return '<pre class="language-json"><code>' + code + '</code></pre>'
      } else if (/json/.test(this.ct)) {
        const code = JSON.stringify(JSON.parse(this.text), null, 2)
        return '<pre class="language-json"><code>' + code + '</code></pre>'
      }

      // TODO: add a hook to process other types of content
      if (this.ct === 'text/html') {
        return this.text
      } else {
        return '<pre><code>' + this.text + '</code></pre>'
      }
    },
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
      const xhr = await this.$http.get(url)
      const ct = xhr.getResponseHeader('Content-Type')
      if (ct) {
        this.ct = ct.split(';')[0].trim()
      }
      this.text = xhr.responseText
    },
  },
}
</script>

<style>
.p-content {
  box-sizing: border-box;
}
.p-content._box {
  padding: 1em;
  border-radius: 8px;
  box-shadow: var(--border-shadow);
}
</style>
