<template>
<aside class="app_side side">
  <div class="side_head">
    <img :src="company.logo" :alt="company.name" v-if="company.logo">
    <strong v-text="company.name"></strong>
  </div>
  <div class="side_menus">
    <ul>
      <li v-for="menu in menus" :key="menu.name">
        <menu-link :menu="menu" :route="menu.routes[0]" v-if="menu.routes.length === 1" />
        <sub-menus :menu="menu" v-else />
      </li>
    </ul>
  </div>
  <div class="stack">
  </div>
</aside>
</template>

<script>
import MenuLink from './MenuLink.vue'
import SubMenus from './SubMenus.vue'

export default {
  name: 'AppSide',
  components: { MenuLink, SubMenus },
  props: {
    company: Object,
    menus: Array,
  },
}
</script>

<style>
.side_head {
  padding: 1em 1.4em;
}
.side_head img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-right: 0.6em;
}
.side_head strong {
  display: inline-block;
  vertical-align: middle;
  font-size: 1.8em;
}
.side_menus {
  padding: 1em 1.4em;
}
.side_menus ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.side_menus a {
  display: inline-block;
  padding: 0.4em 1em;
  width: 100%;
  box-sizing: border-box;
  color: var(--color-text);
  border-radius: 4px;
}
.side_menus a {
  text-decoration: none;
  transition: background 0.2s ease;
}
.side_menus a.router-link-active {
  background: rgba(var(--primary-rgb), 0.16);
}
.side_menus > ul > li {
  margin: 0.16em 0;
}
.side_menus a:hover,
.side_submenus > div:hover {
  background: rgba(var(--primary-rgb), 0.1);
  border-radius: 4px;
}
.side_submenus ul {
  padding-left: 1.4em;
}
</style>
