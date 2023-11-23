<script setup>
import {computed, ref} from 'vue'
import Validations from "@/utils/Validations";

const aluno = ref({
  email: "",
  password: ""
})

const visible = ref(false)

</script>

<template>
  <v-card
    class="mx-auto pa-12 pb-8 mt-15"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <div class="text-subtitle-1 text-medium-emphasis ml-2">Login</div>

    <v-text-field
      v-model="aluno.email"
      density="compact"
      placeholder="Email"
      label="Email"
      variant="outlined"
      suffix="*"
      :rules="[Validations.RequiredField]"
    />

    <v-text-field
      v-model="aluno.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Senha"
      label="Senha"
      variant="outlined"
      suffix="*"
      :rules="[Validations.RequiredField]"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-btn
      block
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
    >
      Login
    </v-btn>

    <v-card-text class="text-center">
        <router-link :to="{ name: 'RegisterStudent' }">Registre-se agora <v-icon icon="mdi-chevron-right"></v-icon></router-link>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
