import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchCountries } from '@/api/geo/countries'

// Interfaces
import type { ICountry } from '@/interfaces/geo/ICountry'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'

export const useCountriesStore = defineStore('countries', () => {
  const isLoading = ref(false)
  const data = ref<ICountry[]>([])
  const { page, size, count, totalPages, nextPage, prevPage, setPage, setSize, setCount } =
    usePagination(1, 10)

  const { sortedData, sortKey, sortOrder, setSort, clearSort } = useSorting<ICountry>(
    data,
    'code_iso2',
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
  } = useSelection<ICountry>(data, 'code_iso2')

  const fields = ref<ITableField[]>([
    { key: 'code_iso2', label: 'Code ISO 2', type: 'text', isSortable: true, isPrimary: true },
    { key: 'code_iso3', label: 'Code ISO 3', type: 'text', isSortable: true },
    { key: 'onu_code', label: 'Code ONU', type: 'text', isSortable: true },
    { key: 'language_official', label: 'Language', type: 'text', isSortable: true },
    { key: 'continent', label: 'Continent', type: 'text', isSortable: true },
    { key: 'currency', label: 'Currency', type: 'text', isSortable: true },
  ])

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  async function load() {
    try {
      const response = await fetchCountries({ page: page.value, size: size.value })
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
