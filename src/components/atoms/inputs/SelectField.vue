<script setup lang="ts">
defineProps<{
  label: string,
  clearable?: boolean,
  disabled?: boolean,
  items: any[],
  itemValue: string,
  itemTitle: string,
  prefix?: string,
  readonly?: boolean,
  returnObject?: boolean,
  rules?: (Function | Boolean | String)[],
  suffix?: string,
  type?: string,
  modelValue?: string | number
  cols?: number | string
}>()

</script>

<template>
  <v-col :cols="cols" :md="cols" sm="12">
    <v-select
        v-bind="$attrs"
        :value="modelValue"
        :label="label"
        :disabled="disabled"
        :items="items"
        :item-value="itemValue"
        :item-title="itemTitle"
        :placeholder="label"
        :prefix="prefix"
        :readonly="readonly"
        :return-object="returnObject"
        :rules="rules"
        :suffix="suffix"
        :type="type"
        variant="outlined"
        density="compact"
        clearable
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </v-col>
</template>
