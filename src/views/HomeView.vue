<script setup lang="ts">
import FilmListe from '../components/FilmListe.vue';
</script>

<template>
  <main>
    <h1 class="main-headline">Filmekatalog</h1>
    <FilmListe />
  </main>
</template>

<style scoped>
.main-headline {
  font-family: 'Poppins', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-align: center;
  margin-bottom: 3rem;

  background: linear-gradient(45deg, #42d392 30%, #647eff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
