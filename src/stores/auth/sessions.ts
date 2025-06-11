import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

// Api
import { fetchSessions } from '@/api/auth/sessions'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'
import { useFiltering } from '@/composables/table/useFiltering'

// Interfaces
import type { ISession } from '@/interfaces/auth/ISession'
import type { ITableField } from '@/interfaces/table/ITable'

export const useSessionsStore = defineStore('sessions', () => {
  const isLoading = ref(false)
  const data = ref<ISession[]>([])
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

  const { sortedData, sortKey, sortOrder, setSort, clearSort } = useSorting<ISession>(
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
  } = useSelection<ISession>(data, 'id')

  const fields = ref<ITableField[]>([
    { key: 'id', label: 'Id', type: 'text', isSortable: true, isPrimary: true },
    { key: 'ip_v4', label: 'IP v4', type: 'text', isSortable: true },
    { key: 'ip_v6', label: 'IP v6', type: 'text', isSortable: true },
    { key: 'ip_type', label: 'IP Type', type: 'text', isSortable: true },
    { key: 'ip_class', label: 'IP Class', type: 'text', isSortable: true },
    { key: 'isp', label: 'ISP', type: 'text', isSortable: true },
    { key: 'user_agent', label: 'User Agent', type: 'text', isSortable: true },
    { key: 'created_at', label: 'Created at', type: 'text', isSortable: true },
    { key: 'user', label: 'User', type: 'text', isSortable: true },
  ])

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  async function load() {
    toggleLoading()
    try {
      const response = await fetchSessions({ page: page.value, size: size.value })
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
