import { ref, computed, type Ref, type ComputedRef } from 'vue'

export function useSorting<T extends object>(
  dataRef: Ref<T[]> | ComputedRef<T[]>,
  initialSortKey: keyof T | null = null,
  initialSortOrder: 'asc' | 'desc' = 'asc',
) {
  const sortKey = ref<keyof T | null>(initialSortKey)
  const sortOrder = ref<'asc' | 'desc'>(initialSortOrder)

  const sortedData = computed(() => {
    const dataToProcess = dataRef.value

    if (!sortKey.value || !dataToProcess) {
      return dataToProcess || []
    }

    const currentKey = sortKey.value

    return [...dataToProcess].sort((a, b) => {
      const aValue = a[currentKey as keyof T]
      const bValue = b[currentKey as keyof T]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return sortOrder.value === 'asc' ? comparison : -comparison
      } else {
        // Fallback for other types or mixed types
        const stringA = String(aValue)
        const stringB = String(bValue)
        const comparison = stringA.localeCompare(stringB)
        return sortOrder.value === 'asc' ? comparison : -comparison
      }
    })
  })

  function setSort(key: keyof T, order?: 'asc' | 'desc') {
    console.log(typeof order)
    console.log(order)
    console.log(sortKey.value)
    console.log(sortOrder.value)
    if (sortKey.value === key && order === undefined) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = order || 'asc'
    }
  }

  function clearSort() {
    sortKey.value = null
  }

  return {
    sortedData,
    sortKey,
    sortOrder,
    setSort,
    clearSort,
  }
}
