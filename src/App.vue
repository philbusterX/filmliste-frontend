<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app-container">
    <RouterView />

    <footer class="app-footer">
      <p>&copy; 2025 Filmekatalog - Ein Projekt von Philipp Kumaigorodskii</p>
    </footer>
  </div>
</template>

<style scoped>
#app-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-footer {
  margin-top: auto;
  padding: 2rem 0 1rem 0;
  text-align: center;
  color: #555;
  font-size: 0.9rem;
}
</style>
