<script setup lang="ts">
// Components
import TableHeadComponent from '@/components/table/TableHeadComponent.vue'
import TableFooterComponent from '@/components/table/TableFooterComponent.vue'
import TableTextComponent from '@/components/table/cell/TableTextComponent.vue'
import TableDateComponent from '@/components/table/cell/TableDateComponent.vue'
import TableBoolComponent from '@/components/table/cell/TableBoolComponent.vue'

// Icons
import IconSortAscending from '@/components/icons/IconSortAscending.vue'
import IconSortDescending from '@/components/icons/IconSortDescending.vue'

// Interfaces
import type { ITableField, TableData } from '@/interfaces/table/ITable'

// Stores
// import { useTableStore } from '@/stores/table'

// const tableStore = useTableStore()

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
  prevPage: () => void
  nextPage: () => void
  setSize: (size: number) => void
  setSort: (fid: keyof TableData) => void
}>()
</script>

<template>
  <div class="flex flex-col gap-4 p-4 bg-base-100 rounded">
    <TableHeadComponent
      :page="props.page"
      :count="props.count"
      :size="props.size"
      :prevPage="props.prevPage"
      :nextPage="props.nextPage"
    />
    <div
      class="overflow-x-auto overflow-y-auto max-w-[calc(100vw-352px)] max-h-[calc(100vh-300px)]"
    >
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <th
              v-for="(option, index) in props.fields"
              :key="index"
              class="border border-base-content/5"
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(item, index) in props.data" :key="index">
            <td>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </td>
            <td
              v-for="(field, fieldIndex) in props.fields"
              :key="fieldIndex"
              class="border border-base-content/5"
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
            <td class="flex gap-2">
              <button class="btn btn-sm btn-primary">Edit</button>
              <button class="btn btn-sm btn-secondary">Delete</button>
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
