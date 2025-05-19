<script setup lang="ts">
import { RouterView } from 'vue-router'

// Components
import NavbarComponent from '@/components/navbar/NavbarComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
</script>

<template>
  <div>
    <NavbarComponent />
    <main>
      <RouterView />
    </main>
    <FooterComponent />
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
