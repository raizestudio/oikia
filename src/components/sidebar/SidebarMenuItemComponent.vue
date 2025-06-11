<script setup lang="ts">
import type { Component } from 'vue'
import { useRouter } from 'vue-router'

// Icons
import IconGauge from '@/components/icons/IconGauge.vue'
import IconDatabase from '@/components/icons/IconDatabase.vue'
import IconProfile from '@/components/icons/IconProfile.vue'

// Interfaces
import type { IMenuWithChildren } from '@/interfaces/menu/IMenu'

const router = useRouter()

const props = defineProps<{
  menu: IMenuWithChildren
}>()

const iconsMap: Record<string, Component> = {
  IconGauge,
  IconDatabase,
  IconProfile,
}
</script>

<template>
  <router-link
    :to="props.menu.path"
    :class="`btn hover:bg-base-100 border-0 shadow-none justify-start w-full ${router.currentRoute.value.path === props.menu.path ? 'bg-base-100' : 'bg-transparent'}`"
  >
    <component :is="iconsMap[props.menu.icon]" class="w-5 h-5 fill-base-content" />
    <span class="text-sm font-medium">{{ $capitalize(props.menu.name) }}</span>
  </router-link>
</template>
