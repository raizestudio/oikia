<script setup lang="ts">
import { RouterView } from 'vue-router'

// Components
import NavbarDashboardComponent from '@/components/navbar/NavbarDashboardComponent.vue'
import FooterDashboardComponent from '@/components/footer/FooterDashboardComponent.vue'
import SidebarComponent from '@/components/sidebar/SidebarComponent.vue'
import GlobalLoadingComponent from '@/components/loading/GlobalLoadingComponent.vue'
import ToastComponent from '@/components/toast/ToastComponent.vue'

// Stores
import { useCoreStore } from '@/stores/core'

const coreStore = useCoreStore()
</script>

<template>
  <div class="flex justify-center">
    <GlobalLoadingComponent v-if="coreStore.isGlobalLoading" />
    <!-- <NavbarComponent /> -->
    <main v-else class="max-w-[2000px] h-screen flex grow">
      <ToastComponent />
      <SidebarComponent />
      <div class="grow w-0">
        <NavbarDashboardComponent />
        <div class="h-[calc(100vh-76px)] flex flex-col gap-6 px-4 py-6 bg-base-300 overflow-y-auto">
          <RouterView />
        </div>
        <FooterDashboardComponent />
      </div>
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
