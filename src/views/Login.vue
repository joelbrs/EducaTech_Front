<script setup lang="ts">
import {ref} from 'vue'
import Validations from "@/utils/Validations";
import {getLogin} from "@/services/usuario";
import {useRouter} from "vue-router";
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputPassword from "@/components/atoms/inputs/InputPassword.vue";
import Btn from "@/components/atoms/btns/Btn.vue";

const usuario = ref({
  email: "",
  password: ""
})

const $router = useRouter()

const form = ref<HTMLFormElement>()

const login = async () => {
  const validate = await form.value?.validate()

  if (!validate.valid) return

  const { data, error } = await getLogin({
    email: usuario.value.email,
    senha: usuario.value.password
  })

  if (error) return console.log(error)

  if (data.tipoUsuario === "ADMIN") {
    return $router.push({ name: 'HomeAdmin', params: { id: data.id } })
  }
  return $router.push({ name: 'HomeStudent', params: { id: data.id } })
}

</script>

<template>
  <v-container class="mt-15 pa-5">
    <v-card
        class="mx-auto pa-12 pb-8 mt-15"
        elevation="8"
        max-width="448"
        rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Login</div>

      <v-form ref="form">
        <v-row class="mt-2" dense>
          <InputText
              v-model="usuario.email"
              label="Email"
              suffix="*"
              :cols="12"
              :rules="[Validations.RequiredField]"
          />

          <InputPassword
              v-model="usuario.password"
              label="Senha"
              suffix="*"
              :cols="12"
              :rules="[Validations.RequiredField]"
          />
        </v-row>
      </v-form>

      <Btn
          block
          text="Login"
          class="mb-2"
          color="blue"
          size="large"
          variant="tonal"
          @click.prevent.stop="login"
      />

      <v-card-text class="text-center">
        <router-link :to="{ name: 'RegisterStudent' }">Registre-se agora <v-icon icon="mdi-chevron-right"></v-icon></router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>
