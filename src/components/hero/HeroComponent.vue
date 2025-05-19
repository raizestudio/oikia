<script setup lang="ts">

// Props
const props = defineProps({
  title: String,
  description: String,
})
</script>
<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{{ props.title }}</h1>
        <p class="py-6">
          {{ props.description }}
        </p>
        <input
          type="text"
          placeholder="Décrivez votre lieu idéal"
          class="input input-bordered w-full max-w-xs text-center focus:outline-0 transition-border duration-300"
        />
      </div>
    </div>
  </div>
</template>
