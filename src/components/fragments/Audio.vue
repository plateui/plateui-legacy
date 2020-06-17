<template>
<div class="p-audio">
  <button @click.prevent="toggle">
    <svg-icon name="play" v-show="!playing" />
    <svg-icon name="pause" v-show="playing" />
  </button>
  <audio :src="src" ref="v" />
</div>
</template>

<script>
export default {
  name: 'p-audio',
  props: {
    src: String,
  },
  data () {
    return {
      playing: false,
    }
  },
  methods: {
    toggle () {
      const el = this.$refs.v
      if (this.playing) {
        el.pause()
      } else {
        el.play()
      }
      this.playing = !this.playing
    },
  },
}
</script>

<style>
.p-audio {
  display: inline-block;
}
.p-audio button {
  font-size: 0.92em;
  line-height: 1;
  vertical-align: middle;
  outline: 0;
  padding: 2px 10px;
  border-radius: 4em;
  border: 0;
  background: rgba(var(--purple-rgb), 0.8);
  color: white;
  cursor: pointer;
}
</style>
