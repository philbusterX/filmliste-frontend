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
    favorite: favorite.value
  };

  try {
    const response = await fetch(`${apiBaseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMovie)
    });

    if (!response.ok) {
      throw new Error('Fehler beim Hinzufügen des Films.');
    }

    emit('movie-added');

    title.value = '';
    year.value = null;
    genre.value = '';
    rating.value = null;
    watched.value = false;
    favorite.value = false;

  } catch (error) {
    console.error("Fehler beim Senden der Formulardaten:", error);
  }
}
</script>

<template>
  <div class="add-movie-form-container">
    <h3>Neuen Film hinzufügen</h3>
    <form @submit.prevent="addMovie">
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
        <input id="rating" type="number" step="0.1" v-model.number="rating" required>
      </div>
      <div class="form-group-checkbox">
        <input id="watched" type="checkbox" v-model="watched">
        <label for="watched">Gesehen</label>
      </div>
      <div class="form-group-checkbox">
        <input id="favorite" type="checkbox" v-model="favorite">
        <label for="favorite">Favorit</label>
      </div>
      <button type="submit">Film speichern</button>
    </form>
  </div>
</template>

<style scoped>
.add-movie-form-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  background-color: #f9f9f9;
}

.add-movie-form-container h3 {
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="number"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.form-group-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #333;
}

.form-group-checkbox input {
  margin-right: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
