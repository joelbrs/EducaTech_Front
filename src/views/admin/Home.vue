<template>
  <v-container class="pa-15">
    <v-row dense>
      <h2 class="mb-2">Cursos</h2>
      <v-spacer />
      <v-col cols="3">
        <v-text-field
          density="compact"
          placeholder="Pesquisar"
          label="Pesquisar"
          variant="outlined"
          append-inner-icon="mdi-magnify"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>
