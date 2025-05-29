import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchUsers } from '@/api/users/users'

// Interfaces
import type { IUser } from '@/interfaces/users/IUser'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/table/useSorting'
import { useSelection } from '@/composables/table/useSelection'
import { useFiltering } from '@/composables/table/useFiltering'

export const useUsersStore = defineStore('users', () => {
  const isLoading = ref(false)
  const data = ref<IUser[]>([])
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

  const { sortedData, sortKey, sortOrder, setSort, clearSort } = useSorting<IUser>(
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
  } = useSelection<IUser>(data, 'id')

  const fields = ref<ITableField[]>([
    { key: 'id', label: 'Id', type: 'text', isSortable: true, isPrimary: true },
    {
      key: 'avatar',
      label: 'User',
      type: 'avatar',
      isSortable: true,
      labelKey: 'username',
      roleKey: 'role',
    },
    // { key: 'username', label: 'Username', type: 'text', isSortable: true },
    { key: 'first_name', label: 'First Name', type: 'text', isSortable: true },
    { key: 'last_name', label: 'Last Name', type: 'text', isSortable: true },
    { key: 'email', label: 'Email', type: 'email', isSortable: true },
    { key: 'full_phone_number', label: 'Phone number', type: 'phone', isSortable: true },
    { key: 'created_at', label: 'Created At', type: 'date', isSortable: true },
    { key: 'updated_at', label: 'Updated At', type: 'date', isSortable: true },
    { key: 'is_active', label: 'Is Active', type: 'boolean', isSortable: true },
    { key: 'is_admin', label: 'Is Admin', type: 'boolean', isSortable: true },
    { key: 'is_superuser', label: 'Is Superuser', type: 'boolean', isSortable: true },
    // { key: 'role', label: 'Role', type: 'text', isSortable: true },
  ])

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  async function load() {
    try {
      const response = await fetchUsers({ page: page.value, size: size.value })
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

    filteredData,
    setFilterKey,
    setFilterValue,
    setFilter,
    clearFilter,
    filterKey,
    filterValue,
  }
})
