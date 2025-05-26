<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'

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
    :data="usersStore.data"
    :fields="usersStore.fields"
    :count="usersStore.count"
    :page="usersStore.page"
    :size="usersStore.size"
    :total-pages="usersStore.totalPages"
    :prevPage="() => usersStore.prevPage()"
    :nextPage="() => usersStore.nextPage()"
    :setSize="(size: number) => usersStore.setSize(size)"
  />
</template>
