import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchCountries } from '@/api/geo/countries'

// Interfaces
import type { ICountry } from '@/interfaces/geo/ICountry'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'

export const useCountriesStore = defineStore('countries', () => {
  const data = ref<ICountry[]>([])
  const { page, size, count, totalPages, nextPage, prevPage, setPage, setSize, setCount } =
    usePagination(1, 10)

  const fields = ref<ITableField[]>([
    { key: 'code_iso2', label: 'Code ISO 2', type: 'text', isSortable: true },
    { key: 'code_iso3', label: 'Code ISO 3', type: 'text' },
    { key: 'onu_code', label: 'Code ONU', type: 'text' },
    { key: 'language_official', label: 'Language', type: 'text' },
    { key: 'continent', label: 'Continent', type: 'text' },
    { key: 'currency', label: 'Currency', type: 'text' },
  ])

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
  }
})
