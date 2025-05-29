<script setup lang="ts">
// Icons
import IconPlus from '@/components/icons/IconPlus.vue'
import IconFileCsv from '@/components/icons/IconFileCsv.vue'
import IconFileXls from '@/components/icons/IconFileXls.vue'
import IconFilePdf from '@/components/icons/IconFilePdf.vue'
import IconFunnel from '@/components/icons/IconFunnel.vue'
// import IconTextbox from '@/components/icons/IconTextbox.vue'

// Interfaces
import type { ITableField, TableData } from '@/interfaces/table/ITable'

const props = defineProps<{
  selectionConstructedMessage?: string
  isLoading?: boolean
  hasSelectedItems?: boolean
  fields?: ITableField[]
  filterKey?: string
  filterValue?: string | number | null
  setFilterKey?: (key: keyof TableData) => void
  setFilterValue?: (value: string) => void
  setFilter?: (key: keyof TableData, value: string) => void
}>()
</script>

<template>
  <div class="flex justify-between items-center gap-4">
    <div class="flex items-center gap-4">
      <div v-if="props.isLoading" class="w-5 h-5 loading bg-warning"></div>
      <div v-else class="min-w-5 h-5 border-3 border-base-content/20 rounded-full"></div>
      <div class="flex items-center gap-6">
        <!-- SEARCH -->
        <!-- <div>
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
            <input type="search" class="grow" placeholder="Search" /> -->
        <!-- <kbd class="kbd kbd-sm">⌘</kbd>
          <kbd class="kbd kbd-sm">K</kbd> -->
        <!-- </label>
        </div> -->
        <!-- FILTER -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1">
            <IconFunnel class="w-5 h-5 text-base-content/50" />
            <div class="flex items-center gap-2">
              <select
                class="select select-sm w-min focus:outline-0"
                @change.prevent="
                  (e) => {
                    props.setFilterKey?.((e.target as HTMLSelectElement).value as keyof TableData)
                  }
                "
              >
                <option disabled selected>Field</option>
                <option v-for="field in props.fields" :key="field.key" :value="field.key">
                  {{ field.label }}
                </option>
              </select>
              <!-- <select class="select select-sm w-min focus:outline-0">
              <option disabled selected>Option</option>
            </select> -->
              <!-- <IconTextbox class="w-5 h-5 text-base-content/50" />
            <input type="checkbox" checked="true" class="toggle toggle-sm" /> -->
              <input
                type="text"
                class="input input-sm w-min focus:outline-0"
                placeholder="Value"
                @input.prevent="
                  (e) => {
                    props.setFilterValue?.((e.target as HTMLInputElement).value)
                  }
                "
              />
            </div>
          </div>
          <!-- {{ props.filterKey || 'na' }}
          {{ props.filterValue || 'na' }} -->
          <!-- Search, sort, filter, etc settings -->
          <div class="flex items-center gap-1">
            <span class="text-base-content/60 text-sm font-semibold select-none">DB</span>
            <label class="toggle toggle-xs text-base-content">
              <input type="checkbox" :checked="true" />
              <svg
                aria-label="disabled"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="4"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </g>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- Selected actions -->
    <div class="flex items-center gap-2">
      <span>{{ props.selectionConstructedMessage }}</span>
      <div v-if="props.hasSelectedItems" class="flex gap-2">
        <button class="btn btn-sm bg-warning h-[29px] px-2 py-1 !mt-[1px] border-none">
          <span class="text-white">Archive</span>
        </button>
        <button class="btn btn-sm bg-error h-[29px] px-2 py-1 !mt-[1px] border-none">
          <span class="text-white">Delete</span>
        </button>
      </div>
      <!-- Last actions -->
      <div class="flex h-8 gap-2">
        <div class="flex gap-1">
          <button class="btn btn-sm px-2 py-1 border-none shadow-none">
            <span>Refresh</span>
          </button>
          <!-- todo create actual dropdown component -->
          <details class="dropdown h-8">
            <summary class="btn btn-sm h-8 px-2 py-1 border-none shadow-none">Extract</summary>
            <div
              class="menu dropdown-content gap-2 bg-base-100 rounded-box z-1 w-min p-2 shadow-sm !mt-2"
            >
              <button class="btn btn-sm px-2 py-1">
                <IconFileCsv class="w-5 h-5 text-base-content" />
                <span>CSV</span>
              </button>
              <button class="btn btn-sm px-2 py-1">
                <IconFileXls class="w-5 h-5 text-base-content" />
                <span>Excel</span>
              </button>
              <button class="btn btn-sm px-2 py-1">
                <IconFilePdf class="w-5 h-5 text-base-content" />
                <span>PDF</span>
              </button>
            </div>
          </details>
        </div>

        <div class="flex h-8">
          <button class="btn btn-sm bg-primary h-[29px] px-1.5 py-1 !mt-[1px] border-none">
            <IconPlus class="w-5 h-5 text-white" />
            <span class="text-white">Create</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
