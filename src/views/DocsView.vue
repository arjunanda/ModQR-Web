<script setup lang="ts">
import { computed } from 'vue';
import { useLanguageStore } from '../stores/language';

const version = __MODQR_VERSION__;
const languageStore = useLanguageStore();

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const translations = {
  en: {
    back: "← Back to Playground",
    title: "Documentation",
    tagline: `Everything you need to know about using ModQR v${version}`,
    nav: {
      intro: "Introduction",
      install: "Installation",
      basic: "Basic Usage",
      styling: "Styling Options",
      logo: "Logo Integration",
      trouble: "Troubleshooting"
    },
    intro: {
      title: "Introduction",
      p1: "ModQR is built with a simple philosophy: <strong>Zero Dependencies, Maximum Flexibility</strong>.",
      p2: "Built with <strong>100% TypeScript</strong> and fully compliant with the <strong>ISO/IEC 18004</strong> standard, ModQR ensures your codes are universally scannable across all devices.",
      p3: "In a world where <code>node_modules</code> is heavier than a black hole, ModQR stands light. Crafted with pure TypeScript and a touch of mathematical magic, it generates QR codes that are not just scannable, but beautiful.",
      p4: "No canvas libraries, no heavy image processors, no bloat. Just raw, optimized code that respects your bundle size."
    },
    install: {
      title: "Installation",
      desc: "Install the package via npm, yarn, or pnpm:",
      cdnTitle: "CDN",
      cdnDesc: "Or use directly in the browser via CDN:"
    },
    basic: {
      title: "Basic Usage",
      tsTitle: "TypeScript Implementation",
      tsDesc: "Leverage full type safety with our exported interfaces.",
      jsTitle: "JavaScript Implementation",
      jsDesc: "Works with both ES Modules and CommonJS.",
      outputTitle: "Handling Outputs",
      svgTitle: "SVG (Default)",
      canvasTitle: "Canvas"
    },
    styling: {
      title: "Styling Options",
      desc: "Customize every part of your QR code to match your brand.",
      moduleTitle: "Module Styles",
      moduleDesc: "Available styles: <code>square</code>, <code>dots</code>, <code>rounded</code>, <code>liquid</code>, <code>blob</code>, <code>wave</code>, <code>pixel</code>, <code>gradient</code>, <code>neon</code>, <code>glass</code>, <code>dot-matrix</code>, <code>diamond</code>, <code>star</code>, <code>glitch</code>, <code>plus-cross</code>, <code>smooth-connected</code>.",
      moduleBasicTitle: "Basic Usage",
      moduleBasicDesc: "Simply set the <code>style</code> property to one of the available presets.",
      moduleAdvTitle: "Advanced Usage",
      moduleAdvDesc: "Combine module styles with custom colors and finder patterns for unique designs.",
      finderTitle: "Finder Styles & Colors",
      finderDesc: "You can set a global style or customize each corner's style and color individually.",
      eccTitle: "Error Correction",
      eccDesc: "Control the resilience of your QR code. Higher levels allow for more damage or larger logos but increase the data density. Note: Higher levels may force a larger QR version that places an Alignment Pattern in the center. If your logo covers the center and the code becomes unscannable, try lowering the level to Q or M to avoid structural conflict.",
      eccLevels: "Levels: <code>L</code> (7%), <code>M</code> (15%), <code>Q</code> (25%), <code>H</code> (30%)."
    },
    logo: {
      title: "Logo Integration",
      desc: "Add your brand logo to the center of the QR code."
    },
    trouble: {
      title: "Troubleshooting",
      t1Title: "\"Cannot invoke an object which is possibly 'undefined'\"",
      t1Desc: "This happens in TypeScript because <code>drawCanvas</code> is only available when <code>renderer: 'canvas'</code> is used. Since the return type is shared, TypeScript marks it as optional.",
      solution: "Solution:",
      t2Title: "QR Code not scannable",
      t2Desc: "This is usually caused by insufficient contrast between colors or a logo that is too large. Also, be aware that high error correction levels (like 'H') often introduce a central Alignment Pattern. If your logo covers this pattern, the QR code becomes unreadable. Lowering the level to 'Q' or 'M' can solve this by removing the central pattern.",
      t2Sol: "Keep logo size below 0.25 and ensure high contrast between colors.",
      bugTitle: "Found a Bug?",
      bugDesc: "If you encounter any issues or have feature requests, please report them on our GitHub repository.",
      issueBtn: "Open an Issue →"
    }
  },
  id: {
    back: "← Kembali ke Playground",
    title: "Dokumentasi",
    tagline: `Segala yang perlu Anda ketahui tentang ModQR v${version}`,
    nav: {
      intro: "Pengenalan",
      install: "Instalasi",
      basic: "Penggunaan Dasar",
      styling: "Opsi Tampilan",
      logo: "Integrasi Logo",
      trouble: "Pemecahan Masalah"
    },
    intro: {
      title: "Pengenalan",
      p1: "ModQR dibangun dengan filosofi sederhana: <strong>Tanpa Dependensi, Fleksibilitas Maksimal</strong>.",
      p2: "Dibangun dengan <strong>100% TypeScript</strong> dan sepenuhnya mematuhi standar <strong>ISO/IEC 18004</strong>, ModQR memastikan kode Anda dapat dipindai secara universal di semua perangkat.",
      p3: "Di dunia di mana <code>node_modules</code> lebih berat daripada lubang hitam, ModQR tetap ringan. Dibuat dengan TypeScript murni dan sentuhan keajaiban matematika, ia menghasilkan kode QR yang tidak hanya dapat dipindai, tetapi juga indah.",
      p4: "Tanpa pustaka canvas, tanpa pemroses gambar berat, tanpa bloat. Hanya kode mentah yang dioptimalkan yang menghargai ukuran bundle Anda."
    },
    install: {
      title: "Instalasi",
      desc: "Instal paket melalui npm, yarn, atau pnpm:",
      cdnTitle: "CDN",
      cdnDesc: "Atau gunakan langsung di browser melalui CDN:"
    },
    basic: {
      title: "Penggunaan Dasar",
      tsTitle: "Implementasi TypeScript",
      tsDesc: "Manfaatkan keamanan tipe penuh dengan antarmuka yang kami ekspor.",
      jsTitle: "Implementasi JavaScript",
      jsDesc: "Bekerja dengan ES Modules dan CommonJS.",
      outputTitle: "Menangani Output",
      svgTitle: "SVG (Default)",
      canvasTitle: "Canvas"
    },
    styling: {
      title: "Opsi Tampilan",
      desc: "Sesuaikan setiap bagian kode QR Anda agar sesuai dengan merek Anda.",
      moduleTitle: "Gaya Modul",
      moduleDesc: "Gaya yang tersedia: <code>square</code>, <code>dots</code>, <code>rounded</code>, <code>liquid</code>, <code>blob</code>, <code>wave</code>, <code>pixel</code>, <code>gradient</code>, <code>neon</code>, <code>glass</code>, <code>dot-matrix</code>, <code>diamond</code>, <code>star</code>, <code>glitch</code>, <code>plus-cross</code>, <code>smooth-connected</code>.",
      moduleBasicTitle: "Penggunaan Dasar",
      moduleBasicDesc: "Cukup atur properti <code>style</code> ke salah satu preset yang tersedia.",
      moduleAdvTitle: "Penggunaan Lanjutan",
      moduleAdvDesc: "Gabungkan gaya modul dengan warna kustom dan pola pencari untuk desain yang unik.",
      finderTitle: "Gaya & Warna Pencari",
      finderDesc: "Anda dapat mengatur gaya global atau menyesuaikan gaya dan warna setiap sudut secara individual.",
      eccTitle: "Koreksi Kesalahan (Error Correction)",
      eccDesc: "Kontrol ketahanan kode QR Anda. Tingkat yang lebih tinggi memungkinkan lebih banyak kerusakan atau logo yang lebih besar tetapi meningkatkan kepadatan data. Catatan: Tingkat yang lebih tinggi dapat memaksa versi QR yang lebih besar yang menempatkan Pola Penyelarasan di tengah. Jika logo Anda menutupi bagian tengah dan kode menjadi tidak dapat dipindai, coba turunkan tingkat ke Q atau M untuk menghindari konflik struktural.",
      eccLevels: "Tingkat: <code>L</code> (7%), <code>M</code> (15%), <code>Q</code> (25%), <code>H</code> (30%)."
    },
    logo: {
      title: "Integrasi Logo",
      desc: "Tambahkan logo merek Anda ke tengah kode QR."
    },
    trouble: {
      title: "Pemecahan Masalah",
      t1Title: "\"Cannot invoke an object which is possibly 'undefined'\"",
      t1Desc: "Ini terjadi di TypeScript karena <code>drawCanvas</code> hanya tersedia saat <code>renderer: 'canvas'</code> digunakan. Karena tipe kembalian dibagi, TypeScript menandainya sebagai opsional.",
      solution: "Solusi:",
      t2Title: "Kode QR tidak dapat dipindai",
      t2Desc: "Masalah ini biasanya disebabkan oleh kontras warna yang kurang atau ukuran logo yang terlalu besar. Perlu diperhatikan bahwa tingkat koreksi kesalahan tinggi (seperti 'H') sering kali memunculkan Pola Penyelarasan di tengah. Jika logo Anda menutupi pola ini, QR code tidak akan terbaca. Menurunkan level ke 'Q' atau 'M' dapat mengatasi masalah ini dengan menghilangkan pola tersebut.",
      t2Sol: "Jaga ukuran logo di bawah 0.25 dan pastikan kontras tinggi antar warna.",
      bugTitle: "Menemukan Bug?",
      bugDesc: "Jika Anda menemukan masalah atau memiliki permintaan fitur, silakan laporkan di repositori GitHub kami.",
      issueBtn: "Buka Isu →"
    }
  }
};

