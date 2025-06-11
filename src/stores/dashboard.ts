import { ref } from 'vue'
import { defineStore } from 'pinia'

// Api
import { fetchDashboardOverview } from '@/api/dashboard/dashboard'

// Interfaces
import type { IDashboardOverviewData } from '@/interfaces/dashboard/IDashboard'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    data: {} as IDashboardOverviewData,
  }),

  actions: {
    async load() {
      const data = await fetchDashboardOverview()
      if (data) {
        this.data = data.data
      } else {
        console.error('Failed to fetch dashboard overview data')
      }
    },
  },
})
