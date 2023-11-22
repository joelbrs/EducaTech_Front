<script setup>
import InputText from "@/components/atoms/inputs/InputText.vue";
import { ref } from "vue"
import {ApiGet} from "@/utils/CustomAPI";
import BtnSave from "@/components/atoms/btns/BtnSave.vue";

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

const consultarAluno = async () => {
  const { data, error } = await ApiGet(`http://localhost:8080/usuarios/1`)

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
          <InputText
            :value="aluno.cpf"
            :cols="3"
            type="cpf"
            label="CPF"
            disabled
          />
          <InputText
            :value="aluno.nome"
            :cols="9"
            label="Nome Completo"
          />
          <InputText
            :value="aluno.email"
            class="mt-2"
            :cols="12"
            label="Email"
            disabled
          />
        </v-row>

        <v-row class="mt-5" dense>
          <v-col cols="12">
            <p class="text-grey-darken-1">Alteração de Senha</p>
          </v-col>
          <InputText
            :value="aluno.senhaAtual"
            :cols="4"
            label="Senha Atual"
            type="password"
          />
          <InputText
            :value="aluno.senhaNova"
            :cols="4"
            label="Senha Nova"
            type="password"
          />
          <InputText
            :value="aluno.confirmacaoSenha"
            :cols="4"
            label="Confirme Sua Senha Nova"
            type="password"
          />
        </v-row>
      </v-card>

      <v-row class="mt-5" justify="end">
        <BtnSave
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
        />
      </v-row>
  </v-container>
</template>

<style scoped>

</style>
