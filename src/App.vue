<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'

// Layouts
import BaseLayout from '@/layouts/BaseLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

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