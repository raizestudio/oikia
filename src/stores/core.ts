import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCoreStore = defineStore('core', () => {
  const isGlobalLoading = ref(true)
  const isLoading = ref(false)


  return {
    isGlobalLoading,
    isLoading,
  }
})