<script setup lang="ts">
// Stores
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="relative flex items-center bg-base-300 pl-8 pr-2.5 py-1 rounded cursor-pointer">
    <div class="avatar absolute -left-3">
      <div class="w-9 rounded-full border-2 border-success">
        <img :src="authStore.user?.avatar" />
      </div>
    </div>
    <span class="font-semibold">{{ authStore.user?.username }}</span>
  </div>
</template>
