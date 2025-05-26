<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  page: number
  count: number
  size: number
  totalPages: number
  prevPage: () => void
  nextPage: () => void
  setSize: (size: number) => void
}>()

const currentlyDisplaying = computed(() => {
  const from = (props.page - 1) * props.size + 1
  const to = Math.min(props.page * props.size, props.count)
  return `Displaying ${from} - ${to} of ${props.count}`
})
</script>

<template>
  <div class="flex items-center gap-4 w-full">
    <div class="flex gap-1">
      <div class="flex gap-2 p-1 text-nowrap">
        <span>Per page</span>
        <select
          class="select select-xs w-min"
          @change.prevent="
            (e) => {
              if (e.target) props.setSize(Number((e.target as HTMLSelectElement).value))
            }
          "
        >
          <option disabled selected>
            {{ props.size }}
          </option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
    </div>
    <div class="flex justify-center items-center grow">
      <span>{{ currentlyDisplaying }}</span>
    </div>
    <div class="flex gap-2">
      <button class="btn" @click="() => props.prevPage()" :disabled="props.page <= 1">Prev</button>
      <button class="btn" @click="() => props.nextPage()" :disabled="props.page === props.totalPages">Next</button>
    </div>
  </div>
</template>
