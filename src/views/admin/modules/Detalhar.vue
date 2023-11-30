<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Btn from "@/components/atoms/btns/Btn.vue";
import { getDetalharModulo } from "@/services/modulo";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";

const item = ref({
  titulo: "",
  curso: "",
  ordem: "",
  descricao: "",
  material: {
    arquivo: "",
    nome: "",
  },
});

const loading = ref(false);

const detalharModulo = async () => {
  const $route = useRoute();

  loading.value = true;
  const { data, error } = await getDetalharModulo($route.params.id.toString());
  loading.value = false;

  if (error && !data) return console.log(error);

  item.value = { ...data, curso: data?.curso.titulo };
};

const download = () => {
  const byteCharacters = atob(item.value.material.arquivo.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = item.value.material.nome;
  link.click();
};

detalharModulo();
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Detalhar Módulo</h2>
    <v-divider class="mb-5" />

    <v-row dense>
      <v-col cols="7">
        <v-text-field
          v-model="item.titulo"
          density="compact"
          placeholder="Título do Módulo"
          label="Título do Módulo"
          variant="outlined"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="item.curso"
          density="compact"
          placeholder="Curso"
          label="Curso"
          variant="outlined"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="item.ordem"
          density="compact"
          placeholder="Ordem"
          label="Ordem"
          variant="outlined"
          disabled
        ></v-text-field>
      </v-col>
      <v-col>
        <v-textarea
          v-model="item.descricao"
          density="compact"
          placeholder="Descrição do Módulo"
          label="Descrição do Módulo"
          variant="outlined"
          disabled
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row justify="end" dense>
      <Btn
        block
        cols="3"
        rounded="x"
        color="indigo"
        text="Download do Material"
        icon="mdi-download"
        @click.prevent.stop="download"
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
  </v-container>

  <AppLoading v-if="loading" />
</template>

<style scoped></style>
