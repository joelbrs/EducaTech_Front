<script setup lang="ts">
import { ref } from "vue";
import { ApiGet } from "@/utils/CustomAPI";
import AppCard from "@/components/atoms/cards/AppCard.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";

const cursos = ref([])
const cursoPesquisa = ref("")

const consultarCursos = async () => {
  const { data, error } = await ApiGet("http://localhost:8080/cursos/select")

  if (error) console.error(error)
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
        @click="() => console.log('vasco da gama')"
        :value="cursoPesquisa"
        label="Pesquisar"
        icon="mdi-magnify"
        :cols="3"
      />
    </v-row>

    <v-row align="center" justify="center">
      <AppCard v-for="curso in cursos" :key="curso.id" :cols="4" :infos="curso" />
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
