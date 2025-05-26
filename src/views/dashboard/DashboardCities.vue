<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Stores
import { useCitiesStore } from '@/stores/geo/cities'

const citiesStore = useCitiesStore()

onMounted(() => {
  citiesStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Countries" />
  <TableComponent
    :data="citiesStore.data"
    :fields="citiesStore.fields"
    :count="citiesStore.count"
    :page="citiesStore.page"
    :size="citiesStore.size"
    :total-pages="citiesStore.totalPages"
    :prevPage="() => citiesStore.prevPage()"
    :nextPage="() => citiesStore.nextPage()"
    :setSize="(size: number) => citiesStore.setSize(size)"
  />
</template>
