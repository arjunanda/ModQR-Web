<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { generateQR } from "modqr";
import { useLanguageStore } from "../stores/language";

const languageStore = useLanguageStore();
const version = __MODQR_VERSION__;

// State
const qrData = ref("https://github.com/arjunanda/modqr");
const qrStyle = ref("square");
const finderStyle = ref("square");
const fgColor = ref("#6366f1");
const bgColor = ref("#ffffff");
const margin = ref(4);
const logoUrl = ref("");
const logoSize = ref(0.2);
const logoMargin = ref(2);
const enableCustomFinders = ref(false);
const finderTl = ref("square");
const finderTr = ref("square");
const finderBl = ref("square");
const eccLevel = ref("Q");
const currentTab = ref("svg");

// Translations
const translations = {
  en: {
    badge: `v${version} is out now`,
    tagline: "No dependencies. Because npm install already hurts enough.",
    buttons: {
      docs: "Read Documentation",
      github: "GitHub"
    },
    controls: {
      dataUrl: "Data / URL",
      dataPlaceholder: "Enter text or URL",
      moduleStyle: "Module Style",
      finderStyle: "Finder Style (Global)",
      customFinder: "Custom per corner",
      topLeft: "Top-Left Corner",
      topRight: "Top-Right Corner",
      bottomLeft: "Bottom-Left Corner",
      foreground: "Foreground",
      background: "Background",
      margin: "Margin",
      logoUrl: "Logo URL (Optional)",
      logoSize: "Logo Size",
      logoMargin: "Logo Margin",
      ecc: "Error Correction Level",
      download: "Download SVG"
    },
    tabs: {
      svg: "SVG",
      canvas: "Canvas",
      ascii: "ASCII"
    },
    features: {
      zeroDeps: {
        title: "Zero Dependencies",
        desc: "Built from scratch with pure TypeScript. No heavy libraries, just clean code."
      },
      aesthetic: {
        title: "Highly Aesthetic",
        desc: "15+ module styles and 9+ finder styles to match your brand's identity."
      },
      scannable: {
        title: "100% Scannable",
        desc: "Strictly adheres to ISO/IEC 18004 standards while looking beautiful."
      },
      multiOutput: {
        title: "Multi-Output",
        desc: "Render to SVG for web, Canvas for games, or ASCII for your terminal."
      }
    },
    support: {
      title: "Support Development",
      desc: "If you find ModQR useful, consider supporting its development:"
    }
  },
  id: {
    badge: `v${version} sudah rilis`,
    tagline: "Tanpa dependensi. Karena npm install sudah cukup menyakitkan.",
    buttons: {
      docs: "Baca Dokumentasi",
      github: "GitHub"
    },
    controls: {
      dataUrl: "Data / URL",
      dataPlaceholder: "Masukkan teks atau URL",
      moduleStyle: "Gaya Modul",
      finderStyle: "Gaya Pencari (Global)",
      customFinder: "Kustom per sudut",
      topLeft: "Sudut Kiri Atas",
      topRight: "Sudut Kanan Atas",
      bottomLeft: "Sudut Kiri Bawah",
      foreground: "Warna Depan",
      background: "Latar Belakang",
      margin: "Margin",
      logoUrl: "URL Logo (Opsional)",
      logoSize: "Ukuran Logo",
      logoMargin: "Margin Logo",
      ecc: "Tingkat Koreksi Kesalahan",
      download: "Unduh SVG"
    },
    tabs: {
      svg: "SVG",
      canvas: "Canvas",
      ascii: "ASCII"
    },
    features: {
      zeroDeps: {
        title: "Tanpa Dependensi",
        desc: "Dibangun dari awal dengan TypeScript murni. Tanpa pustaka berat, hanya kode bersih."
      },
      aesthetic: {
        title: "Sangat Estetik",
        desc: "15+ gaya modul dan 9+ gaya pencari untuk mencocokkan identitas merek Anda."
      },
      scannable: {
        title: "100% Dapat Dipindai",
        desc: "Mematuhi standar ISO/IEC 18004 dengan ketat sambil tetap terlihat indah."
      },
      multiOutput: {
        title: "Multi-Output",
        desc: "Render ke SVG untuk web, Canvas untuk game, atau ASCII untuk terminal Anda."
      }
    },
    support: {
      title: "Dukung Pengembangan",
      desc: "Jika Anda merasa ModQR bermanfaat, pertimbangkan untuk mendukung pengembangannya:"
    }
  }
};

