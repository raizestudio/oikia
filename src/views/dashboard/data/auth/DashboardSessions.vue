<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { ISession } from '@/interfaces/auth/ISession'

// Stores
import { useSessionsStore } from '@/stores/auth/sessions'

const sessionsStore = useSessionsStore()

onMounted(() => {
  sessionsStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Refreshes" />
  <TableComponent
    :isLoading="sessionsStore.isLoading"
    :data="sessionsStore.sortedData"
    :fields="sessionsStore.fields"
    :count="sessionsStore.count"
    :page="sessionsStore.page"
    :size="sessionsStore.size"
    :totalPages="sessionsStore.totalPages"
    :sortKey="sessionsStore.sortKey"
    :sortOrder="sessionsStore.sortOrder"
    :countSelected="sessionsStore.countSelected"
    :selectionConstructedMessage="sessionsStore.selectionConstructedMessage"
    :prevPage="() => sessionsStore.prevPage()"
    :nextPage="() => sessionsStore.nextPage()"
    :setSize="(size: number) => sessionsStore.setSize(size)"
    :setPage="(page: number) => sessionsStore.setPage(page)"
    :setSort="(fid) => sessionsStore.setSort(fid)"
    :selectItem="(item) => sessionsStore.selectItem(item as ISession)"
    :selectAll="() => sessionsStore.selectAll()"
    :toggleSelectAll="() => sessionsStore.toggleSelectAll()"
    :isItemSelected="(item) => sessionsStore.isSelected(item as ISession)"
    :filterValue="sessionsStore.filterValue"
    :setFilterKey="(key: keyof ISession) => sessionsStore.setFilterKey(key)"
    :setFilterValue="(value: string) => sessionsStore.setFilterValue(value)"
    :setFilter="(key: keyof ISession, value: string) => sessionsStore.setFilter(key, value)"
  />
</template>
