<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import GenericTable from "@/components/molecules/tables/GenericTable.vue";
import {CursoDTOOut} from "@/types/curso";
import {useRouter} from "vue-router";
import {deleteModuloById, getListarModulos, getListarModulosByIdCurso} from "@/services/modulo";
import SelectField from "@/components/atoms/inputs/SelectField.vue";
import {getListarCursos} from "@/services/curso";
import {deleteAulaById, getListarAulas} from "@/services/aula";

const filtro = ref({
  titulo: "",
  idCurso: "",
  idModulo: ""
})

const cursos = ref([])
const modulos = ref([])

const $router = useRouter()

const table = ref({
  items: [],
  totalItems: 0,
  loading: false,
  headers: [
    {
      title: 'Título da Aula',
      sortable: false,
      key: 'titulo',
    },
    {
      title: 'Curso',
      sortable: false,
      align: 'center',
      key: 'curso.titulo',
    },
    {
      title: 'Módulo',
      sortable: false,
      align: 'center',
      key: 'modulo.titulo',
    },
    {
      title: 'Ordem',
      sortable: false,
      align: 'center',
      key: 'ordem',
    },
    {
      title: 'Ações',
      sortable: false,
      align: 'center',
      key: 'acoes',
    },
  ]
})

watch(() => filtro.value.idCurso, (novo) => {
  if (novo) {
    consultarModulos()
  }

  if (!novo) {
    filtro.value.idModulo = ""
  }
})
onMounted(() => consultarCursos())

const redirecionar = {
  novo: () => {
    $router.push({ name: "CadastrarClassesAdmin" })
  },
  detalhar: (item: CursoDTOOut) => {
    $router.push({ name: "DetalharModulesAdmin", params: { id: item.id } })
  },
  editar: (item: CursoDTOOut) => {
    console.log(item)
  }
}

const consultar = async () => {
  table.value.loading = true
  const { data, error } = await getListarAulas(filtro.value)
  table.value.loading = false

  if (error && !data) return console.log(error)

  table.value.items = data
  table.value.totalItems = table.value.items?.length
}

const consultarCursos = async () => {
  const { data, error } = await getListarCursos()

  if (error && !data) return console.error(error)

  cursos.value = data
}

const consultarModulos = async () => {
  const { data, error } = await getListarModulosByIdCurso(filtro.value.idCurso)

  if (error && !data) return console.error(error)

  modulos.value = data
}

const excluirAula = async (item: CursoDTOOut) => {
  const { error } = await deleteAulaById(item.id.toString())

  if (error) return console.log(error)

  await consultar()
}

const limpar = () => {
  filtro.value = {
    idModulo: "",
    idCurso: "",
    titulo: ""
  }
  table.value.totalItems = 0
  table.value.items = []
}

</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Manter Aulas</h2>
    <v-divider class="mb-5"/>

    <v-row dense>
      <InputText
        v-model="filtro.titulo"
        label="Título da Aula"
        cols="6"
      />
      <SelectField
        v-model="filtro.idCurso"
        label="Curso"
        cols="3"
        item-title="titulo"
        item-value="id"
        :items="cursos"/>
      <SelectField
        v-model="filtro.idModulo"
        label="Módulo"
        cols="3"
        item-title="titulo"
        item-value="id"
        :items="modulos"
        :disabled="!filtro.idCurso"
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
        @click.prevent.stop="redirecionar.novo()"
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
        <v-icon @click="redirecionar.detalhar(item)" size="small" title="Detalhar">mdi-magnify-plus</v-icon>
        <v-icon @click="redirecionar.editar(item)" size="small" title="Editar">mdi-pencil</v-icon>
        <v-icon @click="excluirAula(item)" size="small" title="Detalhar">mdi-trash-can-outline</v-icon>
      </template>
    </GenericTable>
  </v-container>
</template>

<style scoped>

</style>
