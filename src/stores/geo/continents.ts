import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchContinents } from '@/api/geo/continents'

// Interfaces
import type { IContinent } from '@/interfaces/geo/IContinent'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'

export const useContinentsStore = defineStore('continents', () => {
  const data = ref<IContinent[]>([])
  const {
    page,
    size,
    count,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    setSize,
    setCount,
    calculateTotalPages,
  } = usePagination(1, 10)

  const fields = ref<ITableField[]>([
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'code', label: 'Code', type: 'text' },
  ])

  async function load() {
    try {
      const response = await fetchContinents({ page: page.value, size: size.value })
      if (!response) return
      data.value = response.data
      count.value = response.count
      calculateTotalPages()
    } catch (error) {
      console.error('Failed to fetch continents:', error)
    }
  }

  watch([page, size], load)

  return {
    data,
    count,
    page,
    totalPages,
    size,
    fields,
    load,
    setPage,
    setSize,
    nextPage,
    prevPage,
    calculateTotalPages,
  }
})
