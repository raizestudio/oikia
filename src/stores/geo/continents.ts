import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchContinents } from '@/api/geo/continents'

// Interfaces
import type { IContinent } from '@/interfaces/geo/IContinent'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'

export const useContinentsStore = defineStore('continents', () => {
  const isLoading = ref(false)
  const data = ref<IContinent[]>([])
  const { page, size, count, totalPages, nextPage, prevPage, setPage, setSize, setCount } =
    usePagination(1, 10)

  const { sortedData, sortKey, sortOrder, setSort, clearSort } = useSorting<IContinent>(
    data,
    'code',
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
  } = useSelection<IContinent>(data, 'code')

  const fields = ref<ITableField[]>([
    { key: 'code', label: 'Code', type: 'text', isSortable: true, isPrimary: true },
    { key: 'name', label: 'Name', type: 'text', isSortable: true },
  ])

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  async function load() {
    try {
      const response = await fetchContinents({ page: page.value, size: size.value })
      if (!response) return
      data.value = response.data
      count.value = response.count
    } catch (error) {
      console.error('Failed to fetch continents:', error)
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
    setCount,
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
