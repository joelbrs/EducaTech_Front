<script setup lang="ts">
import { ref } from "vue";
defineProps<{
  label?: string;
  prefix?: string;
  rules?: any[];
  suffix?: string;
  type?: string;
  modelValue?: string;
  cols?: number;
}>();

const visible = ref(false);
</script>

<template>
  <v-col :cols="cols" :md="cols" sm="12">
    <v-text-field
      v-bind="$attrs"
      :value="modelValue"
      :label="label"
      :placeholder="label"
      :prefix="prefix"
      :rules="rules"
      :suffix="suffix"
      :type="visible ? 'text' : 'password'"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      variant="outlined"
      density="compact"
      clearable
      @input="$emit('update:modelValue', $event.target.value)"
      @click:append-inner="visible = !visible"
    />
  </v-col>
</template>

<style scoped></style>
