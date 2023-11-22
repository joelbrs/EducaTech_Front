<script setup lang="ts">
import { ref } from "vue";
import { ApiGet } from "@/utils/CustomAPI";
import AppCard from "@/components/atoms/cards/AppCard.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import {CursoDTOOut} from "@/types/curso";

const cursos = ref([])
const cursoPesquisa = ref("")

const consultarCursos = async () => {
  const { data, error } = await ApiGet<CursoDTOOut[]>("http://localhost:8080/cursos/select")

  if (error && !data) console.error(error)

  cursos.value = data
}
consultarCursos()

</script>

<template>
  <v-container class="pa-15">
    <v-row dense>
      <h2 class="mb-2">Cursos</h2>
      <v-spacer />
      <InputText
        @search="() => console.log('vasco da gama')"
        :value="cursoPesquisa"
        :cols="3"
        label="Pesquisar"
        icon="mdi-magnify"
      />
    </v-row>

    <v-row align="center" justify="center">
      <AppCard v-for="curso in cursos" :key="curso.id" :cols="4" :infos="curso" />
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
