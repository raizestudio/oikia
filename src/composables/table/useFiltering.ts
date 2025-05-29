import { ref, computed, type Ref, type ComputedRef } from 'vue'

export function useFiltering<T extends object>(
  dataRef: Ref<T[]> | ComputedRef<T[]>,
  initialFilterKey: keyof T | null = null,
  initialFilterValue: string | number | null = null,
) {
  const filterKey = ref<keyof T | null>(initialFilterKey)
  const filterValue = ref<string | number | null>(initialFilterValue)

  const filteredData = computed(() => {
    const dataToProcess = dataRef.value

    if (!filterKey.value || filterValue.value === null || filterValue.value === '') {
      return dataToProcess || []
    }

    return (dataToProcess || []).filter((item) => {
      const value = item[filterKey.value as keyof T]
      return String(value).toLowerCase().includes(String(filterValue.value).toLowerCase())
    })
  })

  function setFilterKey(key: keyof T) {
    filterKey.value = key
  }

  function setFilterValue(value: string | number | null) {
    filterValue.value = value
  }

  function setFilter(key: keyof T, value: string | number | null) {
    filterKey.value = key
    filterValue.value = value
  }

  function clearFilter() {
    filterKey.value = null
    filterValue.value = null
  }

  return {
    filteredData,
    filterKey,
    filterValue,
    setFilterKey,
    setFilterValue,
    setFilter,
    clearFilter,
  }
}
