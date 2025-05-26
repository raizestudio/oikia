<script setup lang="ts">
// Icons
import IconCheck from '@/components/icons/IconCheck.vue'
import IconX from '@/components/icons/IconX.vue'

const props = defineProps<{
  value: boolean
}>()
</script>

<template>
  <div class="flex justify-center">
    <IconCheck v-if="props.value" class="w-6 h-6 text-green-500" />
    <IconX v-else class="w-6 h-6 text-red-500" />
    <!-- {{ props.value ? 'Yes' : !props.value ? 'No' : 'Unknown' }} -->
  </div>
</template>
