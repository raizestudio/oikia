<script setup lang="ts">
// Interfaces
import type { ITableField } from '@/interfaces/table/ITable'

// Stores
import { useCoreStore } from '@/stores/core'

const coreStore = useCoreStore()

const props = defineProps<{
  fields: ITableField[]
  size?: number
}>()
</script>
<template>
  <div class="flex flex-col gap-4 p-4 bg-base-100 rounded">
    <div class="animate-pulse flex flex-col gap-2">
      <div class="h-6 bg-gray-300 rounded w-1/3"></div>
      <div class="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
    <div
      :class="`overflow-x-auto overflow-y-auto max-w-[calc(100vw-${coreStore.isSidebarOpen ? '352px' : ''})] max-h-[calc(100vh-316px)]`"
    >
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th v-for="field in props.fields" :key="field.key" class="w-1/5">
              <div class="animate-pulse h-6 bg-gray-300 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in props.size || 10" :key="i">
            <td v-for="field in fields" :key="field.label + i" class="w-1/5">
              <div class="animate-pulse h-8 bg-gray-200 rounded"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
