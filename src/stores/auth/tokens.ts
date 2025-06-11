import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

// Api
import { fetchTokens } from '@/api/auth/tokens'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'
import { useFiltering } from '@/composables/table/useFiltering'

// Interfaces
import type { IToken } from '@/interfaces/auth/IToken'
import type { ITableField } from '@/interfaces/table/ITable'

export const useTokensStore = defineStore('tokens', () => {
  const isLoading = ref(false)
  const data = ref<IToken[]>([])
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

  const { sortedData, sortKey, sortOrder, setSort, clearSort } = useSorting<IToken>(
    filteredData,
    'token',
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
  } = useSelection<IToken>(data, 'token')

  const fields = ref<ITableField[]>([
    { key: 'token', label: 'Token', type: 'text', isSortable: true, isPrimary: true },
    { key: 'created_at', label: 'Created at', type: 'text', isSortable: true },
    { key: 'user', label: 'User', type: 'text', isSortable: true },
  ])

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  async function load() {
    toggleLoading()
    try {
      const response = await fetchTokens({ page: page.value, size: size.value })
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
