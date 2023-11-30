<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import { getListarCursos } from "@/services/curso";
import { useRoute, useRouter } from "vue-router";
import Validations from "@/utils/Validations";
import {
  getDetalharModulo,
  getProximaOrdem,
  postCriarModulo,
} from "@/services/modulo";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";

const $router = useRouter();
const form = ref<HTMLFormElement>();

const item = ref({
  titulo: "",
  descricao: "",
  curso: null,
  ordem: "",
  material: {
    arquivo: "",
    nome: "",
    file: "",
  },
});

const cursos = ref([]);
const loading = ref(false);

watch(
  () => item.value.curso,
  (novo) => {
    if (novo) {
      consultarOrdem();
    }

    if (!novo) {
      item.value.ordem = "";
    }
  }
);

const detalharModulo = async () => {
  const $route = useRoute();

  loading.value = true;
  const { data, error } = await getDetalharModulo($route.params.id.toString());
  loading.value = false;

  if (error && !data) return console.log(error);

  item.value = { ...item.value, ...data, curso: data?.curso as any };
};

const salvar = async () => {
  const validate = await form.value?.validate();

  if (!validate.valid) return;

  loading.value = true;
  const { data, error } = await postCriarModulo({
    ...item.value,
    curso: (item.value.curso as any)?.id || item.value.curso,
  });
  loading.value = false;

  if (error && !data) return console.log(error);
  await $router.push({ name: "HomeModulesAdmin" });
};

const consultarCursos = async () => {
  loading.value = true;
  const { data, error } = await getListarCursos();
  loading.value = false;

  if (error && !data) return console.error(error);

  cursos.value = data;
};

const consultarOrdem = async () => {
  loading.value = true;
  const { data, error } = await getProximaOrdem(
    (item.value.curso as any)?.id || item.value.curso
  );
  loading.value = false;

  if (error && !data) return console.error(error);
  item.value.ordem = data as any;
};

const limpar = () => {
  item.value = {
    titulo: "",
    curso: null,
    ordem: "",
    descricao: "",
    material: {
      arquivo: "",
      nome: "",
      file: "",
    },
  };

  form.value?.resetValidation();
};

consultarCursos();
detalharModulo();
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Editar Módulo</h2>
    <v-divider class="mb-5" />

    <v-form ref="form">
      <v-row dense>
        <v-col cols="7">
          <v-text-field
            v-model="item.titulo"
            label="Título do Módulo"
            placeholder="Título do Módulo"
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
        <v-col cols="12">
          <v-textarea
            v-model="item.descricao"
            label="Descrição do Módulo"
            placeholder="Descrição do Módulo"
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
        @click="$router.push({ name: 'HomeModulesAdmin' })"
      />
    </v-row>

    <AppLoading v-if="loading" />
  </v-container>
</template>
