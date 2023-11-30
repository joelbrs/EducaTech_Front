<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";
import InputTextArea from "@/components/atoms/inputs/InputTextArea.vue";
import { getListarCursos } from "@/services/curso";
import { useRouter } from "vue-router";
import Validations from "@/utils/Validations";
import SelectField from "@/components/atoms/inputs/SelectField.vue";
import { getListarModulosByIdCurso } from "@/services/modulo";
import { postCriarAula, getProximaOrdem } from "@/services/aula";

const $router = useRouter();
const form = ref<HTMLFormElement>();

const item = ref({
  titulo: "",
  descricao: "",
  curso: "",
  modulo: "",
  ordem: "",
  video: "",
});

const cursos = ref([]);
const modulos = ref([]);
const loading = ref(false);

watch(
  () => item.value.modulo,
  (novo) => {
    if (novo) {
      consultarOrdem();
    }

    if (!novo) {
      item.value.ordem = "";
    }
  }
);

watch(
  () => item.value.curso,
  (novo) => {
    if (novo) {
      consultarModulos();
    }

    if (!novo) {
      item.value.modulo = "";
    }
  }
);

const salvar = async () => {
  const validate = await form.value?.validate();

  if (!validate.valid) return;

  loading.value = true;
  const { data, error } = await postCriarAula(item.value as any);
  loading.value = false;

  if (error && !data) return console.log(error);
  await $router.push({ name: "HomeClassesAdmin" });
};

const consultarCursos = async () => {
  loading.value = true;
  const { data, error } = await getListarCursos();
  loading.value = false;

  if (error && !data) return console.error(error);

  cursos.value = data;
};

const consultarModulos = async () => {
  loading.value = true;
  const { data, error } = await getListarModulosByIdCurso(item.value.curso);
  loading.value = false;

  if (error && !data) return console.error(error);

  modulos.value = data;
};

const consultarOrdem = async () => {
  loading.value = true;
  const { data, error } = await getProximaOrdem(
    item.value.curso,
    item.value.modulo
  );
  loading.value = false;

  if (error && !data) return console.error(error);
  item.value.ordem = data as any;
};

const limpar = () => {
  item.value = {
    titulo: "",
    curso: "",
    ordem: "",
    modulo: "",
    descricao: "",
    video: "",
  };

  form.value?.resetValidation();
};

consultarCursos();
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Nova Aula</h2>
    <v-divider class="mb-5" />

    <v-form ref="form">
      <v-row dense>
        <InputText
          v-model="item.titulo"
          label="Título da Aula"
          cols="3"
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
        <InputText
          v-model="item.video"
          label="URL da Aula"
          cols="2"
          suffix="*"
          :rules="[Validations.RequiredField]"
        />
        <v-col cols="1">
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
        @click="$router.push({ name: 'HomeClassesAdmin' })"
      />
    </v-row>

    <AppLoading v-if="loading" />
  </v-container>
</template>
