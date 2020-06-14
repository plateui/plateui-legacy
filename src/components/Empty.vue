<template>
<div class="empty">
  <div class="empty_inner">
    <svg-icon name="inbox" />
    <div>No Data</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'empty',
}
</script>

<style>
.empty {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: rgba(0, 0, 0, 0.2);
  height: 100%;
  font-size: 1.2em;
}
.empty svg {
  font-size: 3.6em;
  color: #dadada;
}
</style>
