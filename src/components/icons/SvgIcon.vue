<template>
<svg class="svg-icon" :class="className"
  :aria-label="ariaLabel" :aria-hidden="!ariaLabel">
  <use :href="href"/>
</svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    name: String,
    ariaLabel: String,
    size: [String, Number],
  },
  computed: {
    href () {
      if (this.name.indexOf('#') === -1) {
        return '#' + this.name
      } else {
        return this.name
      }
    },
    className () {
      const parts = this.name.split('#')
      if (parts.length === 1) {
        return this.name
      } else {
        return parts[1]
      }
    },
  },
}
</script>

<style>
svg.svg-icon {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  vertical-align: middle;
  width: 1em;
  height: 1em;
}
.svg-icon.loader {
  animation: loop 2s linear infinite;
}
.svg-icon + span {
  display: inline-block;
  vertical-align: middle;
  margin-left: 6px;
}
@keyframes loop {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
