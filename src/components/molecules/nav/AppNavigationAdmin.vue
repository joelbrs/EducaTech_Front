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
        @click="$router.push({ name: 'HomeCoursesAdmin', params: { id: $route.params?.id } })"
        prepend-icon="mdi-arrow-right-bottom"
        title="Manter Cursos"
        value="cursos"/>

      <v-list-item
        @click="$router.push({ name: 'HomeModulesAdmin', params: { id: $route.params?.id }})"
        prepend-icon="mdi-arrow-right-bottom"
        title="Manter Módulos"
        value="shared"/>

      <v-list-item
        @click="$router.push({ name: 'HomeClassesAdmin', params: { id: $route.params?.id }})"
        prepend-icon="mdi-arrow-right-bottom"
        title="Manter Aulas"
        value="shared"/>

    </v-list>
  </v-navigation-drawer>
</template>
