<script setup lang="ts">
defineProps<{
  infos: any
}>()
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="344"
    :prepend-avatar="infos.imagem"
    variant="outlined"
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
</template>
