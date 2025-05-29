<script setup lang="ts">
import { RouterView } from 'vue-router'

// Components
import NavbarComponent from '@/components/navbar/NavbarComponent.vue'
import GlobalLoadingComponent from '@/components/loading/GlobalLoadingComponent.vue'
// import FooterComponent from '@/components/footer/FooterComponent.vue'

// Stores
import { useCoreStore } from '@/stores/core'

const coreStore = useCoreStore()
</script>

<template>
  <GlobalLoadingComponent v-if="coreStore.isGlobalLoading" />
  <div v-else>
    <NavbarComponent />
    <main class="h-[calc(100vh-4rem)]">
      <RouterView />
    </main>
    <!-- <FooterComponent /> -->
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
