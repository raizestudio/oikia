<script setup lang="ts">
import { onMounted } from 'vue'

// Components
// import SupportComponent from '@/components/support/SupportComponent.vue'
// import TicketBugComponent from '@/components/support/TicketBugComponent.vue'
import SidebarMenuComponent from '@/components/sidebar/SidebarMenuComponent.vue'

// Icons
// import IconSupport from '@/components/icons/IconSupport.vue'
// import IconBug from '@/components/icons/IconBug.vue'
import IconComputerTower from '@/components/icons/IconComputerTower.vue'
import IconSun from '@/components/icons/IconSun.vue'
import IconMoon from '@/components/icons/IconMoon.vue'
import IconX from '@/components/icons/IconX.vue'

// Stores
import { useCoreStore } from '@/stores/core'
// import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const coreStore = useCoreStore()
// const authStore = useAuthStore()
const themeStore = useThemeStore()

// coreStore.fetchApiInfo()
// coreStore.setMenus()

const appName = import.meta.env.VITE_APP_NAME

onMounted(() => {
  coreStore.checkSidebarLocalStorage()
})
</script>

<template>
  <div
    v-if="coreStore.isSidebarOpen"
    class="flex flex-col gap-4 px-2 py-4 min-w-72 max-w-72 bg-base-200 border-r border-base-300"
  >
    <div>
      <div
        v-if="coreStore.isSidebarOpen"
        class="flex justify-end cursor-pointer"
        @click="coreStore.toggleSidebar"
      >
        <IconX class="w-6 h-6" />
      </div>
    </div>
    <div class="flex justify-center mb-2">
      <h2 class="text-4xl font-black">{{ appName }}</h2>
    </div>

    <SidebarMenuComponent />
    <div class="flex flex-col gap-2">
      <button class="btn btn-xs bg-base-100">Documentation</button>
      <button class="btn btn-xs bg-base-100">FAQ</button>
      <button class="btn btn-xs bg-base-100">Whitepaper</button>
    </div>

    <div class="flex justify-center items-center gap-2">
      <div
        @click="() => themeStore.setTheme('auto')"
        class="btn btn-sm"
        :class="themeStore.theme === 'auto' ? 'btn btn-sm' : 'btn btn-ghost'"
      >
        <IconComputerTower class="w-5 h-5 fill-base-content" />
      </div>
      <div
        @click="() => themeStore.setTheme('light')"
        :class="themeStore.theme === 'light' ? 'btn btn-sm' : 'btn btn-ghost btn-sm'"
      >
        <IconSun class="w-5 h-5 fill-base-content" />
      </div>
      <div
        @click="() => themeStore.setTheme('dark')"
        :class="themeStore.theme === 'dark' ? 'btn btn-sm' : 'btn btn-ghost btn-sm'"
      >
        <IconMoon class="w-5 h-5 fill-base-content" />
      </div>
    </div>
    <!-- <TicketBugComponent /> -->
    <!-- <SupportComponent /> -->
  </div>
</template>
