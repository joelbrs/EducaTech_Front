<script setup lang="ts">
import { ref } from "vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import InputTextArea from "@/components/atoms/inputs/InputTextArea.vue";
import InputFile from "@/components/atoms/inputs/InputFile.vue";
import { postCriarCurso } from "@/services/curso";
import { useRouter } from "vue-router";
import Validations from "@/utils/Validations";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";

const $router = useRouter();
const form = ref<HTMLFormElement>();
const loading = ref(false);

const item = ref({
  titulo: "",
  cargaHoraria: "",
  descricao: "",
  imagem: null as any,
  modeloCertificado: null as any,
});

const salvar = async () => {
  const validate = await form.value?.validate();

  if (!validate.valid) return;

  loading.value = true;
  const { data, error } = await postCriarCurso({
    ...item.value,
    imagem: item.value.imagem.arquivo,
  });
  loading.value = false;

  if (error && !data) return console.log(error);

  await $router.push({ name: "HomeCoursesAdmin" });
};

const limpar = () => {
  item.value = {
    titulo: "",
    cargaHoraria: "",
    descricao: "",
    imagem: null,
    modeloCertificado: null as any,
  };

  form.value?.resetValidation();
};
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Novo Curso</h2>
    <v-divider class="mb-5" />

    <v-form ref="form">
      <v-row dense>
        <InputText
          v-model="item.titulo"
          label="Título do Curso"
          cols="9"
          suffix="*"
          :rules="[Validations.RequiredField]"
        />
        <InputText
          v-model="item.cargaHoraria"
          label="Carga Horária"
          cols="3"
          suffix="*"
          :rules="[Validations.RequiredField]"
        />
        <InputTextArea
          v-model="item.descricao"
          label="Descrição do Curso"
          suffix="*"
          :rules="[Validations.RequiredField]"
        />
      </v-row>
    </v-form>
    <InputFile
      v-model="item.modeloCertificado"
      label="Descrição do Modelo do Certificado"
      textBtn="Anexar Modelo"
    />
    <InputFile
      v-model="item.imagem"
      label="Descrição da Logo do Curso"
      textBtn="Anexar Logo"
    />
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

    <AppLoading v-if="loading" />
  </v-container>
</template>
