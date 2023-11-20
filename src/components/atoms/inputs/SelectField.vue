<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  label?: string,
  clearable?: boolean,
  disabled?: boolean,
  items?: any[],
  itemValue?: string,
  itemTitle?: string,
  prefix?: string,
  readonly?: boolean,
  returnObject?: boolean,
  rules?: (Function | Boolean | String)[],
  suffix?: string,
  type?: string,
  value: string | number
}>()

const emit = defineEmits<{
  (e: "input", value: any)
}>()

const select = computed({
  get() {
    return props.value && +props.value ? +props.value : props.value;
  },
  set(newValue: string | number) {
    emit("input", newValue)
  }
})

</script>

<template>
  <v-select
    v-model="select"
    :label="label"
    :clearable="clearable"
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
  />
</template>
