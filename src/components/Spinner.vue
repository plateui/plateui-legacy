<template>
<div class="spinner">
  <svg-icon name="loader" />
</div>
</template>

<script>
export default {
  name: 'spinner',
}
</script>

<style>
.spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.86);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4em;
  color: #dadada;
}
</style>
