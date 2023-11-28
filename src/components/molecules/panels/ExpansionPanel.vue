<script setup lang="ts">
import { Ref, ref } from "vue";

const props = defineProps<{
  title: string;
  texts: string[];
  value: string;
}>();

const panel = ref(props.value);

const active: Ref<any> = ref({});

const onClickOutside = (text: string) => {
  (active as any)[text].value = !(active as any)[text].value;
};
</script>

<template>
  <v-expansion-panels
    class="mb-2"
    v-model="panel"
    multiple
    theme="dark"
    variant="accordion"
  >
    <v-expansion-panel :title="title" :value="value" rounded>
      <v-expansion-panel-text
        v-for="text in texts"
        v-click-outside="onClickOutside"
        class="mt-2 v-card--hover active"
        :key="text"
        @click="$emit(`click`, $event), (active[text] = true)"
      >
        <v-icon class="mr-2">mdi-play-circle</v-icon>{{ text }}
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
