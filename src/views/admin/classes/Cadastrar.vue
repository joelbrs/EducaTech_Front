<script setup lang="ts">
import {onMounted, ref, watch} from "vue"
import InputText from "@/components/atoms/inputs/InputText.vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import InputTextArea from "@/components/atoms/inputs/InputTextArea.vue";
import {getListarCursos} from "@/services/curso";
import {useRouter} from "vue-router";
import Validations from "@/utils/Validations";
import SelectField from "@/components/atoms/inputs/SelectField.vue";
import {getListarModulosByIdCurso} from "@/services/modulo";
import {postCriarAula, getProximaOrdem} from "@/services/aula";

const $router = useRouter()
const form = ref<HTMLFormElement>()

const item = ref({
  titulo: "",
  descricao: "",
  curso: "",
  modulo: "",
  ordem: "",
})

const cursos = ref([])
const modulos = ref([])

watch(() => item.value.modulo, (novo) => {
  if (novo) {
    consultarOrdem()
  }

  if (!novo) {
    item.value.ordem = ""
  }
})

watch(() => item.value.curso, (novo) => {
  if (novo) {
    consultarModulos()
  }

  if (!novo) {
    item.value.modulo = ""
  }
})

onMounted(() => consultarCursos())

const salvar = async () => {
  const validate = await form.value?.validate()

  if (!validate.valid) return

  const { data, error } = await postCriarAula(item.value)

  if (error && !data) return console.log(error)
  await $router.push({name: "HomeClassesAdmin"})
}

const consultarCursos = async () => {
  const { data, error } = await getListarCursos()

  if (error && !data) return console.error(error)

  cursos.value = data
}

const consultarModulos = async () => {
  const { data, error } = await getListarModulosByIdCurso(item.value.curso)

  if (error && !data) return console.error(error)

  modulos.value = data
}

const consultarOrdem = async () => {
  const { data, error } = await getProximaOrdem(item.value.curso, item.value.modulo)

  if (error && !data) return console.error(error)
  item.value.ordem = data
}

const limpar = () => {
  item.value = {
    titulo: "",
    curso: "",
    ordem: "",
    modulo: "",
    descricao: "",
  }

  form.value?.resetValidation()
}
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Novo Módulo</h2>
    <v-divider class="mb-5"/>

    <v-form ref="form">
      <v-row dense>
        <InputText
            v-model="item.titulo"
            label="Título da Aula"
            cols="4"
            suffix="*"
            :rules="[Validations.RequiredField]"
        />
        <SelectField
            v-model="item.curso"
            label="Curso"
            cols="3"
            item-title="titulo"
            item-value="id"
            :items="cursos"
            suffix="*"
            :rules="[Validations.RequiredField]"
        />
        <SelectField
            v-model="item.modulo"
            label="Módulo"
            cols="3"
            item-title="titulo"
            item-value="id"
            :items="modulos"
            suffix="*"
            :disabled="!item.curso"
            :rules="[Validations.RequiredField]"
        />
        <v-col cols="2">
          <v-text-field
              v-model="item.ordem"
              label="Ordem"
              placeholder="Ordem"
              variant="outlined"
              density="compact"
              disabled
          />
        </v-col>
        <InputTextArea
            v-model="item.descricao"
            label="Descrição da Aula"
            suffix="*"
            :rules="[Validations.RequiredField]"
        />
      </v-row>
    </v-form>
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
