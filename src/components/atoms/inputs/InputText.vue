<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  label?: string,
  counter?: boolean,
  disabled?: boolean,
  prefix?: string
  readonly?: boolean
  rules?: any[],
  suffix?: string,
  type?: string,
  value: string,
  cols?: number,
  icon?: string
}>()

const emit = defineEmits<{
  (e: "input", value: string): void,
  (e: "click"): void
}>()

const text = computed({
  get() {
    return props.value
  },
  set(newValue) {
    emit("input", newValue)
  }
})
</script>

<template>
  <v-col :cols="cols">
    <v-text-field
      v-model="text"
      :label="label"
      :counter="counter"
      :disabled="disabled"
      :placeholder="label"
      :prefix="prefix"
      :readonly="readonly"
      :rules="rules"
      :suffix="suffix"
      :type="type"
      :append-inner-icon="icon"
      hide-details="auto"
      variant="outlined"
      density="compact"
      clearable
      @click:append-inner="emit('click')"
    />
  </v-col>
</template>
