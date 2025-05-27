<script setup lang="ts">
const props = defineProps<{
  value: string | number | null
  isPrimary?: boolean
}>()
</script>

<template>
  <div class="flex justify-center">
    <span v-if="isPrimary" class="text-primary text-nowrap"
      >#{{ props.value ? props.value : '-' }}</span
    >
    <span v-else>{{ props.value ? props.value : '-' }}</span>
  </div>
</template>
