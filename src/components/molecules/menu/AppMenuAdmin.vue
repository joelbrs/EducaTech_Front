<script setup lang="ts">
import AppNavigationAdmin from "@/components/molecules/nav/AppNavigationAdmin.vue";
import {ref} from "vue";

const navigator = ref(true)
</script>

<template>
  <v-app-bar border color="#27272A" scroll-behavior="elevate">
    <v-app-bar-nav-icon icon="mdi-menu" @click="navigator = !navigator"/>
    <v-app-bar-title>EducaTech</v-app-bar-title>
  </v-app-bar>

  <AppNavigationAdmin :value="navigator"/>
</template>
