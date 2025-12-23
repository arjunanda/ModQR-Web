<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useLanguageStore } from './stores/language'

const languageStore = useLanguageStore()

watch(() => languageStore.lang, (newLang) => {
  document.documentElement.lang = newLang
}, { immediate: true })

onMounted(() => {
  // Global SEO defaults
  if (!document.title) {
    document.title = "ModQR - The Most Aesthetic & Zero-Dependency QR Code Generator"
  }
})
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
