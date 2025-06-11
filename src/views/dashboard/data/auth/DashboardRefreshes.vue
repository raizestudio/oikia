<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { IRefresh } from '@/interfaces/auth/IRefresh'

// Stores
import { useRefreshesStore } from '@/stores/auth/refreshes'

const refreshesStore = useRefreshesStore()

onMounted(() => {
  refreshesStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Refreshes" />
  <TableComponent
    :isLoading="refreshesStore.isLoading"
    :data="refreshesStore.sortedData"
    :fields="refreshesStore.fields"
    :count="refreshesStore.count"
    :page="refreshesStore.page"
    :size="refreshesStore.size"
    :totalPages="refreshesStore.totalPages"
    :sortKey="refreshesStore.sortKey"
    :sortOrder="refreshesStore.sortOrder"
    :countSelected="refreshesStore.countSelected"
    :selectionConstructedMessage="refreshesStore.selectionConstructedMessage"
    :prevPage="() => refreshesStore.prevPage()"
    :nextPage="() => refreshesStore.nextPage()"
    :setSize="(size: number) => refreshesStore.setSize(size)"
    :setPage="(page: number) => refreshesStore.setPage(page)"
    :setSort="(fid) => refreshesStore.setSort(fid)"
    :selectItem="(item) => refreshesStore.selectItem(item as IRefresh)"
    :selectAll="() => refreshesStore.selectAll()"
    :toggleSelectAll="() => refreshesStore.toggleSelectAll()"
    :isItemSelected="(item) => refreshesStore.isSelected(item as IRefresh)"
    :filterValue="refreshesStore.filterValue"
    :setFilterKey="(key: keyof IRefresh) => refreshesStore.setFilterKey(key)"
    :setFilterValue="(value: string) => refreshesStore.setFilterValue(value)"
    :setFilter="(key: keyof IRefresh, value: string) => refreshesStore.setFilter(key, value)"
  />
</template>