const t = computed(() => translations[languageStore.lang]);
</script>

<template>
  <div class="container docs-page">
    <header class="docs-header">
      <div class="header-top">
        <RouterLink to="/" class="back-link">{{ t.back }}</RouterLink>
        <button class="lang-btn" @click="languageStore.toggleLang">
          {{ languageStore.lang === 'en' ? '🇮🇩 ID' : '🇺🇸 EN' }}
        </button>
      </div>
      <h1>{{ t.title }}</h1>
      <p class="tagline" v-html="t.tagline"></p>
    </header>

    <div class="docs-grid">
      <aside class="docs-sidebar">
        <nav>
          <ul>
            <li><a href="#intro" @click.prevent="scrollToSection('intro')">{{ t.nav.intro }}</a></li>
            <li><a href="#installation" @click.prevent="scrollToSection('installation')">{{ t.nav.install }}</a></li>
            <li><a href="#basic-usage" @click.prevent="scrollToSection('basic-usage')">{{ t.nav.basic }}</a></li>
            <li><a href="#styling" @click.prevent="scrollToSection('styling')">{{ t.nav.styling }}</a></li>
            <li><a href="#logo-integration" @click.prevent="scrollToSection('logo-integration')">{{ t.nav.logo }}</a></li>
            <li><a href="#troubleshooting" @click.prevent="scrollToSection('troubleshooting')">{{ t.nav.trouble }}</a></li>
          </ul>
        </nav>
      </aside>

      <main class="docs-content">
        <section id="intro">
          <h2>{{ t.intro.title }}</h2>
          <p v-html="t.intro.p1"></p>
          <p v-html="t.intro.p2"></p>
          <p v-html="t.intro.p3"></p>
          <p v-html="t.intro.p4"></p>
        </section>

        <section id="installation">
          <h2>{{ t.install.title }}</h2>
          <p>{{ t.install.desc }}</p>
          <div class="code-block">
            <pre>npm install modqr</pre>
          </div>

          <h3>{{ t.install.cdnTitle }}</h3>
          <p>{{ t.install.cdnDesc }}</p>
          <div class="code-block">
            <pre>&lt;script src="https://cdn.jsdelivr.net/npm/modqr@1.0.3/dist/modqr.min.js"&gt;&lt;/script&gt;</pre>
          </div>
        </section>

        <section id="basic-usage">
          <h2>{{ t.basic.title }}</h2>
          
          <h3>{{ t.basic.tsTitle }}</h3>
          <p>{{ t.basic.tsDesc }}</p>
          <div class="code-block">
            <pre>
