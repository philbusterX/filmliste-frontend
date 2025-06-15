<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import AddMovieForm from './AddMovieForm.vue';

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched: boolean;
  favorite: boolean;
}

const filme: Ref<Movie[]> = ref([]);
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function ladeFilme() {
  try {
    const response = await fetch(`${apiBaseUrl}/movies`);
    if (!response.ok) throw new Error('Fehler beim Laden der Filme.');
    const datenVomBackend = await response.json() as Movie[];
    filme.value = datenVomBackend;
  } catch (error) {
    console.error("Fehler:", error);
  }
}

function handleMovieAdded() {
  console.log('Neuer Film wurde hinzugefügt, lade Liste neu...');
  ladeFilme();
}

onMounted(() => {
  ladeFilme();
});
</script>

<template>
  <div>
    <AddMovieForm @movie-added="handleMovieAdded" />

    <div class="film-liste-container">
      <h2>Meine Film Liste</h2>
      <div v-if="filme.length === 0">
        <p>Keine Filme in der Datenbank gefunden. Füge einen neuen hinzu!</p>
      </div>
      <ul v-else>
        <li v-for="film in filme" :key="film.id">
          <h3>{{ film.title }}</h3>
          <p>Erscheinungsjahr: {{ film.year }} | Genre: {{ film.genre }}</p>
          <p>Rating: {{ film.rating }}</p>
          <p>Gesehen: {{ film.watched ? 'Ja' : 'Nein' }}</p>
          <p>Favorit: {{ film.favorite ? 'Ja' : 'Nein' }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.film-liste-container {
  margin-top: 20px;
}
</style>
