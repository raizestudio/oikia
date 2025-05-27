<script setup lang="ts">
const props = defineProps<{
  value: string | number | null
}>()
</script>

<template>
  <div class="flex justify-center">
    <a class="hover:text-primary" :href="`mailto:${props.value}`">{{
      props.value ? props.value : '-'
    }}</a>
  </div>
</template>
