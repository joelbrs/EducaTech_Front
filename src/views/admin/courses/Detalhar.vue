<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getDetalharCurso} from "@/services/curso";
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputTextArea from "@/components/atoms/inputs/InputTextArea.vue";
import Btn from "@/components/atoms/btns/Btn.vue";

const item = ref({
  titulo: "",
  cargaHoraria: "",
  descricao: "",
  imagem: "",
  qtdAulas: 0,
  qtdModulos: 0
})

const detalharCurso = async () => {
  const $route = useRoute()
  const { data, error } = await getDetalharCurso($route.params.id)

  if(error && !data) return console.log(error)

  item.value = data
}

onMounted(() => detalharCurso())
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Detalhar Curso</h2>
    <v-divider class="mb-5"/>

    <v-row dense>
      <v-col cols="9">
        <v-text-field
            v-model="item.titulo"
            density="compact"
            placeholder="Título do Curso"
            label="Título do Curso"
            variant="outlined"
            disabled
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
            v-model="item.cargaHoraria"
            density="compact"
            placeholder="Carga Horária"
            label="Carga Horária"
            variant="outlined"
            disabled
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
            v-model="item.qtdAulas"
            density="compact"
            placeholder="Quantidade de Aulas"
            label="Quantidade de Aulas"
            variant="outlined"
            disabled
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
            v-model="item.qtdModulos"
            density="compact"
            placeholder="Quantidade de Módulos"
            label="Quantidade de Módulos"
            variant="outlined"
            disabled
        ></v-text-field>
      </v-col>
      <v-col>
        <v-textarea
            v-model="item.descricao"
            density="compact"
            placeholder="Descrição do Curso"
            label="Descrição do Curso"
            variant="outlined"
            disabled
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row class="mt-2" justify="start" dense>
      <Btn
          cols="2"
          rounded="x"
          color="grey-lighten-2"
          text="Voltar"
          icon="mdi-arrow-left-bottom"
          @click="$router.push({ name: 'HomeCoursesAdmin' })"
      />
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
