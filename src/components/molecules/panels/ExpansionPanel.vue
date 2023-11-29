<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
  items: any[];
  title: string
}>();

const panel = ref(props.title);

const todosAssistidos = computed(() => {
  for (const item of props.items) {
    if (!item.assistida) {
      return false
    }
  }
  return true
})
</script>

<template>
  <v-expansion-panels
    class="mb-2"
    v-model="panel"
    multiple
    theme="dark"
    variant="accordion"
  >
    <v-expansion-panel :value="title" rounded>
      <v-expansion-panel-title>
        {{title}}
        <template v-slot:actions="{ expanded }">
          <v-icon :icon="!todosAssistidos ? 'mdi-menu-down' : 'mdi-check-circle'"></v-icon>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text
        v-for="item in items"
        class="mt-2 v-card--hover active"
        :key="item.id"
        @click="$emit(`click`, $event)"
      >
        <v-icon class="mr-2">{{ !item.assistida ? `mdi-play-circle` : `mdi-check` }}</v-icon>{{ item.titulo }}
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
