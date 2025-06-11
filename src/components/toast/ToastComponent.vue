<script setup lang="ts">
// Components
import AlertComponent from '@/components/alert/AlertComponent.vue'

// Stores
import { useToastStore } from '@/stores/toast'

const toastsStore = useToastStore()

// toastsStore.addToast({
//   id: Date.now().toString(),
//   message: 'This is a toast message',
//   // isAlert: true,
//   // variant: 'info',
// })
</script>

<template>
  <div class="toast toast-top top-[64px] !z-50">
    <div class="stack stack-bottom">
      <div v-for="toast in toastsStore.toasts" :key="toast.id">
        <AlertComponent
          v-if="toast.isAlert && toast.variant"
          :variant="toast.variant"
          :message="toast.message"
        />
        <div v-else class="bg-base-100 px-4 py-3 rounded">
          <div
            class="radial-progress text-primary w-6 h-6 text-xs"
            :style="{
              '--value': toastsStore.getRemainingTimePercent(toast.id, 5000).value,
              '--thickness': '4px',
            }"
            role="progressbar"
          >
            <!-- {{ Math.round(toastsStore.getRemainingTimePercent(toast.id, 5000).value) }}% -->
          </div>
          {{ toast.message }} {{ toastsStore.getRemainingTime(toast.id) }}
        </div>
      </div>
    </div>
  </div>
</template>