import { generateQR, type ModQROptions } from 'modqr';

const options: ModQROptions = {
  renderer: 'svg',
  size: 300,
  foreground: '#6366f1'
};

const result = generateQR('https://modqr.com', options);</pre>
          </div>

          <h3>{{ t.basic.jsTitle }}</h3>
          <p>{{ t.basic.jsDesc }}</p>
          <div class="code-block">
            <pre>
// ES Modules
import { generateQR } from 'modqr';

// CommonJS
const { generateQR } = require('modqr');

const result = generateQR('https://modqr.com', {
  renderer: 'svg',
  size: 300
});</pre>
          </div>

          <h3>{{ t.basic.outputTitle }}</h3>
          
          <h4>{{ t.basic.svgTitle }}</h4>
          <div class="code-block">
            <pre>
const result = generateQR('data', { renderer: 'svg' });
document.body.innerHTML = result.svg;</pre>
          </div>

          <h4>{{ t.basic.canvasTitle }}</h4>
          <div class="code-block">
            <pre>
const result = generateQR('data', { renderer: 'canvas' });
const canvas = document.querySelector('canvas');

// Use optional chaining for safety
result.drawCanvas?.(canvas);</pre>
          </div>
        </section>

        <section id="styling">
          <h2>{{ t.styling.title }}</h2>
          <p>{{ t.styling.desc }}</p>
          
          <h3>{{ t.styling.moduleTitle }}</h3>
          <p v-html="t.styling.moduleDesc"></p>

          <h4>{{ t.styling.moduleBasicTitle }}</h4>
          <p v-html="t.styling.moduleBasicDesc"></p>
          <div class="code-block">
            <pre>
