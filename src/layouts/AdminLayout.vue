<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="h-screen">
    <ToastComponent />
    <!-- <NavbarComponent /> -->
    <main class="flex grow h-[calc(100vh-64px)]">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>