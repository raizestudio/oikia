<script setup lang="ts">
const props = defineProps<{
  avatar: string
  label?: string
}>()
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="avatar">
      <div class="w-10 rounded-full">
        <img v-if="props.avatar" :src="props.avatar" />
        <img v-else src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
      </div>
    </div>
    <div>
      <span class="font-semibold">{{ props.label }}</span>
    </div>
  </div>
</template>
