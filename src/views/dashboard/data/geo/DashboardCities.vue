<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { ICity } from '@/interfaces/geo/ICity'

// Stores
import { useCitiesStore } from '@/stores/geo/cities'

const citiesStore = useCitiesStore()

onMounted(() => {
  citiesStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Cities" />
  <TableComponent
    :isLoading="citiesStore.isLoading"
    :data="citiesStore.sortedData"
    :fields="citiesStore.fields"
    :count="citiesStore.count"
    :page="citiesStore.page"
    :size="citiesStore.size"
    :totalPages="citiesStore.totalPages"
    :sortKey="citiesStore.sortKey"
    :sortOrder="citiesStore.sortOrder"
    :countSelected="citiesStore.countSelected"
    :selectionConstructedMessage="citiesStore.selectionConstructedMessage"
    :prevPage="() => citiesStore.prevPage()"
    :nextPage="() => citiesStore.nextPage()"
    :setSize="(size: number) => citiesStore.setSize(size)"
    :setPage="(page: number) => citiesStore.setPage(page)"
    :setSort="(fid) => citiesStore.setSort(fid)"
    :selectItem="(item) => citiesStore.selectItem(item as ICity)"
    :selectAll="() => citiesStore.selectAll()"
    :toggleSelectAll="() => citiesStore.toggleSelectAll()"
    :isItemSelected="(item) => citiesStore.isSelected(item as ICity)"
    :filterValue="citiesStore.filterValue"
    :setFilterKey="(key: keyof ICity) => citiesStore.setFilterKey(key)"
    :setFilterValue="(value: string) => citiesStore.setFilterValue(value)"
    :setFilter="(key: keyof ICity, value: string) => citiesStore.setFilter(key, value)"
  />
</template>
