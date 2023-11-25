<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router";
import {ApiPost} from "@/utils/CustomAPI";
import {postCriarAluno} from "@/services/usuario";
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputPassword from "@/components/atoms/inputs/InputPassword.vue";
import Btn from "@/components/atoms/btns/Btn.vue";

const aluno = ref({
  cpf: "",
  email: "",
  senha: "",
  nome: "",
  senhaNova: ""
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

        <InputText
            v-model="aluno.cpf"
            label="CPF"
            cols="3"
        />

        <InputText
            v-model="aluno.nome"
            label="Nome Completo"
            cols="9"
        />

        <InputText
            class="mt-2"
            v-model="aluno.email"
            label="Email"
        />
      </v-row>

      <v-row class="mt-5" dense>
        <v-col cols="12">
          <p class="text-grey-darken-1">Alteração de Senha</p>
        </v-col>

        <InputPassword
            v-model="aluno.senha"
            label="Cadastrar senha"
            variant="outlined"
            cols="6"
        />
        <InputPassword
            v-model="aluno.senhaNova"
            label="Confirmar senha"
            variant="outlined"
            cols="6"
        />
      </v-row>
    </v-card>

    <Btn
        block
        text="Registrar"
        class="mt-3"
        color="blue"
        size="large"
        variant="tonal"
        @click="cadastrar"
    />
  </v-container>
</template>


<style scoped>

</style>
