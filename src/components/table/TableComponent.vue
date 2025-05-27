<script setup lang="ts">
// Components
import TableHeadComponent from '@/components/table/TableHeadComponent.vue'
import TableFooterComponent from '@/components/table/TableFooterComponent.vue'
import TableCellAvatarComponent from '@/components/table/cell/TableCellAvatarComponent.vue'
import TableCellTextComponent from '@/components/table/cell/TableCellTextComponent.vue'
import TableCellDateComponent from '@/components/table/cell/TableCellDateComponent.vue'
import TableCellBoolComponent from '@/components/table/cell/TableCellBoolComponent.vue'
import TableCellEmail from '@/components/table/cell/TableCellEmailComponent.vue'
import TablePhoneComponent from '@/components/table/cell/TableCellPhoneComponent.vue'
import LoadingTableSkeleton from '@/components/loading/LoadingTableSkeleton.vue'

// Icons
import IconSortAscending from '@/components/icons/IconSortAscending.vue'
import IconSortDescending from '@/components/icons/IconSortDescending.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconArchive from '@/components/icons/IconArchive.vue'
import IconFunnel from '@/components/icons/IconFunnel.vue'

// Interfaces
import type { ITableField, TableData } from '@/interfaces/table/ITable'

// Stores
import { useCoreStore } from '@/stores/core'
import { useTableStore } from '@/stores/table'

const coreStore = useCoreStore()
const tableStore = useTableStore()

const componentMap = {
  avatar: TableCellAvatarComponent,
  text: TableCellTextComponent,
  date: TableCellDateComponent,
  boolean: TableCellBoolComponent,
  email: TableCellEmail,
  phone: TablePhoneComponent,
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
  setPage: (page: number) => void
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
      :fields="props.fields"
    />
    <div v-if="data.length === 0" class="text-center text-base-content/50 py-16">
      <p class="text-lg font-semibold">No data available</p>
    </div>

    <div
      :class="`overflow-x-auto overflow-y-auto`"
      :style="{
        maxWidth: `calc(100vw - ${coreStore.isSidebarOpen ? '352px' : '64px'})`,
        maxHeight: 'calc(100vh - 316px)',
      }"
    >
      <table class="table table-zebra table-pin-rows">
        <!-- head -->
        <thead>
          <tr class="bg-base-300">
            <th>
              <label>
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  @change.prevent="props.toggleSelectAll"
                />
              </label>
            </th>
            <th
              v-for="(option, index) in props.fields"
              :key="index"
              class="hover:bg-base-300"
              @mouseenter="tableStore.handleRowHover(index, option.key)"
            >
              <div class="flex justify-between items-center">
                <span class="text-base-content">{{ option.label }}</span>
                <div class="flex items-center gap-0.5">
                  <div
                    v-if="fields[index].isSortable"
                    class="cursor-pointer"
                    @click="() => props.setSort(option.key as keyof TableData)"
                  >
                    <IconSortAscending
                      v-if="props.sortKey === option.key && props.sortOrder === 'desc'"
                      :class="`w-6 h-6 ${sortKey === option.key ? 'text-base-content' : ''}`"
                    />
                    <IconSortDescending
                      v-else
                      :class="`w-6 h-6 ${sortKey === option.key ? 'text-base-content' : ''}`"
                    />
                  </div>
                  <IconFunnel class="w-5 h-5" />
                </div>
              </div>
            </th>
            <th class="">Actions</th>
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
            <td>
              <label>
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  :checked="props.isItemSelected ? props.isItemSelected(item) : false"
                  @change.prevent="props.selectItem ? props.selectItem(item) : null"
                />
              </label>
            </td>
            <td
              v-for="(field, fieldIndex) in props.fields"
              :key="fieldIndex"
              :class="` hover:bg-base-300 ${
                tableStore.hoveredRowKey === field.key ? 'bg-base-300/20' : ''
              }`"
              @mouseenter="tableStore.handleRowHover(index, field.key)"
            >
              <TableCellAvatarComponent
                v-if="field.type === 'avatar'"
                :avatar="item[field.key as keyof typeof item] as string"
                :label="item[field.labelKey as keyof typeof item] as string"
              />
              <component
                :is="componentMap[field.type]"
                :value="item[field.key as keyof typeof item]"
                :isPrimary="field.isPrimary"
                v-else-if="field.type"
              />
              <div v-else>
                {{ item[field.key as keyof typeof item] }}
              </div>
            </td>
            <td class="">
              <div class="flex gap-2 py-1">
                <button class="btn btn-xs btn-ghost">
                  <IconEye class="w-4 h-4" />
                </button>
                <button class="btn btn-xs btn-ghost">
                  <IconPencil class="w-4 h-4" />
                </button>
                <button class="btn btn-xs btn-ghost hover:btn-warning">
                  <IconArchive class="w-4 h-4" />
                </button>
                <button class="btn btn-xs btn-error">
                  <IconTrash class="w-4 h-4 text-white" />
                </button>
              </div>
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
      :isLoading="props.isLoading"
      :prevPage="props.prevPage"
      :nextPage="props.nextPage"
      :setSize="(size: number) => props.setSize(size)"
      :setPage="(page: number) => props.setPage(page)"
    />
  </div>
</template>
