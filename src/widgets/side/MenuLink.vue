<template>
<router-link class="side_menu" :to="menu.path + route.path" :exact="path=='/'">
  <svg-icon :name="menu.icon" />
  <span v-text="route.name"></span>
</router-link>
</template>

<script>
export default {
  props: {
    menu: Object,
    route: Object,
  },
  computed: {
    path () {
      return this.menu.path + this.route.path
    },
  },
}
</script>
