<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  title: string,
  texts: string[],
  value: string,
}>()

const panel = ref(props.value)

</script>

<template>
    <v-expansion-panels
      class="mb-2"
      v-model="panel"
      multiple
      theme="dark"
      variant="inset"
    >

      <v-expansion-panel
        :title="title"
        :value="value"
        rounded
      >
        <v-expansion-panel-text
          class="mt-2 v-card--hover"
          v-for="text in texts"
          :key="text"
          @click="$emit(`click`, $event)"
        >
          <v-icon class="mr-2">mdi-play-circle</v-icon>{{text}}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
</template>
