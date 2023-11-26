<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Painel Administrativo</h2>

    <v-divider class="mb-5"/>

    <v-row align="center" justify="center">
      <PanelCard v-for="app in apps" :key="app.id" :cols="4" :infos="app" />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from "vue";
import PanelCard from "@/components/atoms/cards/PanelCard.vue";
const apps = ref([
  {
    id: 1,
    titulo: "Manter Cursos",
    descricao: "Aplicação para a Manutenção de Cursos do Educatech",
    link: "/admin/courses"
  },
  {
    id: 2,
    titulo: "Manter Módulos",
    descricao: "Aplicação para a Manutenção de Módulos do Educatech",
    link: "/admin/modules"
  },
  {
    id: 3,
    titulo: "Manter Aulas",
    descricao: "Aplicação para a Manutenção de Aulas do Educatech",
    link: "/admin/classes"
  },
])
</script>

<style scoped>

</style>
