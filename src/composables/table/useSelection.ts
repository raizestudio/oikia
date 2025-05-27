import { ref, computed, type Ref, type ComputedRef } from 'vue'

type SelectablePrimitive = string | number | symbol

export function useSelection<
  T,
  K extends keyof T = keyof T,
  V extends SelectablePrimitive = T[K] & SelectablePrimitive,
>(dataRef: Ref<T[]> | ComputedRef<T[]>, selectKey: K) {
  const selectedIds = ref(new Set<V>()) as Ref<Set<V>>

  const selectItem = (item: T): void => {
    const id = item[selectKey] as V
    if (selectedIds.value.has(id)) {
      selectedIds.value.delete(id)
    } else {
      selectedIds.value.add(id)
    }
  }

  const isSelected = (item: T): boolean => {
    return selectedIds.value.has(item[selectKey] as V)
  }

  const toggleSelection = (item: T): void => {
    const id = item[selectKey] as V
    if (selectedIds.value.has(id)) {
      selectedIds.value.delete(id)
    } else {
      selectedIds.value.add(id)
    }
  }

  const selectAll = (): void => {
    dataRef.value.forEach((item) => selectedIds.value.add(item[selectKey] as V))
  }

  const clearSelection = (): void => {
    selectedIds.value.clear()
  }

  const toggleSelectAll = (): void => {
    if (selectedIds.value.size === dataRef.value.length) {
      clearSelection()
    } else {
      selectAll()
    }
  }

  const selectedItems = computed(() =>
    dataRef.value.filter((item) => selectedIds.value.has(item[selectKey] as V)),
  )

  const countSelected = computed(() => selectedIds.value.size)
  const selectionConstructedMessage = computed(() => {
    if (countSelected.value === 0) {
      return 'No items selected'
    } else if (countSelected.value === 1) {
      return `1 item selected`
    } else {
      return `${countSelected.value} items selected`
    }
  })

  return {
    selectedIds,
    selectItem,
    selectedItems,
    isSelected,
    toggleSelection,
    selectAll,
    clearSelection,
    toggleSelectAll,
    countSelected,
    selectionConstructedMessage,
  }
}
