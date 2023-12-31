<script setup lang="ts">
import { onMounted, ref } from "vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import GenericTable from "@/components/molecules/tables/GenericTable.vue";
import { CursoDTOOut } from "@/types/curso";
import { useRouter } from "vue-router";
import { deleteModuloById, getListarModulos } from "@/services/modulo";
import SelectField from "@/components/atoms/inputs/SelectField.vue";
import { getListarCursos } from "@/services/curso";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";

const filtro = ref({
  titulo: null,
  idCurso: null,
});

const cursos = ref([]);
const loading = ref(false);
const $router = useRouter();

const table = ref({
  items: [],
  totalItems: 0,
  loading: false,
  headers: [
    {
      title: "Título do Módulo",
      sortable: false,
      key: "titulo",
    },
    {
      title: "Curso",
      sortable: false,
      align: "center",
      key: "curso.titulo",
    },
    {
      title: "Ordem",
      sortable: false,
      align: "center",
      key: "ordem",
    },
    {
      title: "Ações",
      sortable: false,
      align: "center",
      key: "acoes",
    },
  ],
});

onMounted(() => consultarCursos());

const redirecionar = {
  novo: () => {
    $router.push({ name: "CadastrarModulesAdmin" });
  },
  detalhar: (item: CursoDTOOut) => {
    $router.push({ name: "DetalharModulesAdmin", params: { id: item.id } });
  },
  editar: (item: CursoDTOOut) => {
    $router.push({ name: "EditarModulesAdmin", params: { id: item.id } });
  },
};

const consultar = async () => {
  loading.value = true;
  const { data, error } = await getListarModulos(filtro.value);
  loading.value = false;

  if (error && !data) return console.log(error);

  table.value.items = data;
  table.value.totalItems = table.value.items.length;
};

const consultarCursos = async () => {
  loading.value = true;
  const { data, error } = await getListarCursos();
  loading.value = false;

  if (error && !data) return console.error(error);

  cursos.value = data;
};

const excluirModulo = async (item: CursoDTOOut) => {
  loading.value = true;
  const { error } = await deleteModuloById(item.id.toString());
  loading.value = false;

  if (error) return console.log(error);

  await consultar();
};

const limpar = () => {
  filtro.value.titulo = null;
  filtro.value.idCurso = null;
  table.value.totalItems = 0;
  table.value.items = [];
};
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Manter Módulos</h2>
    <v-divider class="mb-5" />

    <v-row dense>
      <InputText v-model="filtro.titulo" label="Título do Módulo" cols="8" />
      <SelectField
        v-model="filtro.idCurso"
        label="Curso"
        cols="4"
        item-title="titulo"
        item-value="id"
        :items="cursos"
      />
    </v-row>

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
        color="indigo-darken-4"
        text="Consultar"
        icon="mdi-magnify"
        @click.prevent.stop="consultar"
      />
      <Btn
        block
        cols="2"
        rounded="xs"
        text="Novo Registro"
        icon="mdi-playlist-plus"
        color="green"
        @click="redirecionar.novo()"
      />
    </v-row>

    <GenericTable
      v-if="table.totalItems !== 0"
      class="mt-3"
      :loading="table.loading"
      :headers="table.headers"
      :total-items="table.totalItems"
      :items-per-page="5"
      :items="table.items"
    >
      <template #[`item.acoes`]="{ item }">
        <v-icon
          @click="redirecionar.detalhar(item)"
          size="small"
          title="Detalhar"
          >mdi-magnify-plus</v-icon
        >
        <v-icon @click="redirecionar.editar(item)" size="small" title="Editar"
          >mdi-pencil</v-icon
        >
        <!--
        <v-icon @click="excluirModulo(item)" size="small" title="Detalhar">mdi-trash-can-outline</v-icon>
-->
      </template>
    </GenericTable>

    <AppLoading v-if="loading" />
  </v-container>
</template>

<style scoped></style>
