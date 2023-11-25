<script setup>
import {ref} from 'vue'
import Validations from "@/utils/Validations";
import {getLogin} from "@/services/usuario";
import {useRouter} from "vue-router";

const admin = ref({
  email: "",
  password: ""
})

const visible = ref(false)

const $router = useRouter()

const login = async () => {
  const { data, error } = await getLogin({
    email: admin.value.email,
    senha: admin.value.password
  })

  if (error) console.log(error)

  if (data.tipoUsuario === "ADMIN") {
    return $router.push({ name: 'HomeAdmin', params: { id: data.id } })
  }
  console.error("Usuario nao eh admin")
}

</script>

<template>
  <v-card
    class="mx-auto pa-12 pb-8 mt-15"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <div class="text-subtitle-1 text-medium-emphasis ml-2">Login (ADMIN)</div>

    <v-text-field
      v-model="admin.email"
      density="compact"
      placeholder="Email"
      label="Email"
      variant="outlined"
      suffix="*"
      :rules="[Validations.RequiredField]"
    />

    <v-text-field
      v-model="admin.password"
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
      @click="login"
      block
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
    >
      Login
    </v-btn>
  </v-card>
</template>

<style scoped>

</style>
