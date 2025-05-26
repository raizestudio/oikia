<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Component } from 'vue'

// Components
import SidebarMenuItemComponent from '@/components/sidebar/SidebarMenuItemComponent.vue'

// Icons
import IconCarret from '@/components/icons/IconCarret.vue'
import IconGauge from '@/components/icons/IconGauge.vue'
import IconDatabase from '@/components/icons/IconDatabase.vue'

// Stores
import { useCoreStore } from '@/stores/core'
// import { useThemeStore } from '@/stores/theme'

const coreStore = useCoreStore()
// const themeStore = useThemeStore()

const currentMenu = ref(-1)
const currentSubMenu = ref(-1)

const iconsMap: Record<string, Component> = {
  IconGauge,
  IconDatabase,
}

onMounted(() => {
  coreStore.setMenus()
})

const toggleMenu = (menuId: number) => {
  currentMenu.value = currentMenu.value === menuId ? -1 : menuId
}

const toggleSubMenu = (subMenuId: number) => {
  currentSubMenu.value = currentSubMenu.value === subMenuId ? -1 : subMenuId
}
</script>

<template>
  <div class="flex flex-col gap-2 grow">
    <template v-for="menu in coreStore.menuTree" :key="menu.id">
      <!-- Dropdown -->
      <div v-if="!menu.path && menu.children.length" class="flex flex-col">
        <div
          class="btn hover:bg-base-100 border-0 shadow-none justify-between w-full !mb-2"
          @click="toggleMenu(menu.id)"
        >
          <!-- FIRST LEVEL DROPDOWN -->
          <div class="flex gap-1">
            <component :is="iconsMap[menu.icon]" class="w-5 h-5 fill-base-content" />
            <span class="text-sm font-medium">{{ $capitalize(menu.name) }}</span>
          </div>
          <IconCarret
            :class="`w-4 h-4 fill-base-content ${currentMenu === menu.id ? 'rotate-90' : ''}`"
          />
        </div>
        <div v-if="currentMenu === menu.id">
          <div v-for="child in menu.children" :key="child.id" class="flex gap-2 pl-6">
            <div class="min-w-[1px] bg-base-content opacity-20"></div>
            <div v-if="child.children.length > 0" class="flex flex-col grow">
              <!-- SECOND LEVEL DROPDOWN -->
              <div
                class="btn btn-sm hover:bg-base-100 border-0 shadow-none justify-between grow"
                @click.prevent="toggleSubMenu(child.id)"
              >
                <span class="text-sm font-medium">{{ $capitalize(child.name) }}</span>
                <IconCarret
                  :class="`w-4 h-4 fill-base-content ${currentSubMenu === child.id ? 'rotate-90' : ''}`"
                />
              </div>
              <div v-if="currentSubMenu === child.id">
                <div v-for="dchild in child.children" :key="dchild.id" class="flex gap-2 pl-4">
                  <div class="min-w-[1px] bg-base-content opacity-15"></div>
                  <!-- THIRD LEVEL STANDALONE BUTTON ( last level ) -->
                  <div class="flex grow p-1">
                    <SidebarMenuItemComponent :menu="dchild" class="btn-sm" />
                  </div>
                </div>
              </div>
            </div>
            <!-- SECOND LEVEL STANDALONE BUTTON -->
            <div v-else class="flex grow py-1">
              <SidebarMenuItemComponent :menu="child" class="btn-sm" />
            </div>
          </div>
        </div>
      </div>
      <!-- FIRST LEVEL STANDALONE BUTTON -->
      <SidebarMenuItemComponent v-else :menu="menu" />
    </template>
  </div>
</template>
