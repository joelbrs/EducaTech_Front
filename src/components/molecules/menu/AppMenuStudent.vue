<script setup lang="ts">
import AppNavigation from "@/components/molecules/nav/AppNavigationStudent.vue";
import {ref} from "vue";

const navigator = ref(true)
</script>

<template>
  <v-app-bar border color="#27272A" scroll-behavior="elevate">
    <v-app-bar-nav-icon icon="mdi-menu" @click="navigator = !navigator"/>
    <v-app-bar-title>EducaTech</v-app-bar-title>
  </v-app-bar>

  <AppNavigation :value="navigator"/>
</template>
