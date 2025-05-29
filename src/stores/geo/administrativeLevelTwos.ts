import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchAdministrativeLevelTwos } from '@/api/geo/administrativeLevelTwos'

// Interfaces
import type { IAdministrativeLevelTwo } from '@/interfaces/geo/IAdministrativeLevelTwo'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'
import { useFiltering } from '@/composables/table/useFiltering'

export const useAdministrativeLevelTwosStore = defineStore('administrativeLevelTwosStore', () => {
  const isLoading = ref(false)
  const data = ref<IAdministrativeLevelTwo[]>([])
  const { page, size, count, totalPages, nextPage, prevPage, setPage, setSize, setCount } =
    usePagination(1, 10)

  const {
    filteredData,
    setFilter,
    clearFilter,
    filterKey,
    filterValue,
    setFilterKey,
    setFilterValue,
  } = useFiltering(data, null, '')

  const { sortedData, sortKey, sortOrder, setSort, clearSort } =
    useSorting<IAdministrativeLevelTwo>(filteredData, 'code', 'asc')

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
  } = useSelection<IAdministrativeLevelTwo>(data, 'code')

  const fields = ref<ITableField[]>([
    { key: 'code', label: 'Code', type: 'text', isSortable: true, isPrimary: true },
    { key: 'name', label: 'Name', type: 'text', isSortable: true },
    {
      key: 'administrative_level_one',
      label: 'Administrative Level One',
      type: 'text',
      isSortable: true,
    },
  ])

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  async function load() {
    toggleLoading()
    try {
      const response = await fetchAdministrativeLevelTwos({ page: page.value, size: size.value })
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

    filteredData,
    setFilterKey,
    setFilterValue,
    setFilter,
    clearFilter,
    filterKey,
    filterValue,
  }
})
