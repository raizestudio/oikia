import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchAdministrativeLevelOnes } from '@/api/geo/administrativeLevelOnes'

// Interfaces
import type { IAdministrativeLevelOne } from '@/interfaces/geo/IAdministrativeLevelOne'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'

export const useAdministrativeLevelOnesStore = defineStore('administrativeLevelOnesStore', () => {
  const isLoading = ref(false)
  const data = ref<IAdministrativeLevelOne[]>([])
  const { page, size, count, totalPages, nextPage, prevPage, setPage, setSize, setCount } =
    usePagination(1, 10)

  const { sortedData, sortKey, sortOrder, setSort, clearSort } =
    useSorting<IAdministrativeLevelOne>(data, 'code', 'asc')

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
  } = useSelection<IAdministrativeLevelOne>(data, 'code')

  const fields = ref<ITableField[]>([
    { key: 'code', label: 'Code', type: 'text', isSortable: true, isPrimary: true },
    { key: 'name', label: 'Name', type: 'text', isSortable: true },
    { key: 'country', label: 'Country', type: 'text', isSortable: true },
  ])

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  async function load() {
    toggleLoading()
    try {
      const response = await fetchAdministrativeLevelOnes({ page: page.value, size: size.value })
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
