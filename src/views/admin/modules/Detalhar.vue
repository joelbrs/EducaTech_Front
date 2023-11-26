<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getDetalharCurso} from "@/services/curso";
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputTextArea from "@/components/atoms/inputs/InputTextArea.vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import {getDetalharModulo} from "@/services/modulo";

const item = ref({
  titulo: "",
  curso: "",
  ordem: "",
  descricao: "",
})

onMounted(() => detalharModulo())

const detalharModulo = async () => {
  const $route = useRoute()
  const { data, error } = await getDetalharModulo($route.params.id)

  if(error && !data) return console.log(error)

  item.value = { ...data, curso: data.curso.titulo }
}

</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Detalhar Módulo</h2>
    <v-divider class="mb-5"/>

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
</template>

<style scoped>

</style>
