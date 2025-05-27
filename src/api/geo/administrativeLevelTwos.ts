import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core'

// Interfaces
import type { IAdministrativeLevelTwo } from '@/interfaces/geo/IAdministrativeLevelTwo'
import type { IPaginationResponse } from '@/interfaces/IPaginationResponse'

const apiProtocol = import.meta.env.VITE_API_PROTOCOL
const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const apiVersion = import.meta.env.VITE_API_VERSION
const baseUrl = `${apiProtocol}://${apiHost}:${apiPort}/api/${apiVersion}`

export const fetchAdministrativeLevelTwos = async (
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
  }: {
    data: Ref<IPaginationResponse<IAdministrativeLevelTwo> | null>
    error: Ref<unknown | null>
  } = await useFetch<IPaginationResponse<IAdministrativeLevelTwo>>(
    `${baseUrl}/geo/administrative-levels-twos/?${params.toString()}`,
  )
    .get()
    .json()

  if (error.value) {
    console.error('Fetch administrative level twos failed:', error.value)
    return
  }

  console.log('Fetch administrative level twos successful:', data.value)
  return data.value
}
