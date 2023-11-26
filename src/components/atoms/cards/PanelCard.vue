<script setup lang="ts">
defineProps<{
  infos: any,
  cols?: number
}>()
</script>

<template>
  <v-col :cols="cols">
    <v-card
        class="my-auto pa-2"
        max-width="450"
        rounded
        min-height="200"
        prepend-icon="mdi-application-brackets"
        variant="outlined"
        :href="infos.link"
    >
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">
            {{ infos.titulo }}
          </div>
          <div class="text-caption">{{ infos.descricao }}</div>
        </div>
      </v-card-item>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>