const t = computed(() => translations[languageStore.lang]);

// Refs for previews
const previewSvg = ref<string>("");
const previewCanvas = ref<HTMLCanvasElement | null>(null);
const previewAscii = ref<string>("");

const updateQR = () => {
  const options: Record<string, any> = {
    size: 300,
    margin: margin.value,
    foreground: fgColor.value,
    background: bgColor.value,
    style: qrStyle.value,
    finderStyle: finderStyle.value,
    ecc: eccLevel.value,
  };

  if (enableCustomFinders.value) {
    options.customFinderStyles = {
      topLeft: finderTl.value,
      topRight: finderTr.value,
      bottomLeft: finderBl.value,
    };
  }

  if (logoUrl.value) {
    options.logo = {
      src: logoUrl.value,
      size: logoSize.value,
      margin: logoMargin.value,
    };
  }

  // Update SVG
  const svgResult = generateQR(qrData.value || "modqr", { ...options, renderer: "svg" });
  previewSvg.value = svgResult.svg ?? "";

  // Update Canvas
  if (previewCanvas.value instanceof HTMLCanvasElement) {
    const result = generateQR(qrData.value || "modqr", { ...options, renderer: "canvas" });
    result.drawCanvas?.(previewCanvas.value);
  }

  // Update ASCII
  const asciiResult = generateQR(qrData.value || "modqr", { ...options, renderer: "ascii" });
  previewAscii.value = asciiResult.ascii ?? "";
};

// Watch for changes
watch(
  [
    qrData,
    qrStyle,
    finderStyle,
    fgColor,
    bgColor,
    margin,
    logoUrl,
    logoSize,
    enableCustomFinders,
    finderTl,
    finderTr,
    finderBl,
    eccLevel,
  ],
  () => {
    updateQR();
  }
);

onMounted(() => {
  updateQR();
  document.title = "ModQR - The Most Aesthetic & Zero-Dependency QR Code Generator";
});

