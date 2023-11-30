<script setup lang="ts">
import { Ref, ref } from "vue";
import Btn from "@/components/atoms/btns/Btn.vue";

defineProps({
  cols: {
    default: 10 as string | number,
    required: false
  },
  label: {
    default: "Descrição do Arquivo"
  },
  textBtn: {
    default: "Anexar Arquivo"
  }
});

const $emits = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

const arquivo = ref({
  nome: "",
  file: null as null | File,
  arquivo: "",
});

const limpar = () => {
  arquivo.value = {
    nome: "",
    file: null,
    arquivo: "",
  };
};

const uploader = ref<HTMLDivElement>();

const handleImage = (e: any) => {
  const selectedImage = e.target.files[0];
  createBase64Image(selectedImage);
};

const createBase64Image = (fileObject: File) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    arquivo.value = {
      nome: fileObject.name,
      arquivo: e.target?.result.toString(),
      file: fileObject,
    };

    $emits("update:modelValue", arquivo.value);
  };
  reader.readAsDataURL(fileObject);
};
</script>

<template>
    <v-row class="mt-2" dense>
      <v-col :cols="cols" :md="cols" :sm="12">
        <v-text-field
          v-model="arquivo.nome"
          density="compact"
          variant="outlined"
          :label="label"
          :placeholder="label"
          clearable
          @click:clear="limpar"
        />
      </v-col>
      <Btn
        color="primary"
        icon="mdi-paperclip"
        :text="textBtn"
        cols="2"
        @click.prevent.stop="uploader?.click()"
      />
    </v-row>
  <input
    ref="uploader"
    @change="handleImage"
    style="display: none"
    type="file"
    accept="image/*"
  />
</template>
