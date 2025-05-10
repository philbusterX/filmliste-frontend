<script setup lang="ts">
import { ref } from 'vue';

const filme = ref([
  { id: 1, titel: 'Inception', regisseur: 'Christopher Nolan', erscheinungsjahr: 2010, genre: 'Sci-Fi' },
  { id: 2, titel: 'The Dark Knight', regisseur: 'Christopher Nolan', erscheinungsjahr: 2008, genre: 'Action' },
  { id: 3, titel: 'Interstellar', regisseur: 'Christopher Nolan', erscheinungsjahr: 2014, genre: 'Sci-Fi' },
]);
</script>

<template>
  <div class="film-liste-container">
    <h2>Meine Film Liste</h2>
    <ul v-if="filme.length > 0">
      <li v-for="film in filme" :key="film.id" class="film-eintrag">
        <h3>{{ film.titel }}</h3>
        <p>Regisseur: {{ film.regisseur }}</p>
        <p>Jahr: {{ film.erscheinungsjahr }} | Genre: {{ film.genre }}</p>
      </li>
    </ul>
    <p v-else>
      Keine Filme in der Liste vorhanden.
    </p>
  </div>
</template>


