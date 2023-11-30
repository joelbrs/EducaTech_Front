<script setup lang="ts">
defineProps<{
  block?: boolean,
  color?: string,
  size?: string,
  variant?: string,
  text?: string,
  cols?: string | number,
  icon?: string
}>()
</script>

<template>
  <v-col class="d-flex flex-column" :cols="cols" :md="cols" sm="12">
    <v-btn
      v-bind="$attrs"
      :block="block"
      :color="color"
      :size="size"
      :variant="variant"
      :prepend-icon="icon"
      @click="$emit('click')"
    >
      {{ text }}
    </v-btn>
  </v-col>

</template>

<style scoped>

</style>
