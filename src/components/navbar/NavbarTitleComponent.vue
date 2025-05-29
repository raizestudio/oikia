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
    <div
      v-if="env === 'dev' && !isDemo"
      class="tooltip tooltip-bottom"
      data-tip="Development environment"
    >
      <div class="bg-warning rounded p-0.5">
        <IconFlask class="fill-base-100 w-6 h-6" />
      </div>
    </div>
    <div v-else-if="isDemo" class="tooltip tooltip-bottom" data-tip="Demo environment">
      <div class="bg-primary rounded p-0.5">
        <IconEyes class="fill-white w-6 h-6" />
      </div>
    </div>
    <span class="text-2xl font-black font-kneewave select-none">{{ $capitalize(appName) }}</span>
  </router-link>
</template>
