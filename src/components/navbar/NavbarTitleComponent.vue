<script setup lang="ts">
// Icons
import IconFlask from '@/components/icons/IconFlask.vue'
import IconEyes from '@/components/icons/IconEyes.vue'

const appName = import.meta.env.VITE_APP_NAME
const env = import.meta.env.DEV ? 'dev' : 'prod'
const isDemo = import.meta.env.VITE_IS_DEMO === 'true'
</script>

<template>
  <router-link to="/" class="flex items-center gap-2">
    <div v-if="env === 'dev' && !isDemo" class="bg-warning rounded p-0.5">
      <IconFlask class="fill-base-100 w-6 h-6" />
    </div>
    <div v-else-if="isDemo" class="bg-primary rounded p-0.5">
      <IconEyes class="fill-base-content w-6 h-6" />
    </div>
    <span class="text-2xl font-black font-kneewave select-none">{{ $capitalize(appName) }}</span>
  </router-link>
</template>
