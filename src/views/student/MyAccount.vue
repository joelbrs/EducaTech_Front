<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Btn from "@/components/atoms/btns/Btn.vue";
import { getAlunoById, putAtualizarAluno } from "@/services/usuario";
import AppLoading from "@/components/atoms/loading/AppLoading.vue";
import ApplyMasks from "@/plugins/ApplyMasks";

const aluno = ref({
  id: "",
  cpf: "",
  nome: "",
  email: "",
  tipoUsuario: "",
  senhaAtual: "",
  senhaNova: "",
  confirmacaoSenha: "",
});

const senhas = ref({
  atual: false,
  nova: false,
  confirmacao: false,
});

const loading = ref(false);
const $router = useRouter();
const $route = useRoute();

const consultarAluno = async () => {
  loading.value = true;
  const { data, error } = await getAlunoById($route.params?.id as string);
  loading.value = false;

  if (error) return console.error(error);
  aluno.value = {
    ...aluno.value,
    ...data,
    cpf: ApplyMasks.ApplyMask(data?.cpf as string, `cpf`),
  };
};

const salvar = async () => {
  loading.value = true;
  const { data, error } = await putAtualizarAluno(
    $route.params.id as string,
    aluno.value
  );
  loading.value = false;

  if (error) return console.log(error);
  irParaHome();
};

const irParaHome = () => {
  $router.push({ name: "HomeStudent" });
};

consultarAluno();
</script>

<template>
  <v-container class="pa-15">
    <p class="text-grey">EducaTech</p>
    <h2 class="mb-2">Minha Conta</h2>
    <v-divider class="mb-5" />

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

    <v-row class="mt-2" justify="end" dense>
      <Btn
        block
        cols="3"
        rounded="xs"
        text="Cancelar"
        icon="mdi-cancel"
        @click="irParaHome"
      />
      <Btn
        block
        cols="3"
        rounded="xs"
        text="Salvar"
        icon="mdi-content-save-all-outline"
        color="green"
        @click="salvar"
      />
    </v-row>

    <AppLoading v-if="loading" />
  </v-container>
</template>

<style scoped></style>
