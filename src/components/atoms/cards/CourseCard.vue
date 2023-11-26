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
      max-width="800"
      rounded
      min-height="250"
      :prepend-avatar="infos.imagem"
      variant="outlined"
      href="/vasco"
    >
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">
            {{ infos.titulo }}
          </div>
          <div class="text-caption">{{ infos.descricao }}</div>
        </div>
      </v-card-item>

      <v-card-actions class="ml-2">
        <v-btn rounded>
          {{ infos.qtdModulos }} Módulos
        </v-btn>
        <v-btn rounded>
          {{ infos.qtdAulas }} Aulas
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>
