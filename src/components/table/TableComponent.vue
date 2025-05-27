<script setup lang="ts">
// Components
import TableHeadComponent from '@/components/table/TableHeadComponent.vue'
import TableFooterComponent from '@/components/table/TableFooterComponent.vue'
import TableTextComponent from '@/components/table/cell/TableTextComponent.vue'
import TableDateComponent from '@/components/table/cell/TableDateComponent.vue'
import TableBoolComponent from '@/components/table/cell/TableBoolComponent.vue'
import LoadingTableSkeleton from '@/components/loading/LoadingTableSkeleton.vue'

// Icons
import IconSortAscending from '@/components/icons/IconSortAscending.vue'
import IconSortDescending from '@/components/icons/IconSortDescending.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconArchive from '@/components/icons/IconArchive.vue'

// Interfaces
import type { ITableField, TableData } from '@/interfaces/table/ITable'

// Stores
import { useCoreStore } from '@/stores/core'
import { useTableStore } from '@/stores/table'

const coreStore = useCoreStore()
const tableStore = useTableStore()

const componentMap = {
  text: TableTextComponent,
  date: TableDateComponent,
  boolean: TableBoolComponent,
}

const props = defineProps<{
  data: TableData[]
  fields: ITableField[]
  count: number
  page: number
  size: number
  totalPages: number
  sortKey: string | null
  sortOrder?: 'asc' | 'desc'
  countSelected?: number
  selectionConstructedMessage?: string
  isLoading?: boolean
  prevPage: () => void
  nextPage: () => void
  setSize: (size: number) => void
  setSort: (fid: keyof TableData) => void
  selectItem?: (item: TableData) => void
  selectAll?: () => void
  toggleSelectAll?: () => void
  isItemSelected?: (item: TableData) => boolean
}>()
</script>

<template>
  <LoadingTableSkeleton v-if="tableStore.isLoading" :fields="props.fields" />
  <div v-else class="flex flex-col gap-4 p-4 bg-base-100 rounded">
    <TableHeadComponent
      :selectionConstructedMessage="props.selectionConstructedMessage"
      :isLoading="props.isLoading"
      :has-selected-items="!!props.countSelected"
    />
    <div
      :class="`overflow-x-auto overflow-y-auto max-w-[calc(100vw-${coreStore.isSidebarOpen ? '352px' : ''})] max-h-[calc(100vh-316px)]`"
    >
      <table class="table table-pin-rows border-separate border-spacing-0">
        <!-- head -->
        <thead>
          <tr>
            <th class="border-b border-base-content/10">
              <label>
                <input type="checkbox" class="checkbox" @change.prevent="props.toggleSelectAll" />
              </label>
            </th>
            <th
              v-for="(option, index) in props.fields"
              :key="index"
              class="border border-base-content/10 hover:bg-base-300"
              @mouseenter="tableStore.handleRowHover(index, option.key)"
            >
              <div class="flex justify-between items-center">
                <span>{{ option.label }}</span>
                <div
                  v-if="fields[index].isSortable"
                  class="cursor-pointer"
                  @click="() => props.setSort(option.key as keyof TableData)"
                >
                  <IconSortAscending
                    v-if="props.sortKey === option.key && props.sortOrder === 'desc'"
                    class="w-6 h-6"
                  />
                  <IconSortDescending v-else class="w-6 h-6" />
                </div>
              </div>
            </th>
            <th class="border-b border-base-content/10">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr
            v-for="(item, index) in props.data"
            :key="index"
            class="hover:bg-base-200"
            @mouseleave="tableStore.handleRowLeave"
          >
            <td class="border-b border-base-content/10">
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  :checked="props.isItemSelected ? props.isItemSelected(item) : false"
                  @change.prevent="props.selectItem ? props.selectItem(item) : null"
                />
              </label>
            </td>
            <td
              v-for="(field, fieldIndex) in props.fields"
              :key="fieldIndex"
              :class="`border border-base-content/10 hover:bg-base-300 ${
                tableStore.hoveredRowKey === field.key ? 'bg-base-300/20' : ''
              }`"
              @mouseenter="tableStore.handleRowHover(index, field.key)"
            >
              <component
                :is="componentMap[field.type]"
                :value="item[field.key as keyof typeof item]"
                v-if="field.type"
              />
              <div v-else>
                {{ item[field.key as keyof typeof item] }}
              </div>
            </td>
            <td class="flex gap-2 border-b border-base-content/10">
              <button class="btn btn-sm btn-primary">
                <IconEye class="w-4 h-4" />
              </button>
              <button class="btn btn-sm btn-primary">
                <IconPencil class="w-4 h-4" />
              </button>
              <button class="btn btn-sm btn-warning">
                <IconArchive class="w-4 h-4 text-white" />
              </button>
              <button class="btn btn-sm btn-error">
                <IconTrash class="w-4 h-4 text-white" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TableFooterComponent
      :page="props.page"
      :count="props.count"
      :size="props.size"
      :totalPages="props.totalPages"
      :prevPage="props.prevPage"
      :nextPage="props.nextPage"
      :setSize="(size: number) => props.setSize(size)"
    />
  </div>
</template>
