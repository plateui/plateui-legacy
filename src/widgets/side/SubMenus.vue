<template>
<div class="side_submenus">
  <div role="menu" @click.prevent="collapse=!collapse">
    <svg-icon :name="menu.icon" />
    <span v-text="menu.name"></span>
    <svg-icon class="side_arrow" name="chevron-down" />
  </div>
  <ul v-show="!collapse">
    <li v-for="route in menu.routes" :key="route.name">
      <router-link :to="menu.path + route.path" v-text="route.name"></router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    menu: Object,
  },
  data () {
    return {
      collapse: true,
    }
  },
}
</script>

<style>
.side_submenus > div {
  position: relative;
  padding: 0.4em 1em;
  cursor: pointer;
}
.side_submenus ul {
  padding-left: 1.4em;
}
.side_arrow {
  position: absolute;
  top: 0.8em;
  right: 1em;
}
</style>
