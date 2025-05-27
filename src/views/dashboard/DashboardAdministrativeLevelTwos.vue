<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { IAdministrativeLevelTwo } from '@/interfaces/geo/IAdministrativeLevelTwo'

// Stores
import { useAdministrativeLevelTwosStore } from '@/stores/geo/administrativeLevelTwos'

const administrativeLevelTwosStore = useAdministrativeLevelTwosStore()

onMounted(() => {
  administrativeLevelTwosStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Administrative level ones" />
  <TableComponent
    :isLoading="administrativeLevelTwosStore.isLoading"
    :data="administrativeLevelTwosStore.sortedData"
    :fields="administrativeLevelTwosStore.fields"
    :count="administrativeLevelTwosStore.count"
    :page="administrativeLevelTwosStore.page"
    :size="administrativeLevelTwosStore.size"
    :totalPages="administrativeLevelTwosStore.totalPages"
    :sortKey="administrativeLevelTwosStore.sortKey"
    :sortOrder="administrativeLevelTwosStore.sortOrder"
    :countSelected="administrativeLevelTwosStore.countSelected"
    :selectionConstructedMessage="administrativeLevelTwosStore.selectionConstructedMessage"
    :prevPage="() => administrativeLevelTwosStore.prevPage()"
    :nextPage="() => administrativeLevelTwosStore.nextPage()"
    :setSize="(size: number) => administrativeLevelTwosStore.setSize(size)"
    :setPage="(page: number) => administrativeLevelTwosStore.setPage(page)"
    :setSort="(fid) => administrativeLevelTwosStore.setSort(fid)"
    :selectItem="(item) => administrativeLevelTwosStore.selectItem(item as IAdministrativeLevelTwo)"
    :selectAll="() => administrativeLevelTwosStore.selectAll()"
    :toggleSelectAll="() => administrativeLevelTwosStore.toggleSelectAll()"
    :isItemSelected="
      (item) => administrativeLevelTwosStore.isSelected(item as IAdministrativeLevelTwo)
    "
  />
</template>
