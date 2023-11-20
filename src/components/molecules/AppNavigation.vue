<script setup lang="ts">
import {computed} from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  value: boolean
}>()

const emit = defineEmits<{
  (e: "input", value: boolean): void
}>()

const navigator = computed({
  get() {
    return props.value
  },

  set(newValue: boolean) {
    emit("input", newValue)
  }
})

const $router = useRouter()

</script>

<template>
  <v-navigation-drawer
    v-model="navigator"
  >
    <v-list density="compact" nav>
      <v-list-item @click="$router.push({ name: 'Home' })" prepend-icon="mdi-book-open" title="Cursos" value="cursos"></v-list-item>

      <v-list-item prepend-icon="mdi-account" title="Minha Conta" value="shared"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
