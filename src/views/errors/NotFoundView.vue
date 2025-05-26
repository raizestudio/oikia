<script setup lang="ts">
import { useRouter } from 'vue-router'

// Icons
import IconFlyingSaucer from '@/components/icons/IconFlyingSaucer.vue'

const router = useRouter()
</script>
<template>
  <div class="flex flex-col items-center justify-center grow gap-4">
    <IconFlyingSaucer class="w-96 h-96 min-h-56 fill-primary drop-shadow-lg" />
    <div class="flex flex-col items-center gap-2">
      <h1 class="text-4xl font-bold">Content is not here</h1>
      <p class="mt-2 text-gray-600">The aliens stole it!</p>
    </div>
    <div class="flex gap-4 p-4">
      <RouterLink to="" class="mt-4 text-primary" @click="router.back">Go back</RouterLink>
      <RouterLink to="/" class="mt-4">Go Home</RouterLink>
    </div>
  </div>
</template>
