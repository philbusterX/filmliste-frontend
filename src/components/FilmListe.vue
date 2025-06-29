<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import AddMovieForm from './AddMovieForm.vue';

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched: boolean;
  favorite: boolean;
  coverUrl?: string;
}

const filme: Ref<Movie[]> = ref([]);
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const selectedGenre: Ref<string> = ref('');
const filterFavorites: Ref<boolean> = ref(false);
const selectedWatchedStatus: Ref<string> = ref('all');
const isLoading: Ref<boolean> = ref(true);

const uniqueGenres: ComputedRef<string[]> = computed(() => {
  const allGenres = filme.value.map(film => film.genre);
  return ['Alle', ...new Set(allGenres)];
});
const filteredFilme: ComputedRef<Movie[]> = computed(() => {
  let tempFilme = filme.value;
  if (selectedGenre.value && selectedGenre.value !== 'Alle') {
    tempFilme = tempFilme.filter(film => film.genre === selectedGenre.value);
  }
  if (filterFavorites.value) {
    tempFilme = tempFilme.filter(film => film.favorite);
  }
  if (selectedWatchedStatus.value === 'watched') {
    tempFilme = tempFilme.filter(film => film.watched);
  } else if (selectedWatchedStatus.value === 'unwatched') {
    tempFilme = tempFilme.filter(film => !film.watched);
  }
  return tempFilme;
});
async function ladeFilme() {
  isLoading.value = true;
  try {
    const response = await fetch(`${apiBaseUrl}/movies`);
    if (!response.ok) throw new Error('Fehler beim Laden der Filme.');
    filme.value = await response.json() as Movie[];
  } catch (error) {
    console.error("Fehler:", error);
  } finally {
    isLoading.value = false;
  }
}
function handleMovieAdded() { ladeFilme(); }
async function deleteMovie(id: number) {
  if (!confirm('Diesen Film wirklich löschen?')) return;
  try {
    const response = await fetch(`${apiBaseUrl}/movies/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Fehler beim Löschen des Films.');
    ladeFilme();
  } catch (error) {
    console.error("Fehler beim Löschen:", error);
  }
}
async function toggleWatchedStatus(film: Movie) {
  try {
    const response = await fetch(`${apiBaseUrl}/movies/${film.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ watched: !film.watched })
    });
    if (!response.ok) throw new Error('Fehler beim Aktualisieren des Status.');
    film.watched = !film.watched;
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error);
  }
}
async function toggleFavoriteStatus(film: Movie) {
  try {
    const response = await fetch(`${apiBaseUrl}/movies/${film.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorite: !film.favorite })
    });
    if (!response.ok) throw new Error('Fehler beim Aktualisieren des Favoriten-Status.');
    film.favorite = !film.favorite;
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error);
  }
}
onMounted(() => {
  ladeFilme();
});
</script>

<template>
  <div>
    <AddMovieForm @movie-added="handleMovieAdded" />

    <div class="film-liste-container">
      <div class="filter-controls">
        <div class="filter-container">
          <label for="genre-filter">Genre:</label>
          <select id="genre-filter" v-model="selectedGenre">
            <option v-for="genre in uniqueGenres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>
        <div class="filter-container">
          <label for="watched-filter">Status:</label>
          <select id="watched-filter" v-model="selectedWatchedStatus">
            <option value="all">Alle</option>
            <option value="watched">Gesehen</option>
            <option value="unwatched">Ungesehen</option>
          </select>
        </div>
        <div class="filter-container">
          <input type="checkbox" id="favorite-filter" v-model="filterFavorites">
          <label for="favorite-filter">Nur Favoriten</label>
        </div>
      </div>

      <div v-if="isLoading" class="loading-spinner"></div>
      <div v-else-if="filteredFilme.length === 0" class="no-movies-info">
        <p>Keine Filme in der Datenbank gefunden oder passend zum Filter.</p>
      </div>

      <ul v-else>
        <li v-for="film in filteredFilme" :key="film.id">
          <div class="film-cover">
            <img v-if="film.coverUrl" :src="film.coverUrl" :alt="'Poster von ' + film.title">
            <div v-else class="cover-placeholder">
              <span>🎬</span>
            </div>
          </div>
          <div class="film-content">
            <div class="film-info">
              <h3>{{ film.title }}</h3>
              <div class="film-details">
                <p><strong>Jahr:</strong> {{ film.year }}</p>
                <p><strong>Genre:</strong> {{ film.genre }}</p>
                <p><strong>Rating:</strong> {{ film.rating }} / 10</p>
              </div>
            </div>
            <div class="film-actions">
              <button @click="toggleFavoriteStatus(film)" class="icon-btn" :class="{ 'is-favorite': film.favorite }" title="Als Favorit markieren">{{ film.favorite ? '⭐' : '☆' }}</button>
              <button @click="toggleWatchedStatus(film)" class="icon-btn watched-btn" :class="{ 'is-watched': film.watched }" title="Als gesehen markieren">👁️</button>
              <button @click="deleteMovie(film.id)" class="icon-btn delete-btn" title="Film löschen">🗑️</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.loading-spinner {
  border: 5px solid #333;
  border-top: 5px solid #42b883;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 50px auto;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.filter-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #2c2c2c;
  padding: 15px;
  border-radius: 8px;
}
.filter-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.filter-container label {
  font-weight: bold;
  color: #ccc;
}
.filter-container select, .filter-container input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #1e1e1e;
  color: #e0e0e0;
}
.no-movies-info {
  text-align: center;
  color: #888;
  margin-top: 3rem;
  padding: 2rem;
  background-color: #2c2c2c;
  border-radius: 8px;
}
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}
li {
  background-color: #2c2c2c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
}
li:hover {
  transform: translateY(-5px);
}
.film-cover {
  flex-shrink: 0;
  width: 180px;
  background-color: #3a3a3a;
}
.film-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: #555;
}
.film-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}
.film-info {
  flex-grow: 1;
}
li h3 {
  margin: 0 0 10px 0;
  color: #42b883;
  font-size: 1.5rem;
}
.film-details {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.film-details p {
  margin: 0;
  color: #ccc;
}
.film-details p strong {
  color: #999;
}
.film-actions {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 5px;
  line-height: 1;
  transition: all 0.2s;
  color: #888;
}
.icon-btn:hover {
  transform: scale(1.2);
}
.is-favorite {
  color: #ffc107;
}
.watched-btn {
  opacity: 0.5;
}
.is-watched {
  opacity: 1;
  color: #28a745;
}
.delete-btn:hover {
  color: #dc3545;
}
</style>
