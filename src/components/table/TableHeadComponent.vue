<script setup lang="ts">
// Icons
import IconTrash from '@/components/icons/IconTrash.vue'
import IconArchive from '@/components/icons/IconArchive.vue'
import IconArrowClockwise from '@/components/icons/IconArrowClockwise.vue'

const props = defineProps<{
  selectionConstructedMessage?: string
  isLoading?: boolean
  hasSelectedItems?: boolean
  //   page: number
  //   count: number
  //   size: number
  //   prevPage: () => void
  //   nextPage: () => void
}>()
</script>

<template>
  <div class="flex justify-between items-center gap-4">
    <div class="flex items-center gap-4">
      <div v-if="props.isLoading" class="w-5 h-5 loading bg-warning"></div>
      <div v-else class="min-w-5 h-5 border-2 border-white rounded-full"></div>
      <label class="input h-8 focus-within:outline-0">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" class="grow" placeholder="Search" />
        <!-- <kbd class="kbd kbd-sm">⌘</kbd>
      <kbd class="kbd kbd-sm">K</kbd> -->
      </label>
    </div>
    <div class="flex items-center gap-4">
      <span>{{ props.selectionConstructedMessage }}</span>
      <div v-if="props.hasSelectedItems" class="flex gap-2">
        <button class="btn btn-sm btn-warning px-2 py-1">
          <IconArchive class="w-5 h-5 text-white" />
        </button>
        <button class="btn btn-sm btn-error px-2 py-1">
          <IconTrash class="w-5 h-5 text-white" />
        </button>
      </div>
      <div>
        <button class="btn btn-sm btn-primary px-2 py-1">
          <IconArrowClockwise class="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
    </div>
</template>
