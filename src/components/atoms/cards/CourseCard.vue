<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  infos: any;
  cols?: number;
}>();

const imagem = computed(() => {
  if (
    props.infos.imagem?.includes(`data:image/jpeg;base64,`) ||
    props.infos.imagem?.includes("data:image/png;base64,")
  ) {
    return props.infos.imagem;
  }

  return `data:image/jpeg;base64,${props.infos.imagem}`;
});
</script>

<template>
  <v-col :cols="cols">
    <v-card
      class="my-auto pa-2"
      max-width="800"
      rounded
      min-height="250"
      :prepend-avatar="imagem"
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
        <v-btn rounded> {{ infos.qtdModulos }} Módulos </v-btn>
        <v-btn rounded> {{ infos.qtdAulas }} Aulas </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<style scoped></style>