const options = {
  style: 'dots', // Simple preset
  foreground: '#000000'
};</pre>
          </div>

          <h4>{{ t.styling.moduleAdvTitle }}</h4>
          <p v-html="t.styling.moduleAdvDesc"></p>
          <div class="code-block">
            <pre>
// Cyberpunk Theme
const options = {
  style: 'glitch',
  foreground: '#00ff00',
  background: '#111111',
  finderStyle: 'square',
  finderColor: '#ff00ff'
};</pre>
          </div>

          <h3>{{ t.styling.eccTitle }}</h3>
          <p>{{ t.styling.eccDesc }}</p>
          <p v-html="t.styling.eccLevels"></p>
          <div class="code-block">
            <pre>
generateQR('https://modqr.com', {
  ecc: 'H', // High error correction (30%)
  logo: {
    src: 'logo.png',
    size: 0.25 // Larger logo needs higher ECC
  }
});</pre>
          </div>

          <h3>{{ t.styling.finderTitle }}</h3>
          <p>{{ t.styling.finderDesc }}</p>
          <div class="code-block">
            <pre>
generateQR('data', {
  finderStyle: 'rounded',
  finderColor: "#ff0000",

  // Or per-corner color
  customFinderStyles: {
    topLeft: { style: "rounded", color: "#ff0000" },
    topRight: { style: "dots", color: "#00ff00" },
    bottomLeft: "leaf", // Inherits finderColor or foreground
  }
});</pre>
          </div>
        </section>

        <section id="logo-integration">
          <h2>{{ t.logo.title }}</h2>
          <p>{{ t.logo.desc }}</p>
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
          <h2>{{ t.trouble.title }}</h2>
          
          <div class="trouble-item">
            <h4 v-html="t.trouble.t1Title"></h4>
            <p v-html="t.trouble.t1Desc"></p>
            <p><strong>{{ t.trouble.solution }}</strong> Use optional chaining:</p>
            <div class="code-block">
              <pre>result.drawCanvas?.(canvasElement);</pre>
            </div>
          </div>

          <div class="trouble-item">
            <h4>{{ t.trouble.t2Title }}</h4>
            <p>{{ t.trouble.t2Desc }}</p>
            <p><strong>{{ t.trouble.solution }}</strong> {{ t.trouble.t2Sol }}</p>
          </div>

          <div class="trouble-item">
            <h4>{{ t.trouble.bugTitle }}</h4>
            <p>{{ t.trouble.bugDesc }}</p>
            <p>
              <a href="https://github.com/arjunanda/modqr/issues" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: bold;">
                {{ t.trouble.issueBtn }}
              </a>
            </p>
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

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.back-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  display: block;
}

.lang-btn {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  color: var(--text);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  transition: all 0.2s;
}

.lang-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
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

h4 {
  font-size: 1.2rem;
  margin: 1.5rem 0 0.5rem;
  color: var(--text);
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
