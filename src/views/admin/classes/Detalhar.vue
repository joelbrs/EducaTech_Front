<script setup lang="ts">
import { ref } from "vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";
import { useRoute, useRouter } from "vue-router";
import { getDetalharAulaByIdCursoIdModuloAndOrdem } from "@/services/aula";

const $router = useRouter();
const $route = useRoute();
const loading = ref(false);
const form = ref<HTMLFormElement>();

const item = ref({
  titulo: "",
  descricao: "",
  curso: "",
  modulo: "",
  ordem: "",
  video: "",
});

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
    curso: data.curso?.descricao,
    modulo: data.modulo?.descricao,
  };
};

consultarAula();
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Detalhar Aula</h2>
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
            disabled
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="item.curso"
            label="Curso"
            placeholder="Curso"
            variant="outlined"
            density="compact"
            disabled
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="item.modulo"
            label="Módulo"
            placeholder="Módulo"
            variant="outlined"
            density="compact"
            disabled
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="item.video"
            label="URL da Aula"
            placeholder="URL da Aula"
            variant="outlined"
            density="compact"
            disabled
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
            disabled
          />
        </v-col>
      </v-row>
    </v-form>

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
