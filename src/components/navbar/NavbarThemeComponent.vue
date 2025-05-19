<script setup lang="ts">
// Components
import DropdownComponent from '@/components/dropdown/DropdownComponent.vue'

// Icons
import IconSun from '@/components/icons/IconSun.vue'
import IconMoon from '@/components/icons/IconMoon.vue'
import IconComputerTower from '@/components/icons/IconComputerTower.vue'

// Stores
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <DropdownComponent>
    <template #trigger>
      <IconComputerTower v-if="themeStore.theme === 'auto'" class="w-5 h-5 fill-base-content" />
      <IconSun v-else-if="themeStore.theme === 'light'" class="w-5 h-5 fill-base-content" />
      <IconMoon v-else="themeStore.theme === 'dark'" class="w-5 h-5 fill-base-content" />
    </template>
    <template #content>
      <ul class="flex flex-col items-center gap-2">
        <li @click="() => themeStore.setTheme('auto')">
          <IconComputerTower class="w-6 h-6 fill-base-content p-0" />
        </li>
        <li @click="() => themeStore.setTheme('light')">
          <IconSun class="w-5 h-5 fill-base-content p-0" />
        </li>
        <li @click="() => themeStore.setTheme('dark')">
          <IconMoon class="w-5 h-5 fill-base-content p-0" />
        </li>
      </ul>
    </template>
  </DropdownComponent>
</template>
