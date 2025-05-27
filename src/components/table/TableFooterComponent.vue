<script setup lang="ts">
import { computed, ref } from 'vue'

// Icons
import IconCarret from '@/components/icons/IconCarret.vue'

const isEditingPage = ref(false)

const props = defineProps<{
  page: number
  count: number
  size: number
  totalPages: number
  isLoading: boolean
  prevPage: () => void
  nextPage: () => void
  setSize: (size: number) => void
  setPage: (page: number) => void
}>()

const currentlyDisplaying = computed(() => {
  const from = (props.page - 1) * props.size + 1
  const to = Math.min(props.page * props.size, props.count)
  return `Displaying ${from} - ${to} of ${props.count}`
})

const toggleIsEditingPage = () => {
  isEditingPage.value = !isEditingPage.value
  if (isEditingPage.value) {
    setTimeout(() => {
      const input = document.querySelector('input[type="text"]') as HTMLInputElement
      input?.focus()
      input?.select()
    }, 0)
  }
}
</script>

<template>
  <div class="flex items-center gap-4 w-full">
    <div class="flex gap-1">
      <div class="flex gap-2 p-1 text-nowrap">
        <span class="text-sm">Page</span>
        <div
          v-if="isEditingPage"
          class="flex items-center border border-base-content/25 rounded px-2 py-0"
        >
          <input
            type="text"
            class="input input-xs focus:outline-0 p-0 w-8 border-none outline-none rounded-none focus:shadow-none text-center size-4"
            :value="props.page"
            @input.prevent="
              (e) => {
                const newPage = Number((e.target as HTMLInputElement).value)
                if (!isNaN(newPage) && newPage > 0 && newPage <= props.totalPages) {
                  props.setPage(newPage)
                }
              }
            "
            @blur="toggleIsEditingPage"
          />
        </div>
        <div
          v-else
          class="flex items-center border border-base-content/25 rounded px-5 py-0"
          @click="toggleIsEditingPage"
        >
          <span class="text-xs">{{ props.page }}</span>
        </div>
      </div>
      <div class="flex gap-2 p-1 text-nowrap">
        <span>Per page</span>
        <select
          class="select select-xs w-min focus:outline-0"
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
      <button
        class="btn border-none shadow-none"
        @click="() => props.prevPage()"
        :disabled="props.page <= 1 || props.isLoading"
      >
        <IconCarret class="w-4 h-4 rotate-180" />
      </button>
      <button
        class="btn border-none shadow-none"
        @click="() => props.nextPage()"
        :disabled="props.page === props.totalPages || props.isLoading"
      >
        <IconCarret class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
