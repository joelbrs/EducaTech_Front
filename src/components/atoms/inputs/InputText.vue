<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  label?: string,
  clearable?: boolean,
  counter?: boolean,
  disabled?: boolean,
  prefix?: string
  readonly?: boolean
  rules?: any[],
  suffix?: string,
  type?: string,
  value: string
}>()

const emit = defineEmits<{
  (e: "input", value: string): void
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
  <v-text-field
    v-model="text"
    :label="label"
    :clearable="clearable"
    :counter="counter"
    :disabled="disabled"
    :placeholder="label"
    :prefix="prefix"
    :readonly="readonly"
    :rules="rules"
    :suffix="suffix"
    :type="type"
  />
</template>
