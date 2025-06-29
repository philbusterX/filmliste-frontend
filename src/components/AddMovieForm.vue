<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

const emit = defineEmits(['movie-added']);

const title: Ref<string> = ref('');
const year: Ref<number | null> = ref(null);
const genre: Ref<string> = ref('');
const rating: Ref<number | null> = ref(null);
const watched: Ref<boolean> = ref(false);
const favorite: Ref<boolean> = ref(false);
const coverUrl: Ref<string> = ref('');

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function addMovie() {
  if (!title.value || !year.value || !genre.value || !rating.value) {
    alert('Bitte fülle alle Felder (Titel, Jahr, Genre, Rating) aus.');
    return;
  }
  const newMovie = {
    title: title.value,
    year: year.value,
    genre: genre.value,
    rating: rating.value,
    watched: watched.value,
    favorite: favorite.value,
    coverUrl: coverUrl.value
  };

  try {
    const response = await fetch(`${apiBaseUrl}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie)
    });
    if (!response.ok) throw new Error('Fehler beim Hinzufügen des Films.');
    emit('movie-added');

    title.value = '';
    year.value = null;
    genre.value = '';
    rating.value = null;
    watched.value = false;
    favorite.value = false;
    coverUrl.value = '';
  } catch (error) {
    console.error("Fehler beim Senden der Formulardaten:", error);
  }
}
</script>

<template>
  <div class="add-movie-form-container">
    <h3>Neuen Film hinzufügen</h3>
    <form @submit.prevent="addMovie">
      <div class="form-grid">
        <div class="form-group">
          <label for="title">Titel:</label>
          <input id="title" type="text" v-model="title" required>
        </div>
        <div class="form-group">
          <label for="year">Jahr:</label>
          <input id="year" type="number" v-model.number="year" required>
        </div>
        <div class="form-group">
          <label for="genre">Genre:</label>
          <input id="genre" type="text" v-model="genre" required>
        </div>
        <div class="form-group">
          <label for="rating">Rating:</label>
          <input id="rating" type="number" step="0.1" min="0" max="10" v-model.number="rating" required>
        </div>
      </div>
      <div class="form-group full-width">
        <label for="coverUrl">Bild-URL (optional):</label>
        <input id="coverUrl" type="url" v-model="coverUrl" placeholder="https://beispiel.com/poster.jpg">
      </div>
      <div class="form-checkbox-group">
        <div class="form-group-checkbox">
          <input id="watched" type="checkbox" v-model="watched">
          <label for="watched">Gesehen</label>
        </div>
        <div class="form-group-checkbox">
          <input id="favorite" type="checkbox" v-model="favorite">
          <label for="favorite">Favorit</label>
        </div>
      </div>
      <button type="submit">Film speichern</button>
    </form>
  </div>
</template>

<style scoped>
.add-movie-form-container {
  background-color: #2c2c2c;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.add-movie-form-container h3 {
  color: #e0e0e0;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 15px;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #ccc;
  font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="url"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #1e1e1e;
  border: 1px solid #555;
  border-radius: 4px;
  color: #e0e0e0;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 8px rgba(66, 184, 131, 0.5);
}

.form-checkbox-group {
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  margin-top: 15px;
  margin-bottom: 25px;
}

.form-group-checkbox {
  display: flex;
  align-items: center;
  color: #ccc;
}

.form-group-checkbox input {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

button {
  width: 100%;
  padding: 12px 15px;
  border: none;
  background-color: #42b883;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #36a473;
}
</style>
