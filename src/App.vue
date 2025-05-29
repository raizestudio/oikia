<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'

// Layouts
import BaseLayout from '@/layouts/BaseLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ErrorLayout from '@/layouts/ErrorLayout.vue'

// Stores
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const route = useRoute()

// Theme settings
if (themeStore.theme === 'dark' || themeStore.theme === 'light') {
  document.documentElement.setAttribute('data-theme', themeStore.theme)
}

watch(
  () => themeStore.theme,
  (theme) => {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme')
      return
    }
    document.documentElement.setAttribute('data-theme', theme)
  },
)

// Layout mapping
const layouts = {
  admin: AdminLayout,
  dashboard: DashboardLayout,
  auth: AuthLayout,
  error: ErrorLayout,
}

// Layout component
const LayoutComponent = computed(() => {
  return layouts[route.meta.layout as keyof typeof layouts] || BaseLayout
})
</script>

<template>
  <component :is="LayoutComponent">
    <router-view />
  </component>
</template>
