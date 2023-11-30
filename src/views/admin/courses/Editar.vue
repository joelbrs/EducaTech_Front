<script setup lang="ts">
import { ref } from "vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import { getDetalharCurso, putEditarCurso } from "@/services/curso";
import { useRoute, useRouter } from "vue-router";
import Validations from "@/utils/Validations";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";

const $router = useRouter();
const $route = useRoute();
const loading = ref(false);
const form = ref<HTMLFormElement>();

const detalharCurso = async () => {
  const $route = useRoute();

  loading.value = true;
  const { data, error } = await getDetalharCurso($route.params.id as string);
  loading.value = false;

  if (error && !data) return console.log(error);

  item.value = {
    ...item.value,
    ...data,
    modeloCertificado: (data as any)?.certificado,
  };
};

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
  const { data, error } = await putEditarCurso($route.params.id as string, {
    ...item.value,
    imagem: item.value.imagem.arquivo,
  });
  loading.value = false;

  if (error && !data) return console.log(error);

  await $router.push({ name: "HomeCoursesAdmin" });
};

detalharCurso();
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Editar Curso</h2>
    <v-divider class="mb-5" />

    <v-form ref="form">
      <v-row dense>
        <v-col cols="9">
          <v-text-field
            v-model="item.titulo"
            density="compact"
            placeholder="Título do Curso"
            label="Título do Curso"
            variant="outlined"
            suffix="*"
            :rules="[Validations.RequiredField]"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="item.cargaHoraria"
            density="compact"
            placeholder="Carga Horária"
            label="Carga Horária"
            variant="outlined"
            suffix="*"
            :rules="[Validations.RequiredField]"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="item.descricao"
            density="compact"
            placeholder="Descrição do Curso"
            label="Descrição do Curso"
            variant="outlined"
            suffix="*"
            :rules="[Validations.RequiredField]"
          ></v-textarea>
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
        @click="$router.push({ name: 'HomeCoursesAdmin' })"
      />
    </v-row>

    <AppLoading v-if="loading" />
  </v-container>
</template>
