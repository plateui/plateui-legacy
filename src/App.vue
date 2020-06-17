<template>
<div id="app" :style="company.style" :class="{_open: open}">
  <app-side :company="company" :menus="menus" />
  <div class="app_main">
    <div class="app_head">
      <div class="app_title">
        <button class="app_open" aria-label="Toggle Menu" @click.prevent="open=!open">
          <svg-icon name="menu" />
        </button>
        <strong v-text="title"></strong>
      </div>
      <app-account :account="account" v-if="account" />
    </div>
    <router-view class="main" @load="onLoad" />
  </div>
</div>
</template>

<script>
import AppSide from './components/app/AppSide.vue'
import AppAccount from './components/app/AppAccount.vue'

export default {
  components: { AppSide, AppAccount },
  name: 'App',
  props: {
    company: Object,
    account: Object,
    menus: Array,
  },
  data () {
    return {
      open: false,
      title: '',
    }
  },
  methods: {
    onLoad ({ name }) {
      this.title = name
    },
  },
}
</script>
