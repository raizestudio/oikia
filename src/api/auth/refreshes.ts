import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core'

// Composables
import { useApiBaseUrl } from '@/composables/useApiBaseUrl'

// Interfaces
import type { IRefresh } from '@/interfaces/auth/IRefresh'
import type { IPaginationResponse } from '@/interfaces/IPaginationResponse'

const baseUrl = useApiBaseUrl()

export const fetchRefreshes = async (
  queryParams: {
    page?: number
    size?: number
    [key: string]: string | number | boolean | undefined
  } = {},
) => {
  const params = new URLSearchParams()

  // Add default or provided parameters
  if (queryParams.page !== undefined) params.set('page', String(queryParams.page))
  if (queryParams.size !== undefined) params.set('size', String(queryParams.size))

  // Add any additional parameters
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined && !['page', 'size'].includes(key)) {
      params.set(key, String(value))
    }
  }

  const {
    data,
    error,
  }: { data: Ref<IPaginationResponse<IRefresh> | null>; error: Ref<unknown | null> } =
    await useFetch<IPaginationResponse<IRefresh>>(`${baseUrl}/auth/refreshes/?${params.toString()}`)
      .get()
      .json()

  if (error.value) {
    console.error('Fetch addresses failed:', error.value)
    return
  }

  console.log('Fetch addresses successful:', data.value)
  return data.value
}
