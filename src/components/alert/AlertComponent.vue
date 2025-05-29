<script setup lang="ts">
// Icons
import IconInfo from '@/components/icons/IconInfo.vue'

// Interfaces
import type { ToastVariant } from '@/interfaces/toast/IToast'

const props = defineProps<{
  variant: ToastVariant
  message: string
}>()

const classMap = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
}

const iconsMap = {
  info: IconInfo,
  success: IconInfo,
  warning: IconInfo,
  error: IconInfo,
}
</script>

<template>
  <div :class="`alert ${classMap[props.variant || 'info']}`">
    <div class="flex items-center gap-2">
      <component :is="iconsMap[props.variant || 'info']" class="w-6 h-6 mr-2" />
      <span>{{ props.message }}</span>
    </div>
  </div>
</template>
