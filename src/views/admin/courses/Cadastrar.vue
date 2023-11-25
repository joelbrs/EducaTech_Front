<script setup lang="ts">
import {ref} from "vue"
import InputText from "@/components/atoms/inputs/InputText.vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import InputTextArea from "@/components/atoms/inputs/InputTextArea.vue";
import InputImage from "@/components/atoms/inputs/InputImage.vue";
import {postCriarCurso} from "@/services/curso";
import {useRouter} from "vue-router";
import {ImageDTO} from "@/types/GenericTypes";

const $router = useRouter()

const item = ref({
  titulo: "",
  cargaHoraria: "",
  descricao: "",
  imagem: new ImageDTO()
})

const salvar = async () => {
  const { data, error } = await postCriarCurso({
    ...item.value,
    imagem: item.value.imagem.imagem
  })

  if (error && !data) return console.log(error)

  $router.push({ name: "HomeCoursesAdmin" })
}

const limpar = () => {
  item.value = {
    titulo: "",
    cargaHoraria: "",
    descricao: "",
    imagem: ""
  }
}
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Novo Curso</h2>
    <v-divider class="mb-5"/>

    <v-row dense>
      <InputText
          v-model="item.titulo"
          label="Título do Curso"
          suffix="*"
          cols="9"
      />
      <InputText
          v-model="item.cargaHoraria"
          label="Carga Horária"
          cols="3"
          suffix="*"
      />
      <InputTextArea
          v-model="item.descricao"
          label="Descrição do Curso"
          suffix="*"
      />
    </v-row>

    <InputImage v-model="item.imagem"/>

    <v-row class="mt-2" justify="end" dense>
      <Btn
          block
          cols="2"
          rounded="xs"
          color="warning"
          text="Limpar"
          icon="mdi-eraser"
          @click="limpar"
      />
      <Btn
          block
          cols="2"
          rounded="xs"
          text="Salvar"
          icon="mdi-content-save-all-outline"
          color="green"
          @click.prevent.stop="salvar"
      />
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
