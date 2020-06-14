<template>
<div id="app" :style="company.style">
  <app-side :company="company" :menus="menus" />
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
    company: Object,
    menus: Array,
  },
}
</script>

<style src="./css/index.css"></style>
