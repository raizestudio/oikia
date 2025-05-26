import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchCities } from '@/api/geo/cities'

// Interfaces
import type { ICity } from '@/interfaces/geo/ICity'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/useSorting'

export const useCitiesStore = defineStore('cities', () => {
  const data = ref<ICity[]>([])
  const { page, size, count, totalPages, nextPage, prevPage, setPage, setSize, setCount } =
    usePagination(1, 10)

  const { sortedData, sortKey, sortOrder, setSort, clearSort } = useSorting<ICity>(
    data,
    'id',
    'asc',
  )

  const fields = ref<ITableField[]>([
    { key: 'id', label: 'Id', type: 'text', isSortable: true },
    { key: 'name', label: 'name', type: 'text', isSortable: true },
    { key: 'code_postal', label: 'Code postal', type: 'text', isSortable: true },
    { key: 'code_insee', label: 'Code insee', type: 'text', isSortable: true },
    { key: 'administrative_level_one', label: 'Adm level 1', type: 'text', isSortable: true },
    { key: 'administrative_level_two', label: 'Adm level 2', type: 'text', isSortable: true },
  ])

  async function load() {
    try {
      const response = await fetchCities({ page: page.value, size: size.value })
      if (!response) return
      data.value = response.data
      count.value = response.count
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
    sortedData,
    sortKey,
    sortOrder,
    setSort,
    clearSort,
  }
})
