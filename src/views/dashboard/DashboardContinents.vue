<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { IContinent } from '@/interfaces/geo/IContinent'

// Stores
// import { useCoreStore } from '@/stores/core'
import { useContinentsStore } from '@/stores/geo/continents'

// const coreStore = useCoreStore()
const continentsStore = useContinentsStore()

onMounted(() => {
  console.log('TableComponent mounted')
  continentsStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Continents" />
  <TableComponent
    :isLoading="continentsStore.isLoading"
    :data="continentsStore.sortedData"
    :fields="continentsStore.fields"
    :count="continentsStore.count"
    :page="continentsStore.page"
    :size="continentsStore.size"
    :totalPages="continentsStore.totalPages"
    :sortKey="continentsStore.sortKey"
    :sortOrder="continentsStore.sortOrder"
    :countSelected="continentsStore.countSelected"
    :selectionConstructedMessage="continentsStore.selectionConstructedMessage"
    :prevPage="() => continentsStore.prevPage()"
    :nextPage="() => continentsStore.nextPage()"
    :setSize="(size: number) => continentsStore.setSize(size)"
    :setPage="(page: number) => continentsStore.setPage(page)"
    :setSort="(fid) => continentsStore.setSort(fid)"
    :selectItem="(item) => continentsStore.selectItem(item as IContinent)"
    :selectAll="() => continentsStore.selectAll()"
    :toggleSelectAll="() => continentsStore.toggleSelectAll()"
    :isItemSelected="(item) => continentsStore.isSelected(item as IContinent)"
  />
</template>
