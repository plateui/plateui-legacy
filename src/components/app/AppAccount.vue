<template>
<div class="app_account">
  <img :src="account.avatar" :alt="account.name" />
</div>
</template>

<script>
export default {
  props: {
    account: Object,
  },
}
</script>

<style>
.app_account img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
