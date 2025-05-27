<script setup lang="ts">
const props = defineProps<{
  value: string | number | null
}>()
</script>

<template>
  <div class="flex justify-center">
    <span>{{ props.value ? props.value : '-' }}</span>
  </div>
</template>
