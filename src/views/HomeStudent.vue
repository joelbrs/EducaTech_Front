<script setup lang="ts">
import AppCard from "@/components/atoms/cards/AppCard.vue";
import {ref} from "vue";

const infos = ref({
  imagem: "https://cdn.vuetifyjs.com/images/john.jpg",
  titulo: "Docker",
  descricao: "Você vai aprender como criar, administrar ambientes isolados através de containers com o Docker.",
  qtdModulos: 4,
  qtdAulas: 43
})
</script>

<template>
  <v-container class="pa-15">
    <h2>Cursos</h2>

    <AppCard :infos="infos"></AppCard>
  </v-container>
</template>

<style scoped>

</style>
