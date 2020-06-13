<template>
<div id="app" :style="vars">
  <app-side :name="name" :logo="logo" :menus="menus" />
  <div class="app_main">
    <router-view class="main" />
  </div>
</div>
</template>

<script>
import AppSide from './widgets/side/AppSide.vue'

export default {
  components: { AppSide },
  name: 'App',
  props: {
    name: String,
    logo: String,
    vars: Object,
    menus: Array,
    overview: Array,
  },
}
</script>

<style src="./css/index.css"></style>
