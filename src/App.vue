<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  
  <footer>
    <div class="container">
      <p>&copy; 2025 ModQR.</p>
    </div>
  </footer>
</template>

<style>
footer {
  padding: 4rem 0;
  text-align: center;
  border-top: 1px solid var(--glass-border);
  color: var(--text-muted);
}
</style>
