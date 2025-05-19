import { ref } from 'vue'
import { defineStore } from 'pinia'

type Theme = 'auto' | 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('auto')

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
  }

  return {
    theme,
    setTheme,
  }
})