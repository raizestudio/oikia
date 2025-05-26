<script setup lang="ts">
import { RouterView } from 'vue-router'

// Components
import NavbarComponent from '@/components/navbar/NavbarComponent.vue'
// import SidebarComponent from '@/components/sidebar/SidebarComponent.vue'
</script>

<template>
  <div>
    <NavbarComponent />
    <main class="h-[calc(100vh-64px)] flex">
      <!-- <SidebarComponent /> -->
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
