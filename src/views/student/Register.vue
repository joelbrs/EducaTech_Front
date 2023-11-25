<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router";
import {ApiPost} from "@/utils/CustomAPI";
import {postCriarAluno} from "@/services/usuario";

const aluno = ref({
  cpf: "",
  email: "",
  senha: "",
  nome: "",
  senhaNova: ""
})

const senhas = ref({
  original: false,
  confirmacao: false
})

const $router = useRouter()

const cadastrar = async () => {
  const { data, error } = await postCriarAluno(aluno.value)

  if (error) return console.error(error)
  await $router.push({name: 'HomeStudent', params: {id: (data as any)?.id}})
}
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Cadastrar conta</h2>
    <v-divider class="mb-5"/>

    <v-card class="mt- 5 pa-5">
      <v-row dense>
        <v-col cols="12">
          <p class="text-grey-darken-1">Informações Básicas</p>
        </v-col>

        <v-col cols="3">
          <v-text-field
            v-model="aluno.cpf"
            density="compact"
            placeholder="CPF"
            label="CPF"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col cols="9">
          <v-text-field
            v-model="aluno.nome"
            density="compact"
            placeholder="Nome Completo"
            label="Nome Completo"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            class="mt-2"
            v-model="aluno.email"
            density="compact"
            placeholder="Email"
            label="Email"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-5" dense>
        <v-col cols="12">
          <p class="text-grey-darken-1">Alteração de Senha</p>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="aluno.senha"
            :append-inner-icon="senhas.original ? 'mdi-eye-off' : 'mdi-eye'"
            :type="senhas.original ? 'text' : 'password'"
            density="compact"
            placeholder="Cadastrar senha"
            label="Cadastrar senha"
            variant="outlined"
            @click:append-inner="senhas.original = !senhas.original"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="aluno.senhaNova"
            :append-inner-icon="senhas.confirmacao ? 'mdi-eye-off' : 'mdi-eye'"
            :type="senhas.confirmacao ? 'text' : 'password'"
            density="compact"
            placeholder="Confirmar senha"
            label="Confirmar senha"
            variant="outlined"
            @click:append-inner="senhas.confirmacao = !senhas.confirmacao"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <v-btn
      @click="cadastrar"
      block
      class="mt-3"
      color="blue"
      size="large"
      variant="tonal"
    >
      Registrar
    </v-btn>
  </v-container>
</template>


<style scoped>

</style>
