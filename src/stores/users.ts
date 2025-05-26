import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Api
import { fetchUsers } from '@/api/users/users'

// Interfaces
import type { IUser } from '@/interfaces/users/IUser'
import type { ITableField } from '@/interfaces/table/ITable'

// Composables
import { usePagination } from '@/composables/usePagination'

export const useUsersStore = defineStore('users', () => {
  const data = ref<IUser[]>([])
  const { page, size, count, totalPages, nextPage, prevPage, setPage, setSize, setCount } =
    usePagination(1, 10)

  const fields = ref<ITableField[]>([
    { key: 'id', label: 'Id', type: 'text' },
    { key: 'avatar', label: 'Avatar', type: 'text' },
    { key: 'username', label: 'Username', type: 'text' },
    { key: 'first_name', label: 'First Name', type: 'text' },
    { key: 'last_name', label: 'Last Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'phone_number', label: 'Phone number', type: 'text' },
    { key: 'created_at', label: 'Created At', type: 'date' },
    { key: 'updated_at', label: 'Updated At', type: 'date' },
    { key: 'is_active', label: 'Is Active', type: 'boolean' },
    { key: 'is_admin', label: 'Is Admin', type: 'boolean' },
    { key: 'is_superuser', label: 'Is Superuser', type: 'boolean' },
  ])

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
