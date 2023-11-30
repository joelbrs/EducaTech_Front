<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getDetalharCurso } from "@/services/curso";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";
import Btn from "@/components/atoms/btns/Btn.vue";

const item = ref({
  titulo: "",
  cargaHoraria: "",
  descricao: "",
  imagem: "",
  qtdAulas: 0,
  qtdModulos: 0,
  certificado: {
    nome: "",
    arquivo: "",
  },
});

const verificarCaminhoImagem = (imagem: string) => {
  if (imagem) {
    if (
      imagem?.includes(`data:image/jpeg;base64,`) ||
      imagem?.includes("data:image/png;base64,")
    ) {
      return imagem;
    }

    return `data:image/png;base64,${imagem}`;
  }
  return null;
};

const loading = ref(false);

const detalharCurso = async () => {
  const $route = useRoute();

  loading.value = true;
  const { data, error } = await getDetalharCurso($route.params.id as string);
  loading.value = false;

  if (error && !data) return console.log(error);

  item.value = {
    ...(data as any),
    imagem: verificarCaminhoImagem((data as any)?.imagem),
  };

  console.log(item.value);
};

const download = () => {
  const byteCharacters = atob(item.value.certificado.arquivo.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = item.value.certificado.nome;
  link.click();
};

detalharCurso();
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Detalhar Curso</h2>
    <v-divider class="mb-5" />

    <v-row dense>
      <v-col cols="2">
        <v-img width="100" :src="item.imagem" />
      </v-col>
      <v-col cols="7">
        <v-text-field
          v-model="item.titulo"
          density="compact"
          placeholder="Título do Curso"
          label="Título do Curso"
          variant="outlined"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="item.cargaHoraria"
          density="compact"
          placeholder="Carga Horária"
          label="Carga Horária"
          variant="outlined"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="2" />
      <v-col cols="5">
        <v-text-field
          v-model="item.qtdAulas"
          density="compact"
          placeholder="Quantidade de Aulas"
          label="Quantidade de Aulas"
          variant="outlined"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="item.qtdModulos"
          density="compact"
          placeholder="Quantidade de Módulos"
          label="Quantidade de Módulos"
          variant="outlined"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="2" />
      <v-col cols="10">
        <v-textarea
          v-model="item.descricao"
          density="compact"
          placeholder="Descrição do Curso"
          label="Descrição do Curso"
          variant="outlined"
          disabled
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row justify="end" dense>
      <Btn
        block
        cols="5"
        rounded="x"
        color="indigo"
        text="Download do Modelo do Certificado"
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
        @click="$router.push({ name: 'HomeCoursesAdmin' })"
      />
    </v-row>

    <AppLoading v-if="loading" />
  </v-container>
</template>

<style scoped></style>
