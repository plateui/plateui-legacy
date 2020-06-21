<template>
<div :class="$style.demo">
  <div :class="$style.grid">
    <div :class="$style.item" v-for="icon in icons" :key="icon">
      <svg-icon :name="icon" />
      <strong v-text="icon"></strong>
    </div>
  </div>
</div>
</template>

<script>
import icons from './icons'

export default {
  name: 'icon-grid',
  data () {
    return { icons }
  },
}
</script>

<style module>
.grid {
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-right: -5px;
}
.item {
  display: inline-block;
  text-align: center;
  margin: 5px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 120px;
}
.item svg {
  font-size: 24px;
}
.item strong {
  display: block;
  font-size: 14px;
  margin-top: 20px;
  font-weight: 400;
}
</style>
