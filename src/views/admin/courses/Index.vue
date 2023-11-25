<script setup lang="ts">
import {ref} from "vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import GenericTable from "@/components/molecules/tables/GenericTable.vue";
import {deleteCursoById, getListarCursos} from "@/services/curso";
import {CursoDTOOut} from "@/types/curso";
import {useRouter} from "vue-router";

const filtro = ref({
  titulo: ""
})

const $router = useRouter()

const table = ref({
  items: [],
  totalItems: 0,
  loading: false,
  headers: [
    {
      title: 'Título do Curso',
      sortable: false,
      key: 'titulo',
    },
    {
      title: 'Carga Horária',
      sortable: false,
      align: 'center',
      key: 'cargaHoraria',
    },
    {
      title: 'Quantidade de Aulas',
      sortable: false,
      align: 'center',
      key: 'qtdAulas',
    },
    {
      title: 'Quantidade de Módulos',
      sortable: false,
      align: 'center',
      key: 'qtdModulos',
    },
    {
      title: 'Ações',
      sortable: false,
      align: 'center',
      key: 'acoes',
    },
  ]
})

const redirecionar = {
  novo: () => {
    $router.push({ name: "CadastrarCoursesAdmin" })
  },
  detalhar: (item: CursoDTOOut) => {
    console.log(item)
  },
  editar: (item: CursoDTOOut) => {
    console.log(item)
  }
}

const consultar = async () => {
  table.value.loading = true
  const { data, error } = await getListarCursos(filtro.value)
  table.value.loading = false

  if (error && !data) return console.log(error)

  table.value.items = data
  table.value.totalItems = table.value.items.length
}

const excluirCurso = async (item: CursoDTOOut) => {
  const { data, error } = await deleteCursoById(item.id)

  if (error && !data) return console.log(error)

  await consultar()
}

const limpar = () => {
  filtro.value.titulo = ""
  table.value.totalItems = 0
  table.value.items = []
}
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Manter Cursos</h2>
    <v-divider class="mb-5"/>

    <v-row dense>
      <InputText
          v-model="filtro.titulo"
          label="Título do Curso"
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
        <v-icon @click="redirecionar.detalhar(item)" size="small" title="Detalhar">mdi-magnify-plus</v-icon>
        <v-icon @click="redirecionar.editar(item)" size="small" title="Editar">mdi-pencil</v-icon>
        <v-icon @click="excluirCurso(item)" size="small" title="Detalhar">mdi-trash-can-outline</v-icon>
      </template>
    </GenericTable>
  </v-container>
</template>

<style scoped>

</style>
