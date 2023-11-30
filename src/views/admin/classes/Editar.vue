<script setup lang="ts">
import { ref, watch } from "vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import { getListarCursos } from "@/services/curso";
import { useRoute, useRouter } from "vue-router";
import Validations from "@/utils/Validations";
import { getListarModulosByIdCurso } from "@/services/modulo";
import {
  getProximaOrdem,
  getDetalharAulaByIdCursoIdModuloAndOrdem,
  putEditarAula,
} from "@/services/aula";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";

const $router = useRouter();
const $route = useRoute();
const loading = ref(false);
const form = ref<HTMLFormElement>();

const item = ref({
  titulo: null,
  descricao: null,
  curso: null,
  modulo: null,
  ordem: null,
  video: null,
});

const cursos = ref([]);
const modulos = ref([]);

watch(
  () => item.value.modulo,
  (novo) => {
    if (novo) {
      consultarOrdem();
    }

    if (!novo) {
      item.value.ordem = null;
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
      item.value.modulo = null;
    }
  }
);

const consultarAula = async () => {
  const { idCourse, idModule, ordem } = $route.params;

  loading.value = true;
  const { data, error } = await getDetalharAulaByIdCursoIdModuloAndOrdem(
    idCourse as string,
    idModule as string,
    ordem as string
  );
  loading.value = false;

  if (error && !data) return console.error(error);

  item.value = {
    ...item.value,
    ...data,
  };
};

const salvar = async () => {
  const validate = await form.value?.validate();

  if (!validate.valid) return;

  loading.value = true;
  const { data, error } = await putEditarAula($route.params.id as string, {
    ...item.value,
    curso: (item.value.curso as any)?.id || item.value.curso,
    modulo: (item.value.modulo as any)?.id || item.value.modulo,
  });
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
  const { data, error } = await getListarModulosByIdCurso(
    (item.value.curso as any)?.id || item.value.curso
  );
  loading.value = false;

  if (error && !data) return console.error(error);

  modulos.value = data;
};

const consultarOrdem = async () => {
  loading.value = true;
  const { data, error } = await getProximaOrdem(
    (item.value.curso as any)?.id || item.value.curso,
    (item.value.modulo as any)?.id || item.value.modulo
  );
  loading.value = false;

  if (error && !data) return console.error(error);
  item.value.ordem = data as any;
};

consultarCursos();
consultarAula();
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Editar Aula</h2>
    <v-divider class="mb-5" />

    <v-form ref="form">
      <v-row dense>
        <v-col cols="3">
          <v-text-field
            v-model="item.titulo"
            label="Título da Aula"
            placeholder="Título da Aula"
            variant="outlined"
            density="compact"
            suffix="*"
            :rules="[Validations.RequiredField]"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="item.curso"
            label="Curso"
            :items="cursos"
            item-value="id"
            item-title="titulo"
            placeholder="Curso"
            :rules="[Validations.RequiredField]"
            suffix="*"
            variant="outlined"
            density="compact"
            clearable
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="item.modulo"
            label="Módulo"
            :items="modulos"
            item-value="id"
            item-title="titulo"
            placeholder="Módulo"
            :rules="[Validations.RequiredField]"
            suffix="*"
            :disabled="!item.curso"
            variant="outlined"
            density="compact"
            clearable
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="item.video"
            label="URL da Aula"
            placeholder="URL da Aula"
            variant="outlined"
            density="compact"
            suffix="*"
            :rules="[Validations.RequiredField]"
          />
        </v-col>
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
        <v-col cols="12">
          <v-textarea
            v-model="item.descricao"
            label="Descrição da Aula"
            placeholder="Descrição da Aula"
            variant="outlined"
            density="compact"
            suffix="*"
            :rules="[Validations.RequiredField]"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-row class="mt-2" justify="end" dense>
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
