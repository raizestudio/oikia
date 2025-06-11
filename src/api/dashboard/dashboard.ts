import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core'

// Composables
import { useApiBaseUrl } from '@/composables/useApiBaseUrl'

// Interfaces
import type { IDashboardOverview } from '@/interfaces/dashboard/IDashboard'

const baseUrl = useApiBaseUrl()

export const fetchDashboardOverview = async () => {
  const { data, error }: { data: Ref<IDashboardOverview | null>; error: Ref<unknown | null> } =
    await useFetch<IDashboardOverview>(`${baseUrl}/dashboard`).get().json()

  if (error.value) {
    console.error('Fetch dashboard overview failed:', error.value)
    return
  }

  console.log('Fetch dashboard overview successful:', data.value)
  return data.value
}
