<template>
<div id="app" :style="company.style" :class="{_open: open}">
  <app-side :company="company" :menus="menus" />
  <div class="app_main">
    <div class="app_head">
      <button aria-label="Toggle Menu" @click.prevent="open=!open">
        <svg-icon name="menu" />
      </button>
      <strong v-text="company.name"></strong>
    </div>
    <router-view class="main" />
  </div>
</div>
</template>

<script>
import AppSide from './components/side/AppSide.vue'

export default {
  components: { AppSide },
  name: 'App',
  props: {
    company: Object,
    menus: Array,
  },
  data () {
    return {
      open: false,
    }
  },
}
</script>
