import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchAddresses } from '@/api/geo/addresses'

// Interfaces
import type { IAddress } from '@/interfaces/geo/IAddress'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'

export const useAddressesStore = defineStore('addresses', () => {
  const isLoading = ref(false)
  const data = ref<IAddress[]>([])
  const { page, size, count, totalPages, nextPage, prevPage, setPage, setSize, setCount } =
    usePagination(1, 10)

  const { sortedData, sortKey, sortOrder, setSort, clearSort } = useSorting<IAddress>(
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
  } = useSelection<IAddress>(data, 'id')

  const fields = ref<ITableField[]>([
    { key: 'id', label: 'Id', type: 'text', isSortable: true, isPrimary: true },
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
      const response = await fetchAddresses({ page: page.value, size: size.value })
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
