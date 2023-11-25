<script setup lang="ts">
import { ref } from "vue";
import { ApiGet } from "@/utils/CustomAPI";
import AppCard from "@/components/atoms/cards/AppCard.vue";
import {CursoDTOOut} from "@/types/curso";
import {getListarCursos} from "@/services/curso";

const cursos = ref([])
const cursoPesquisa = ref("")

const consultarCursos = async () => {
  const { data, error } = await getListarCursos()

  if (error && !data) console.error(error)

  cursos.value = data
}

const pesquisarCurso = () => {
  console.log('pesquisando...')
}

consultarCursos()

</script>

<template>
  <v-container class="pa-15">
    <v-row dense>
      <h2 class="mb-2">Cursos</h2>
      <v-spacer />
      <v-col cols="3">
        <v-text-field
          v-model="cursoPesquisa"
          density="compact"
          placeholder="Pesquisar"
          label="Pesquisar"
          variant="outlined"
          append-inner-icon="mdi-magnify"
          @click:append-inner="pesquisarCurso"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <AppCard v-for="curso in cursos" :key="curso.id" :cols="4" :infos="curso" />
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
