<script setup lang="ts">
defineProps<{
  label?: string,
  counter?: boolean,
  disabled?: boolean,
  prefix?: string
  readonly?: boolean
  rules?: any[],
  suffix?: string,
  type?: string,
  modelValue?: string,
  cols?: number,
  icon?: string
}>()
</script>

<template>
  <v-col :cols="cols" :md="cols" sm="12">
    <v-textarea
        v-bind="$attrs"
        :value="modelValue"
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
        @input="$emit('update:modelValue', $event.target.value)"
        @click:append-inner="$emit('click')"
    />
  </v-col>
</template>
