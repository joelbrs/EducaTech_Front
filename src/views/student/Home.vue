<script setup lang="ts">
import {ref, watch, onMounted, Ref} from "vue";
import AppCard from "@/components/atoms/cards/CourseCard.vue";
import {getListarCursos} from "@/services/curso";
import InputText from "@/components/atoms/inputs/InputText.vue";
import {CursoDTOOut} from "@/types/curso";

const cursos: Ref<CursoDTOOut[]> = ref([])
const filtro = ref({
  titulo: ""
})

const consultarCursos = async () => {
  const { data, error } = await getListarCursos(filtro.value)

  if (error && !data) console.error(error)

  cursos.value = data
}

watch(() => filtro.value.titulo, () => {
  consultarCursos()
})

onMounted(() => consultarCursos())
</script>

<template>
  <v-container class="pa-15">
    <v-row dense>
      <h2 class="mb-2">Cursos</h2>
      <v-spacer />
      <v-col cols="3">
        <InputText
            v-model="filtro.titulo"
            label="Pesquisar"
            icon="mdi-magnify"
            @click="consultarCursos"
        />
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <AppCard
        v-for="curso in cursos"
        @click.prevent.stop="$router.push({ name: 'ClassesHomeStudent', params: { id: $route.params.id, idCourse: curso.id } })"
        :key="curso.id"
        :cols="4"
        :infos="curso" />
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
