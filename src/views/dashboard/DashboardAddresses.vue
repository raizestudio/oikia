<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { IAddress } from '@/interfaces/geo/IAddress'

// Stores
import { useAddressesStore } from '@/stores/geo/addresses'

const addressesStore = useAddressesStore()

onMounted(() => {
  addressesStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Cities" />
  <TableComponent
    :isLoading="addressesStore.isLoading"
    :data="addressesStore.sortedData"
    :fields="addressesStore.fields"
    :count="addressesStore.count"
    :page="addressesStore.page"
    :size="addressesStore.size"
    :totalPages="addressesStore.totalPages"
    :sortKey="addressesStore.sortKey"
    :sortOrder="addressesStore.sortOrder"
    :countSelected="addressesStore.countSelected"
    :selectionConstructedMessage="addressesStore.selectionConstructedMessage"
    :prevPage="() => addressesStore.prevPage()"
    :nextPage="() => addressesStore.nextPage()"
    :setSize="(size: number) => addressesStore.setSize(size)"
    :setPage="(page: number) => addressesStore.setPage(page)"
    :setSort="(fid) => addressesStore.setSort(fid)"
    :selectItem="(item) => addressesStore.selectItem(item as IAddress)"
    :selectAll="() => addressesStore.selectAll()"
    :toggleSelectAll="() => addressesStore.toggleSelectAll()"
    :isItemSelected="(item) => addressesStore.isSelected(item as IAddress)"
  />
</template>
