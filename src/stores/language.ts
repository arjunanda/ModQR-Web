import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const lang = ref<'en' | 'id'>('en')

  function toggleLang() {
    lang.value = lang.value === 'en' ? 'id' : 'en'
  }

  function setLang(newLang: 'en' | 'id') {
    lang.value = newLang
  }

  return { lang, toggleLang, setLang }
})
