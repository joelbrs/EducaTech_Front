<template>
<v-btn :append-icon="icon" :color="color" :plain="plain">{{ text }}</v-btn>
</template>

<script lang="ts" setup>
defineProps<{
  icon?: string,
  text?: string,
  color?: string,
  plain?: boolean
}>()
</script>
