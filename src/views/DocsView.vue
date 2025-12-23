<script setup lang="ts">
const version = "1.0.0";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="container docs-page">
    <header class="docs-header">
      <RouterLink to="/" class="back-link">← Back to Playground</RouterLink>
      <h1>Documentation</h1>
      <p class="tagline">Everything you need to know about using ModQR v{{ version }}</p>
    </header>

    <div class="docs-grid">
      <aside class="docs-sidebar">
        <nav>
          <ul>
            <li><a href="#intro" @click.prevent="scrollToSection('intro')">Introduction</a></li>
            <li><a href="#installation" @click.prevent="scrollToSection('installation')">Installation</a></li>
            <li><a href="#basic-usage" @click.prevent="scrollToSection('basic-usage')">Basic Usage</a></li>
            <li><a href="#styling" @click.prevent="scrollToSection('styling')">Styling Options</a></li>
            <li><a href="#logo-integration" @click.prevent="scrollToSection('logo-integration')">Logo Integration</a></li>
            <li><a href="#troubleshooting" @click.prevent="scrollToSection('troubleshooting')">Troubleshooting</a></li>
          </ul>
        </nav>
      </aside>

      <main class="docs-content">
        <section id="intro">
          <h2>Introduction</h2>
          <p>
            ModQR is built with a simple philosophy: <strong>Zero Dependencies, Maximum Flexibility</strong>.
          </p>
          <p>
            In a world where <code>node_modules</code> is heavier than a black hole, ModQR stands light. 
            Crafted with pure TypeScript and a touch of mathematical magic, it generates QR codes that are not just scannable, but beautiful.
          </p>
          <p>
            No canvas libraries, no heavy image processors, no bloat. Just raw, optimized code that respects your bundle size.
          </p>
        </section>

        <section id="installation">
          <h2>Installation</h2>
          <p>Install the package via npm, yarn, or pnpm:</p>
          <div class="code-block">
            <pre>npm install modqr</pre>
          </div>
        </section>

        <section id="basic-usage">
          <h2>Basic Usage</h2>
          <p>ModQR supports multiple output formats: SVG, Canvas, and ASCII.</p>
          
          <h3>SVG Output (Recommended)</h3>
          <div class="code-block">
            <pre>
import { generateQR } from 'modqr';

const result = generateQR('https://github.com', {
  renderer: 'svg',
  size: 300,
  foreground: '#6366f1'
});

console.log(result.svg); // Returns SVG string</pre>
          </div>

          <h3>Canvas Output</h3>
          <div class="code-block">
            <pre>
const canvas = document.getElementById('my-canvas');
const result = generateQR('Hello World', { renderer: 'canvas' });

// Use optional chaining for safety
result.drawCanvas?.(canvas);</pre>
          </div>
        </section>

        <section id="styling">
          <h2>Styling Options</h2>
          <p>Customize every part of your QR code to match your brand.</p>
          
          <h3>Module Styles</h3>
          <p>Available styles: <code>square</code>, <code>dots</code>, <code>rounded</code>, <code>liquid</code>, <code>blob</code>, <code>wave</code>, <code>pixel</code>, <code>gradient</code>, <code>neon</code>, <code>glass</code>, <code>dot-matrix</code>, <code>diamond</code>, <code>star</code>, <code>glitch</code>, <code>plus-cross</code>, <code>smooth-connected</code>.</p>

          <h3>Finder Styles</h3>
          <p>You can set a global style or customize each corner individually.</p>
          <div class="code-block">
            <pre>
generateQR('data', {
  finderStyle: 'rounded', // Global
  customFinderStyles: {
    topLeft: 'leaf',
    topRight: 'dots',
    bottomLeft: 'square'
  }
});</pre>
          </div>
        </section>

        <section id="logo-integration">
          <h2>Logo Integration</h2>
          <p>Add your brand logo to the center of the QR code.</p>
          <div class="code-block">
            <pre>
generateQR('data', {
  logo: {
    src: 'https://example.com/logo.png',
    size: 0.2,    // 20% of QR size
    margin: 2     // Margin around logo
  }
});</pre>
          </div>
        </section>

        <section id="troubleshooting">
          <h2>Troubleshooting</h2>
          
          <div class="trouble-item">
            <h4>"Cannot invoke an object which is possibly 'undefined'"</h4>
            <p>This happens in TypeScript because <code>drawCanvas</code> is only available when <code>renderer: 'canvas'</code> is used. Since the return type is shared, TypeScript marks it as optional.</p>
            <p><strong>Solution:</strong> Use optional chaining:</p>
            <div class="code-block">
              <pre>result.drawCanvas?.(canvasElement);</pre>
            </div>
          </div>

          <div class="trouble-item">
            <h4>QR Code not scannable</h4>
            <p>This usually happens if the foreground and background colors don't have enough contrast, or if the logo is too large (exceeding error correction capacity).</p>
            <p><strong>Solution:</strong> Keep logo size below 0.25 and ensure high contrast between colors.</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.docs-page {
  padding-top: 8rem; /* Increased to account for fixed nav */
  padding-bottom: 8rem;
}

.docs-header {
  margin-bottom: 4rem;
  text-align: left;
}

.back-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  display: block;
  margin-bottom: 1rem;
}

.docs-grid {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 4rem;
}

@media (max-width: 768px) {
  .docs-grid {
    grid-template-columns: 1fr;
  }
  .docs-sidebar {
    display: none;
  }
}

.docs-sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.docs-sidebar ul {
  list-style: none;
  padding: 0;
}

.docs-sidebar li {
  margin-bottom: 1rem;
}

.docs-sidebar a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;
}

.docs-sidebar a:hover {
  color: var(--primary);
}

.docs-content section {
  margin-bottom: 4rem;
  scroll-margin-top: 2rem;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
}

h3 {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: var(--primary);
}

p {
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.code-block {
  background: #000;
  padding: 1.5rem;
  border-radius: 1rem;
  margin: 1rem 0;
  border: 1px solid var(--glass-border);
  overflow-x: auto;
}

pre {
  font-family: 'JetBrains Mono', monospace;
  color: #10b981;
  font-size: 0.9rem;
  line-height: 1.5;
}

code {
  background: var(--glass);
  padding: 0.2rem 0.4rem;
  border-radius: 0.4rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
  color: var(--accent);
}

.trouble-item {
  background: var(--glass);
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid var(--glass-border);
  margin-bottom: 1.5rem;
}

.trouble-item h4 {
  color: var(--accent);
  margin-bottom: 0.5rem;
}
</style>
