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
/* Global Styles */
:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --bg: #0f172a;
  --card-bg: #1e293b;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --accent: #f43f5e;
  --glass: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Outfit", sans-serif;
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

footer {
  padding: 4rem 0;
  text-align: center;
  border-top: 1px solid var(--glass-border);
  color: var(--text-muted);
}

/* Common Components */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem; /* Adjusted padding */
  background: var(--primary);
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  width: auto; /* Default to auto width */
}

.btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}
</style>
