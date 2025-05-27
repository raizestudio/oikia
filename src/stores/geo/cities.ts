import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchCities } from '@/api/geo/cities'

// Interfaces
import type { ICity } from '@/interfaces/geo/ICity'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'

export const useCitiesStore = defineStore('cities', () => {
  const isLoading = ref(false)
  const data = ref<ICity[]>([])
  const { page, size, count, totalPages, nextPage, prevPage, setPage, setSize, setCount } =
    usePagination(1, 10)

  const { sortedData, sortKey, sortOrder, setSort, clearSort } = useSorting<ICity>(
    data,
    'id',
    'asc',
  )

  const {
    selectedIds,
    selectItem,
    selectedItems,
    toggleSelection,
    isSelected,
    selectAll,
    clearSelection,
    toggleSelectAll,
    countSelected,
    selectionConstructedMessage,
  } = useSelection<ICity>(data, 'id')

  const fields = ref<ITableField[]>([
    { key: 'id', label: 'Id', type: 'text', isSortable: true },
    { key: 'name', label: 'name', type: 'text', isSortable: true },
    { key: 'code_postal', label: 'Code postal', type: 'text', isSortable: true },
    { key: 'code_insee', label: 'Code insee', type: 'text', isSortable: true },
    { key: 'administrative_level_one', label: 'Adm level 1', type: 'text', isSortable: true },
    { key: 'administrative_level_two', label: 'Adm level 2', type: 'text', isSortable: true },
  ])

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  async function load() {
    toggleLoading()
    try {
      const response = await fetchCities({ page: page.value, size: size.value })
      if (!response) return
      data.value = response.data
      count.value = response.count
    } catch (error) {
      console.error('Failed to fetch continents:', error)
    } finally {
      toggleLoading()
    }
  }

  watch([page, size], load)

  return {
    isLoading,
    data,
    count,
    page,
    totalPages,
    size,
    fields,
    toggleLoading,
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
    selectedIds,
    selectItem,
    selectedItems,
    toggleSelection,
    isSelected,
    selectAll,
    clearSelection,
    toggleSelectAll,
    countSelected,
    selectionConstructedMessage,
  }
})
