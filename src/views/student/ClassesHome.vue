<template>
  <v-container class="pa-15">
    <v-row dense>
      <v-col cols="5">
        <div class="position-fixed">
          <iframe
            v-if="aulaAtual && aulaAtual.video"
            width="560px"
            height="315px"
            :src="aulaAtual.video"
          />
          <div v-if="aulaAtual && aulaAtual.descricao" class="mt-5">
            <h2>{{ aulaAtual.titulo }}</h2>
            <p class="text-break">{{ aulaAtual.descricao }}</p>

            <div class="d-flex justify-center align-center mt-5">
              <v-btn class="mr-5" prepend-icon="mdi-check" variant="outlined">
                Finalizar Aula
              </v-btn>
              <v-btn
                prepend-icon="mdi-download"
                variant="outlined"
                color="blue"
                @click="downloadMaterial(filtrarModulo(aulaAtual.idModulo))"
              >
                Download do Material
              </v-btn>
            </div>
          </div>
        </div>

        <div
          v-if="curso && curso.titulo && !aulaAtual.video"
          class="mt-15 position-fixed"
        >
          <v-col cols="8">
            <h2>{{ curso.titulo }}</h2>
            <p class="text-grey-darken-1">
              {{ curso.qtdAulas }} aulas • {{ curso.qtdModulos }} módulos
            </p>

            <p class="text-break">{{ curso.descricao }}</p>
          </v-col>
        </div>
      </v-col>

      <v-col cols="7" md="7" sm="12">
        <ExpansionPanel
          v-for="modulo in modulos"
          :key="modulo.id"
          @click.prevent.stop="selecionarAula($event.target.innerText)"
          :texts="extrairAulas(modulo.aulas)"
          :title="modulo.titulo"
          :value="modulo.id"
        />
      </v-col>
    </v-row>

    <div class="d-flex justify-end">
      <v-btn
        prepend-icon="mdi-file-document-multiple-outline"
        variant="outlined"
        color="green"
      >
        Emitir Certificado
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import ExpansionPanel from "@/components/molecules/panels/ExpansionPanel.vue";
import { onMounted, Ref, ref } from "vue";
import { getListarModulosComAulas } from "@/services/modulo";
import { useRoute } from "vue-router";
import { getDetalharCurso } from "@/services/curso";
import { CursoDTOOut } from "@/types/curso";
import { AulaDTOOut } from "@/types/aula";
import { ModuloDTOOut } from "@/types/modulo";
import { json } from "stream/consumers";

const curso: Ref<CursoDTOOut> = ref({
  id: 0,
  titulo: "",
  cargaHoraria: 0,
  descricao: "",
  imagem: "",
  qtdAulas: 0,
  qtdModulos: 0,
});
const modulos: Ref<any> = ref([]);
const aulaAtual: Ref<any> = ref({});
const $route = useRoute();

/**
 *[
 *  {
 *    modulo: {},
 *    aulas: []
 *  }
 *]
 * */

onMounted(() => consultarModulos());
onMounted(() => consultarCurso());

const consultarCurso = async () => {
  const { data, error } = await getDetalharCurso(
    $route.params.idCourse as string
  );

  if (error && !data) return console.error(error);
  curso.value = { ...curso.value, ...data };
};

const consultarModulos = async () => {
  const { data, error } = await getListarModulosComAulas(
    $route.params.idCourse as string
  );

  if (error && !data) return console.error(error);

  modulos.value = data?.filter((modulo: any) => modulo.aulas.length !== 0);
};

const selecionarAula = (titulo: string) => {
  for (const modulo of modulos.value) {
    for (const aula of modulo.aulas) {
      if (aula.titulo === titulo) {
        aulaAtual.value = aula;
      }
    }
  }
};

const filtrarModulo = (idModulo: string) => {
  return JSON.parse(
    JSON.stringify(
      modulos.value.filter((m: ModuloDTOOut) => m.id === +idModulo)
    )
  )[0];
};

const downloadMaterial = (modulo: any) => {
  const byteCharacters = atob(
    modulo.material.arquivo?.split("''")[0]?.split(",")[1]
  );
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = modulo.material.nome;
  link.click();
};

const extrairAulas = (aulas: AulaDTOOut[]) => {
  return aulas?.map((aula: AulaDTOOut) => aula.titulo);
};
</script>

<style scoped></style>
