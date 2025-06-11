<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { IToken } from '@/interfaces/auth/IToken'

// Stores
import { useTokensStore } from '@/stores/auth/tokens'

const tokensStore = useTokensStore()

onMounted(() => {
  tokensStore.load()
})
</script>

<template>
  <DashboardHeaderComponent title="Tokens" />
  <TableComponent
    :isLoading="tokensStore.isLoading"
    :data="tokensStore.sortedData"
    :fields="tokensStore.fields"
    :count="tokensStore.count"
    :page="tokensStore.page"
    :size="tokensStore.size"
    :totalPages="tokensStore.totalPages"
    :sortKey="tokensStore.sortKey"
    :sortOrder="tokensStore.sortOrder"
    :countSelected="tokensStore.countSelected"
    :selectionConstructedMessage="tokensStore.selectionConstructedMessage"
    :prevPage="() => tokensStore.prevPage()"
    :nextPage="() => tokensStore.nextPage()"
    :setSize="(size: number) => tokensStore.setSize(size)"
    :setPage="(page: number) => tokensStore.setPage(page)"
    :setSort="(fid) => tokensStore.setSort(fid)"
    :selectItem="(item) => tokensStore.selectItem(item as IToken)"
    :selectAll="() => tokensStore.selectAll()"
    :toggleSelectAll="() => tokensStore.toggleSelectAll()"
    :isItemSelected="(item) => tokensStore.isSelected(item as IToken)"
    :filterValue="tokensStore.filterValue"
    :setFilterKey="(key: keyof IToken) => tokensStore.setFilterKey(key)"
    :setFilterValue="(value: string) => tokensStore.setFilterValue(value)"
    :setFilter="(key: keyof IToken, value: string) => tokensStore.setFilter(key, value)"
  />
</template>
