<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Stores
// import { useCoreStore } from '@/stores/core'
import { useContinentsStore } from '@/stores/geo/continents'

// const coreStore = useCoreStore()
const continentStore = useContinentsStore()

onMounted(() => {
  console.log('TableComponent mounted')
  continentStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Continents" />
  <TableComponent
    :data="continentStore.data"
    :fields="continentStore.fields"
    :count="continentStore.count"
    :page="continentStore.page"
    :size="continentStore.size"
    :total-pages="continentStore.totalPages"
    :prevPage="() => continentStore.prevPage()"
    :nextPage="() => continentStore.nextPage()"
    :setSize="(size: number) => continentStore.setSize(size)"
  />
</template>
