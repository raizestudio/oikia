<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import CardDashboardSummaryTile from '@/components/card/CardDashboardSummaryTile.vue'
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import ChartLineComponent from '@/components/charts/ChartLineComponent.vue'

// Stores
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

onMounted(() => {
  document.title = `${import.meta.env.VITE_APP_NAME} | Dashboard overview`
  dashboardStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Overview" />

  <div class="grid grid-cols-4 gap-4">
    <CardDashboardSummaryTile
      label="Revenue"
      icon="IconCurrencyEuro"
      :value="2543"
      :labelBadge="2.5"
      :labelFooter="1"
    />

    <CardDashboardSummaryTile
      label="Users"
      icon="IconProfile"
      :value="dashboardStore.data.users_last_7_days"
      :labelBadge="dashboardStore.data.users_diff_percentage"
      :labelFooter="dashboardStore.data.users_previous_7_days"
    />

    <CardDashboardSummaryTile
      label="Intents"
      icon="IconChatCenteredDots"
      :value="23367"
      :labelBadge="2.5"
      :labelFooter="1"
    />

    <CardDashboardSummaryTile
      label="Alerts"
      icon="IconWarning"
      :value="245"
      :labelBadge="2.5"
      :labelFooter="1"
    />
  </div>
  <!-- API usage board -->
  <ChartLineComponent />
  <ChartLineComponent />
</template>
