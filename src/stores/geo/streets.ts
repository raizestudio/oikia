import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchStreets } from '@/api/geo/streets'

// Interfaces
import type { IStreet } from '@/interfaces/geo/IStreet'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'
import { useFiltering } from '@/composables/table/useFiltering'

export const useStreetsStore = defineStore('streets', () => {
  const isLoading = ref(false)
  const data = ref<IStreet[]>([])
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

  const { sortedData, sortKey, sortOrder, setSort, clearSort } = useSorting<IStreet>(
    filteredData,
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
  } = useSelection<IStreet>(data, 'id')

  const fields = ref<ITableField[]>([
    { key: 'id', label: 'Id', type: 'text', isSortable: true, isPrimary: true },
    { key: 'name', label: 'name', type: 'text', isSortable: true },
    { key: 'street_type', label: 'Street type', type: 'text', isSortable: true },
    { key: 'city', label: 'City', type: 'text', isSortable: true },
  ])

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  async function load() {
    toggleLoading()
    try {
      const response = await fetchStreets({ page: page.value, size: size.value })
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
