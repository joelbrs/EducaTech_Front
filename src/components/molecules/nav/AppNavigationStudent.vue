<script setup lang="ts">
import {computed} from "vue";
import { useRouter, useRoute } from "vue-router";

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

const $router = useRouter(), $route = useRoute()

</script>

<template>
  <v-navigation-drawer
    v-model="navigator"
  >
    <v-list density="compact" nav>
      <v-list-item
        @click="$router.push({ name: 'HomeStudent', params: { id: $route.params?.id } })"
        prepend-icon="mdi-book-open"
        title="Cursos"
        value="cursos"/>

      <v-list-item
        @click="$router.push({ name: 'AccountStudent', params: { id: $route.params?.id }})"
        prepend-icon="mdi-account"
        title="Minha Conta"
        value="shared"/>
    </v-list>
  </v-navigation-drawer>
</template>
