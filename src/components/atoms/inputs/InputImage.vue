<script setup lang="ts">
import {Ref, ref} from "vue";
import Btn from "@/components/atoms/btns/Btn.vue";
import {ImageDTO} from "@/types/GenericTypes";

const $emits = defineEmits<{
  (e: "update:modelValue", value: any):void
}>()

const image: Ref<ImageDTO> = ref(new ImageDTO())
const uploader = ref<HTMLDivElement>()

const handleImage = (e: any) => {
  const selectedImage = e.target.files[0]
  createBase64Image(selectedImage)
}

const createBase64Image = (fileObject: File) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    image.value = {
      nome: fileObject.name,
      imagem: e.target.result.toString(),
      file: fileObject
    }

    $emits("update:modelValue", image.value)
  }
  reader.readAsDataURL(fileObject)
}
</script>

<template>
  <div class="d-flex">
    <v-row class="mt-2" dense>
      <v-col cols="10" md="10"  sm="12">
        <v-text-field
            v-model="image.nome"
            density="compact"
            variant="outlined"
            label="Descrição da Imagem"
            placeholder="Descrição da Imagem"
            clearable
            @click:clear="image = new ImageDTO()"
        />
      </v-col>
      <Btn
          color="primary"
          icon="mdi-paperclip"
          text="Anexar Imagem"
          cols="2"
          @click="uploader.click()"
      />
    </v-row>
  </div>
    <input ref="uploader" @change="handleImage" style="display: none" type="file" accept="image/*">
</template>
