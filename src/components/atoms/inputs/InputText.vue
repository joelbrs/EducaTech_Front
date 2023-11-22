<script setup lang="ts">
import {computed, ref} from "vue";
import ApplyMasks from "@/plugins/ApplyMasks";

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
    return types.cpf()
  },
  set(newValue) {
    if (newValue) {
      emit("input", newValue)
    } else {
      emit("input", '')
    }
  }
})

const prependIcon = computed(() => {
  if (props.type === 'password') {
    return types.password()
  }
  return props.icon
})

const showPassword = ref(false)

const types = {
  cpf: () => {
    return ApplyMasks.ApplyMask(props.value, 'cpf')
  },
  password: () => {
    if (showPassword.value) {
      return "mdi-eye-off"
    }
    return "mdi-eye"
  }
}

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
      :append-inner-icon="prependIcon"
      hide-details="auto"
      variant="outlined"
      density="compact"
      clearable
      @click:append-inner="emit('search')"
      @click:prepend="showPassword = !showPassword"
    />
  </v-col>
</template>