const downloadSvg = () => {
  const blob = new Blob([previewSvg.value], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `modqr-${qrStyle.value}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>

<template>
  <div class="container">
    <div class="lang-toggle-container">
      <button class="lang-btn" @click="languageStore.toggleLang">
        {{ languageStore.lang === 'en' ? '🇮🇩 ID' : '🇺🇸 EN' }}
      </button>
    </div>

    <header>
      <div class="badge">{{ t.badge }}</div>
      <h1>ModQR</h1>
      <p class="tagline">
        {{ t.tagline }}
      </p>
      <div class="hero-actions">
        <RouterLink to="/docs" class="btn btn-outline">{{ t.buttons.docs }}</RouterLink>
        <a href="https://github.com/arjunanda/modqr" target="_blank" class="btn btn-github">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          {{ t.buttons.github }}
        </a>
      </div>
    </header>

    <main class="playground">
      <div class="controls">
        <div class="form-group">
          <label>{{ t.controls.dataUrl }}</label>
          <input type="text" v-model="qrData" :placeholder="t.controls.dataPlaceholder" />
        </div>

        <div class="form-group">
          <label>{{ t.controls.moduleStyle }}</label>
          <select v-model="qrStyle">
            <option value="square">Square (Classic)</option>
            <option value="dots">Dots</option>
            <option value="rounded">Rounded</option>
            <option value="liquid">Liquid</option>
            <option value="blob">Blob</option>
            <option value="wave">Wave</option>
            <option value="pixel">Pixel Art</option>
            <option value="gradient">Gradient</option>
            <option value="neon">Neon Glow</option>
            <option value="glass">Glassmorphism</option>
            <option value="dot-matrix">Dot Matrix</option>
            <option value="diamond">Diamond</option>
            <option value="star">Star</option>
            <option value="glitch">Glitch</option>
            <option value="plus-cross">Plus Cross</option>
            <option value="smooth-connected">Smooth Connected</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ t.controls.ecc }}</label>
          <select v-model="eccLevel">
            <option value="L">L (Low - 7%)</option>
            <option value="M">M (Medium - 15%)</option>
            <option value="Q">Q (Quartile - 25%)</option>
            <option value="H">H (High - 30%)</option>
          </select>
        </div>

        <div class="form-group">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 0.5rem;
            "
          >
            <label style="margin-bottom: 0">{{ t.controls.finderStyle }}</label>
            <label
              style="
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.75rem;
                cursor: pointer;
              "
            >
              <input type="checkbox" v-model="enableCustomFinders" /> {{ t.controls.customFinder }}
            </label>
          </div>
          <select v-model="finderStyle" :disabled="enableCustomFinders">
            <option value="square">Square</option>
            <option value="rounded">Rounded</option>
            <option value="extra-rounded">Extra Rounded</option>
            <option value="dots">Dots</option>
            <option value="rounded-tl">Rounded Top-Left</option>
            <option value="rounded-tr">Rounded Top-Right</option>
            <option value="rounded-bl">Rounded Bottom-Left</option>
            <option value="rounded-br">Rounded Bottom-Right</option>
            <option value="round-tr-cut">Round Top-Right Cut</option>
            <option value="round-br-cut">Round Bottom-Right Cut</option>
            <option value="round-tl-cut">Round Top-Left Cut</option>
            <option value="round-bl-cut">Round Bottom-Left Cut</option>
            <option value="leaf">Leaf</option>
          </select>
        </div>

        <div
          v-if="enableCustomFinders"
          class="custom-finders-container"
          style="
            background: rgba(0, 0, 0, 0.2);
            padding: 1rem;
            border-radius: 1rem;
            margin-bottom: 1.5rem;
            border: 1px dashed var(--glass-border);
          "
        >
          <div class="form-group">
            <label>{{ t.controls.topLeft }}</label>
            <select v-model="finderTl">
              <option value="square">Square</option>
              <option value="rounded">Rounded</option>
              <option value="extra-rounded">Extra Rounded</option>
              <option value="dots">Dots</option>
              <option value="leaf">Leaf</option>
              <option value="round-tr-cut">TR Cut</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ t.controls.topRight }}</label>
            <select v-model="finderTr">
              <option value="square">Square</option>
              <option value="rounded">Rounded</option>
              <option value="extra-rounded">Extra Rounded</option>
              <option value="dots">Dots</option>
              <option value="leaf">Leaf</option>
              <option value="round-tl-cut">TL Cut</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 0">
            <label>{{ t.controls.bottomLeft }}</label>
            <select v-model="finderBl">
              <option value="square">Square</option>
              <option value="rounded">Rounded</option>
              <option value="extra-rounded">Extra Rounded</option>
              <option value="dots">Dots</option>
              <option value="leaf">Leaf</option>
              <option value="round-br-cut">BR Cut</option>
            </select>
          </div>
        </div>

        <div class="color-grid">
          <div class="form-group">
            <label>{{ t.controls.foreground }}</label>
            <input type="color" v-model="fgColor" style="height: 45px; padding: 2px" />
          </div>
          <div class="form-group">
            <label>{{ t.controls.background }}</label>
            <input type="color" v-model="bgColor" style="height: 45px; padding: 2px" />
          </div>
        </div>

        <div class="form-group">
          <label>{{ t.controls.margin }}</label>
          <input type="range" v-model.number="margin" min="0" max="10" style="width: 100%" />
        </div>

        <div
          class="form-group"
          style="border-top: 1px solid var(--glass-border); padding-top: 1.5rem; margin-top: 1.5rem"
        >
          <label>{{ t.controls.logoUrl }}</label>
          <input type="text" v-model="logoUrl" placeholder="https://example.com/logo.png" />
        </div>

        <div class="color-grid">
          <div class="form-group">
            <label>{{ t.controls.logoSize }}</label>
            <input
              type="range"
              v-model.number="logoSize"
              min="0.1"
              max="0.25"
              step="0.05"
              style="width: 100%"
            />
          </div>
        </div>

        <button class="btn" @click="downloadSvg">{{ t.controls.download }}</button>
      </div>

      <div class="preview-container">
        <div class="tabs">
          <div class="tab" :class="{ active: currentTab === 'svg' }" @click="currentTab = 'svg'">
            {{ t.tabs.svg }}
          </div>
          <div
            class="tab"
            :class="{ active: currentTab === 'canvas' }"
            @click="currentTab = 'canvas'"
          >
            {{ t.tabs.canvas }}
          </div>
          <div
            class="tab"
            :class="{ active: currentTab === 'ascii' }"
            @click="currentTab = 'ascii'"
          >
            {{ t.tabs.ascii }}
          </div>
        </div>

        <div v-show="currentTab === 'svg'" class="preview-card">
          <div id="preview-svg" v-html="previewSvg"></div>
        </div>

        <div v-show="currentTab === 'canvas'" class="preview-card">
          <canvas ref="previewCanvas" id="preview-canvas"></canvas>
        </div>

        <div v-show="currentTab === 'ascii'" class="preview-card">
          <div id="preview-ascii">{{ previewAscii }}</div>
        </div>
      </div>
    </main>

    <section class="features">
      <div class="feature-card">
        <h3>{{ t.features.zeroDeps.title }}</h3>
        <p>{{ t.features.zeroDeps.desc }}</p>
      </div>
      <div class="feature-card">
        <h3>{{ t.features.aesthetic.title }}</h3>
        <p>{{ t.features.aesthetic.desc }}</p>
      </div>
      <div class="feature-card">
        <h3>{{ t.features.scannable.title }}</h3>
        <p>{{ t.features.scannable.desc }}</p>
      </div>
      <div class="feature-card">
        <h3>{{ t.features.multiOutput.title }}</h3>
        <p>{{ t.features.multiOutput.desc }}</p>
      </div>
    </section>

    <section class="support-section">
      <h2>{{ t.support.title }}</h2>
      <p>{{ t.support.desc }}</p>
      <div class="support-buttons">
        <a href="https://ko-fi.com/G2G01QOQ38" target="_blank" rel="noopener noreferrer">
          <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="ko-fi" height="36" />
        </a>
        <a href="https://saweria.co/arjunanda09" target="_blank" rel="noopener noreferrer">
          <img src="https://img.shields.io/badge/Support-Saweria-orange?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Saweria" height="36" />
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lang-toggle-container {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;
}

@media (max-width: 640px) {
  .lang-toggle-container {
    top: 1rem;
    right: 1rem;
  }
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

.hero-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  width: auto; /* Fix for button being too wide */
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
}

.btn-github {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--text-muted);
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  width: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-github:hover {
  background: var(--glass);
  color: white;
  border-color: var(--text-muted);
}

/* Hero Section */
header {
  padding: 10rem 0 4rem; /* Increased top padding */
  text-align: center;
  background: radial-gradient(circle at top center, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
}

h1 {
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.05em;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: 1.5rem;
  color: var(--text-muted);
  max-width: 800px;
  margin: 0 auto 3rem;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 2rem;
}

/* Playground */
.playground {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 8rem;
  align-items: start;
}

@media (max-width: 968px) {
  .playground {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }
  h1 {
    font-size: 3.5rem;
  }
  .tagline {
    font-size: 1.2rem;
    padding: 0 1rem;
  }
  .preview-container {
    position: static;
    order: -1; /* Show QR preview above controls on mobile */
  }
}

@media (max-width: 640px) {
  header {
    padding: 6rem 0 3rem;
  }
  h1 {
    font-size: 2.5rem;
  }
  .controls {
    padding: 1.5rem;
    border-radius: 1.5rem;
  }
  .preview-card {
    min-height: auto;
    aspect-ratio: 1 / 1;
    padding: 1.5rem;
    border-radius: 1.5rem;
  }
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  .btn {
    width: 100%;
    justify-content: center;
  }
  .color-grid {
    grid-template-columns: 1fr;
  }
  .tabs {
    overflow-x: auto;
    padding: 0.5rem;
  }
  .tab {
    padding: 0.5rem 1rem;
    min-width: 80px;
  }
}

.controls {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 2rem;
  border: 1px solid var(--glass-border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
}

input[type="text"],
select {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  border-radius: 0.75rem;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.color-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.preview-container {
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 968px) {
  .preview-container {
    position: static;
  }
}

.preview-card {
  background: white;
  padding: 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  position: relative;
  overflow: hidden;
}

#preview-svg,
#preview-canvas {
  max-width: 100%;
  height: auto;
}

#preview-ascii {
  font-family: "JetBrains Mono", monospace;
  font-size: 8px;
  line-height: 1;
  white-space: pre;
  background: #000;
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: auto;
  width: 100%;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  background: var(--glass);
  padding: 0.25rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
}

.tab {
  flex: 1;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s;
  color: var(--text-muted);
}

.tab.active {
  background: var(--primary);
  color: white;
}

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 8rem;
}

.feature-card {
  background: var(--glass);
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid var(--glass-border);
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: var(--primary);
}

/* Support Section */
.support-section {
  text-align: center;
  margin-bottom: 8rem;
  padding: 4rem 2rem;
  background: var(--glass);
  border-radius: 2rem;
  border: 1px solid var(--glass-border);
}

.support-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.support-section p {
  color: var(--text-muted);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.support-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.support-buttons a {
  transition: transform 0.2s;
}

.support-buttons a:hover {
  transform: translateY(-2px);
}
</style>
