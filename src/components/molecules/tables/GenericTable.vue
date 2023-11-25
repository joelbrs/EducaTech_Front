<script setup lang="ts">
defineProps<{
  headers: any[],
  totalItems: number,
  items: any[],
  loading?: boolean
}>()

</script>

<template>
  <v-data-table-virtual
      :headers="headers"
      :items-length="totalItems"
      :items="items"
      :loading="loading"
      item-value="name"
  >
    <template
        v-for="(_, name) in $slots"
        #[name]="slotData"
    >
      <slot
          :name="name"
          v-bind="slotData"
      />
    </template>
  </v-data-table-virtual>
</template>

<style scoped>

</style>
