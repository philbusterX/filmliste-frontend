<script setup>
import { ref, onMounted } from 'vue';

const filme = ref([]);
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function ladeFilme() {
  try {
    const response = await fetch(`${apiBaseUrl}/movies`);

    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    const datenVomBackend = await response.json();
    filme.value = datenVomBackend;

  } catch (error) {
    console.error("Fehler beim Laden der Filme:", error);
  }
}

onMounted(() => {
  ladeFilme();
});
</script>

<template>
  <div>
    <h2>Meine Film Liste</h2>
    <div v-if="filme.length === 0">
      <p>Lade Filme...</p>
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
</template>
