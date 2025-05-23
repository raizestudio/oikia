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
      <div class="max-w-lg">
        <h1 class="text-5xl font-bold">{{ props.title }}</h1>
        <p class="py-6">
          {{ props.description }}
        </p>
        <label class="input focus-within:outline-0 transition-border duration-300 h-12 w-full">
          <input
            type="text"
            placeholder="Décrivez votre lieu de résidence idéal... (par exemple, « Une banlieue tranquille avec de bonnes écoles et de bons parcs »)"
            class="input input-bordered w-full focus:outline-0 p-0"
          />
          <button class="absolute right-1 btn btn-primary btn-sm z-10">Rechercher</button>
        </label>
      </div>
    </div>
  </div>
</template>
