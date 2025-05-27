<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { IAdministrativeLevelOne } from '@/interfaces/geo/IAdministrativeLevelOne'

// Stores
import { useAdministrativeLevelOnesStore } from '@/stores/geo/administrativeLevelOnes'

const administrativeLevelOnesStore = useAdministrativeLevelOnesStore()

onMounted(() => {
  administrativeLevelOnesStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Administrative level ones" />
  <TableComponent
    :isLoading="administrativeLevelOnesStore.isLoading"
    :data="administrativeLevelOnesStore.sortedData"
    :fields="administrativeLevelOnesStore.fields"
    :count="administrativeLevelOnesStore.count"
    :page="administrativeLevelOnesStore.page"
    :size="administrativeLevelOnesStore.size"
    :totalPages="administrativeLevelOnesStore.totalPages"
    :sortKey="administrativeLevelOnesStore.sortKey"
    :sortOrder="administrativeLevelOnesStore.sortOrder"
    :countSelected="administrativeLevelOnesStore.countSelected"
    :selectionConstructedMessage="administrativeLevelOnesStore.selectionConstructedMessage"
    :prevPage="() => administrativeLevelOnesStore.prevPage()"
    :nextPage="() => administrativeLevelOnesStore.nextPage()"
    :setSize="(size: number) => administrativeLevelOnesStore.setSize(size)"
    :setPage="(page: number) => administrativeLevelOnesStore.setPage(page)"
    :setSort="(fid) => administrativeLevelOnesStore.setSort(fid)"
    :selectItem="(item) => administrativeLevelOnesStore.selectItem(item as IAdministrativeLevelOne)"
    :selectAll="() => administrativeLevelOnesStore.selectAll()"
    :toggleSelectAll="() => administrativeLevelOnesStore.toggleSelectAll()"
    :isItemSelected="
      (item) => administrativeLevelOnesStore.isSelected(item as IAdministrativeLevelOne)
    "
  />
</template>
