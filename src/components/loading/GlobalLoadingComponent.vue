<script lang="ts" setup>
const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex h-3 bg-primary">
      <div></div>
    </div>
    <div class="relative flex flex-col justify-center items-center gap-6 grow">
      <h1 class="text-5xl font-black z-10">{{ appName }}</h1>
      <!-- <div id="loading-wrapper" class="absolute h-full w-full bg-base-100"></div> -->
    </div>
  </div>
</template>
