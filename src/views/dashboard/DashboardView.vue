<script setup lang="ts">
// Components
import CardDashboardSummaryTile from '@/components/card/CardDashboardSummaryTile.vue'
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
</script>

<template>
  <DashboardHeaderComponent title="Overview" />
  <div class="grid grid-cols-4 gap-4">
    <CardDashboardSummaryTile
      label="Revenue"
      icon="IconCurrencyEuro"
      value="2 543€"
      labelBadge="2.5"
      labelFooter="vs. 423€ last period"
    />

    <CardDashboardSummaryTile
      label="Users"
      icon="IconProfile"
      value="120"
      labelBadge="2.5"
      labelFooter="vs. 12 last period"
    />

    <CardDashboardSummaryTile
      label="Intents"
      icon="IconChatCenteredDots"
      value="23 367"
      labelBadge="2.5"
      labelFooter="vs. 14 477 last period"
    />

    <CardDashboardSummaryTile
      label="Alerts"
      icon="IconWarning"
      value="245"
      labelBadge="2.5"
      labelFooter="vs. 310 last period"
    />
  </div>
</template>
