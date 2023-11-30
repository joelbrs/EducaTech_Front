<template>
  <div class="text-center loading-page">
    <v-progress-circular indeterminate color="secondary" size="70" :width="8" />
  </div>
</template>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00000070;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>
