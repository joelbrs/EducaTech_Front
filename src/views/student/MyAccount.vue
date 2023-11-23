<script setup>
import { ref } from "vue"
import {ApiGet} from "@/utils/CustomAPI";
import {useRoute} from "vue-router";

const aluno = ref({
  id: "",
  cpf: "",
  nome: "",
  email: "",
  tipoUsuario: "",
  senhaAtual: "",
  senhaNova: "",
  confirmacaoSenha: ""
})

const senhas = ref({
  atual: false,
  nova: false,
  confirmacao: false
})

const $route = useRoute()

const consultarAluno = async () => {
  const { data, error } = await ApiGet(`http://localhost:8080/usuarios/${$route.params?.id}`)

  if (error) return console.error(error)
  aluno.value = data
}

consultarAluno()
</script>

<template>
  <v-container class="pa-15">
      <p class="text-grey">EducaTech</p>
      <h2 class="mb-2">Minha Conta</h2>
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
                disabled
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
                disabled
              ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="mt-5" dense>
          <v-col cols="12">
            <p class="text-grey-darken-1">Alteração de Senha</p>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="aluno.senhaAtual"
              :append-inner-icon="senhas.atual ? 'mdi-eye-off' : 'mdi-eye'"
              :type="senhas.atual ? 'text' : 'password'"
              density="compact"
              placeholder="Senha Atual"
              label="Senha Atual"
              variant="outlined"
              @click:append-inner="senhas.atual = !senhas.atual"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="aluno.senhaNova"
              :append-inner-icon="senhas.nova ? 'mdi-eye-off' : 'mdi-eye'"
              :type="senhas.nova ? 'text' : 'password'"
              density="compact"
              placeholder="Senha Atual"
              label="Senha Atual"
              variant="outlined"
              @click:append-inner="senhas.nova = !senhas.nova"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="aluno.confirmacaoSenha"
              :append-inner-icon="senhas.confirmacao ? 'mdi-eye-off' : 'mdi-eye'"
              :type="senhas.confirmacao ? 'text' : 'password'"
              density="compact"
              placeholder="Confirme sua nova senha"
              label="Confirme sua nova senha"
              variant="outlined"
              @click:append-inner="senhas.confirmacao = !senhas.confirmacao"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-row class="mt-5" justify="end">
<!--        <BtnSave
          class="mr-3"
          @click="$router.push({ name: 'Home' })"
          text="Cancelar"
          icon="mdi-cancel"
          :plain="true"
        />

        <BtnSave
          class="mr-3"
          text="Salvar"
          color="black"
          icon="mdi-content-save-all-outline"
        />-->
      </v-row>
  </v-container>
</template>

<style scoped>

</style>
