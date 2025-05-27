<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

// Interfaces
import type { IUser } from '@/interfaces/users/IUser'

// Stores
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()

onMounted(() => {
  console.log('TableComponent mounted')
  document.title = `${import.meta.env.VITE_APP_NAME} | Dashboard users`
  usersStore.load()
})
</script>

<template>
  <DashboardHeaderComponent :title="`Users - ${usersStore.count}`" />
  <!-- <div v-if="coreStore.isLoading" class="flex justify-center items-center">
    <span>Loading</span>
  </div> -->
  <TableComponent
    :isLoading="usersStore.isLoading"
    :data="usersStore.sortedData"
    :fields="usersStore.fields"
    :count="usersStore.count"
    :page="usersStore.page"
    :size="usersStore.size"
    :totalPages="usersStore.totalPages"
    :sortKey="usersStore.sortKey"
    :sortOrder="usersStore.sortOrder"
    :countSelected="usersStore.countSelected"
    :selectionConstructedMessage="usersStore.selectionConstructedMessage"
    :prevPage="() => usersStore.prevPage()"
    :nextPage="() => usersStore.nextPage()"
    :setSize="(size: number) => usersStore.setSize(size)"
    :setPage="(page: number) => usersStore.setPage(page)"
    :setSort="(fid) => usersStore.setSort(fid)"
    :selectItem="(item) => usersStore.selectItem(item as IUser)"
    :selectAll="() => usersStore.selectAll()"
    :toggleSelectAll="() => usersStore.toggleSelectAll()"
    :isItemSelected="(item) => usersStore.isSelected(item as IUser)"
  />
</template>
