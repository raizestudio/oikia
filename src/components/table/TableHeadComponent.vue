<script setup lang="ts">
// Icons
import IconTrash from '@/components/icons/IconTrash.vue'
import IconArchive from '@/components/icons/IconArchive.vue'
import IconArrowClockwise from '@/components/icons/IconArrowClockwise.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconFileCsv from '@/components/icons/IconFileCsv.vue'
import IconFileXls from '@/components/icons/IconFileXls.vue'
import IconFilePdf from '@/components/icons/IconFilePdf.vue'
import IconFunnel from '@/components/icons/IconFunnel.vue'
// import IconTextbox from '@/components/icons/IconTextbox.vue'

// Interfaces
import type { ITableField } from '@/interfaces/table/ITable'

const props = defineProps<{
  selectionConstructedMessage?: string
  isLoading?: boolean
  hasSelectedItems?: boolean
  fields?: ITableField[]
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
      <div class="flex items-center gap-6">
        <div>
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
        <div class="flex items-center gap-2">
          <IconFunnel class="w-5 h-5 text-base-content/50" />
          <div class="flex items-center gap-2">
            <select class="select select-sm w-min focus:outline-0">
              <option disabled selected>Field</option>
              <option v-for="field in props.fields" :key="field.key">
                {{ field.label }}
              </option>
            </select>
            <select class="select select-sm w-min focus:outline-0">
              <option disabled selected>Option</option>
            </select>
            <!-- <IconTextbox class="w-5 h-5 text-base-content/50" />
            <input type="checkbox" checked="true" class="toggle toggle-sm" /> -->
          </div>
        </div>
      </div>
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
      <div class="flex gap-1">
        <button class="btn btn-sm px-2 py-1">
          <IconArrowClockwise class="w-5 h-5 text-white" />
        </button>

        <button class="btn btn-sm px-2 py-1">
          <IconFileCsv class="w-5 h-5 text-white" />
        </button>
        <button class="btn btn-sm px-2 py-1">
          <IconFileXls class="w-5 h-5 text-white" />
        </button>
        <button class="btn btn-sm px-2 py-1">
          <IconFilePdf class="w-5 h-5 text-white" />
        </button>
        <button class="btn btn-sm btn-primary px-2 py-1">
          <IconPlus class="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  </div>
</template>
