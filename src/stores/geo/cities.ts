import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchCities } from '@/api/geo/cities'

// Interfaces
import type { ICity } from '@/interfaces/geo/ICity'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'

export const useCitiesStore = defineStore('cities', () => {
  const data = ref<ICity[]>([])
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
    { key: 'id', label: 'Id', type: 'text' },
    { key: 'name', label: 'name', type: 'text' },
    { key: 'code_postal', label: 'Code postal', type: 'text' },
    { key: 'code_insee', label: 'Code insee', type: 'text' },
    { key: 'administrative_level_one', label: 'Adm level 1', type: 'text' },
    { key: 'administrative_level_two', label: 'Adm level 2', type: 'text' },
  ])

  async function load() {
    try {
      const response = await fetchCities({ page: page.value, size: size.value })
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
