<script setup lang="ts">
const props = defineProps<{
  value: string
}>()
</script>

<template>
  <div class="flex justify-center">
    <span>{{ props.value }}</span>
  </div>
</template>
