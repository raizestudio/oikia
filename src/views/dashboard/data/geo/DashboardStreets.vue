<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { IStreet } from '@/interfaces/geo/IStreet'

// Stores
import { useStreetsStore } from '@/stores/geo/streets'

const streetsStore = useStreetsStore()

onMounted(() => {
  streetsStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Streets" />
  <TableComponent
    :isLoading="streetsStore.isLoading"
    :data="streetsStore.sortedData"
    :fields="streetsStore.fields"
    :count="streetsStore.count"
    :page="streetsStore.page"
    :size="streetsStore.size"
    :totalPages="streetsStore.totalPages"
    :sortKey="streetsStore.sortKey"
    :sortOrder="streetsStore.sortOrder"
    :countSelected="streetsStore.countSelected"
    :selectionConstructedMessage="streetsStore.selectionConstructedMessage"
    :prevPage="() => streetsStore.prevPage()"
    :nextPage="() => streetsStore.nextPage()"
    :setSize="(size: number) => streetsStore.setSize(size)"
    :setPage="(page: number) => streetsStore.setPage(page)"
    :setSort="(fid) => streetsStore.setSort(fid)"
    :selectItem="(item) => streetsStore.selectItem(item as IStreet)"
    :selectAll="() => streetsStore.selectAll()"
    :toggleSelectAll="() => streetsStore.toggleSelectAll()"
    :isItemSelected="(item) => streetsStore.isSelected(item as IStreet)"
    :filterValue="streetsStore.filterValue"
    :setFilterKey="(key: keyof IStreet) => streetsStore.setFilterKey(key)"
    :setFilterValue="(value: string) => streetsStore.setFilterValue(value)"
    :setFilter="(key: keyof IStreet, value: string) => streetsStore.setFilter(key, value)"
  />
</template>
