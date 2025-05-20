<script setup lang="ts">

const props = defineProps({
  image: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="avatar">
    <div class="w-16 rounded-full">
      <img :src="props.image" />
    </div>
  </div>
</template>
