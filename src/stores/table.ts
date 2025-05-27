import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTableStore = defineStore('table', () => {
  const isLoading = ref(false)
  const hoveredRowIndex = ref<number | null>(null)
  const hoveredRowKey = ref<string | null>(null)

  const toggleLoading = () => {
    isLoading.value = !isLoading.value
  }

  const handleRowHover = (index: number, key: string) => {
    hoveredRowIndex.value = index
    hoveredRowKey.value = key || null

    console.log(`Row hovered: index=${index}, key=${key}`)
  }
  const handleRowLeave = () => {
    hoveredRowIndex.value = null
    hoveredRowKey.value = null
  }

  return {
    isLoading,
    hoveredRowIndex,
    hoveredRowKey,
    toggleLoading,
    handleRowHover,
    handleRowLeave,
  }
})
