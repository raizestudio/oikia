<script setup lang="ts">
// Components
import DashboardHeaderComponent from '@/components/dashboard/DashboardHeaderComponent.vue'

// Stores
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <DashboardHeaderComponent v-if="authStore.user" :title="`${authStore.user.username}'s profile`" />
  <div class="flex gap-10">
    <div class="flex flex-col items-center gap-2">
      <img :src="authStore.user?.avatar" alt="User Avatar" class="w-32 h-32 rounded-full mx-auto" />

      <span>{{ authStore.user?.first_name }}</span>
      <span>{{ authStore.user?.last_name }}</span>
      <span>{{ authStore.user?.email }}</span>
      <span>{{ authStore.user?.full_phone_number }}</span>
    </div>
    <div>user usage and stuff i guess</div>
  </div>
</template>
