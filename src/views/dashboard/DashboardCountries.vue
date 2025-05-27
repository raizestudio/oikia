<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { ICountry } from '@/interfaces/geo/ICountry'

// Stores
import { useCountriesStore } from '@/stores/geo/countries'

const countriesStore = useCountriesStore()

onMounted(() => {
  countriesStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Countries" />
  <TableComponent
    :isLoading="countriesStore.isLoading"
    :data="countriesStore.sortedData"
    :fields="countriesStore.fields"
    :count="countriesStore.count"
    :page="countriesStore.page"
    :size="countriesStore.size"
    :totalPages="countriesStore.totalPages"
    :sortKey="countriesStore.sortKey"
    :sortOrder="countriesStore.sortOrder"
    :countSelected="countriesStore.countSelected"
    :selectionConstructedMessage="countriesStore.selectionConstructedMessage"
    :prevPage="() => countriesStore.prevPage()"
    :nextPage="() => countriesStore.nextPage()"
    :setSize="(size: number) => countriesStore.setSize(size)"
    :setPage="(page: number) => countriesStore.setPage(page)"
    :setSort="(fid) => countriesStore.setSort(fid)"
    :selectItem="(item) => countriesStore.selectItem(item as ICountry)"
    :selectAll="() => countriesStore.selectAll()"
    :toggleSelectAll="() => countriesStore.toggleSelectAll()"
    :isItemSelected="(item) => countriesStore.isSelected(item as ICountry)"
  />
</template>
