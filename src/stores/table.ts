import { ref } from 'vue'
import { defineStore } from 'pinia'

// Interfaces
import type { ITableField, TableData } from '@/interfaces/table/ITable'

export const useTableStore = defineStore('table', () => {
  const data = ref<TableData[]>([])
  const fields = ref<ITableField[]>([])
  const page = ref(1)
  const size = ref(2)

  function setData(newData: TableData[]) {
    data.value = newData
  }

  function setFields(newFields: ITableField[]) {
    fields.value = newFields
  }

  function setPage(newPage: number) {
    if (newPage > 0) {
      page.value = newPage
    } else {
      page.value = 1
    }
  }

  function setSize(newSize: number) {
    if (newSize > 0) {
      size.value = newSize
    } else {
      size.value = 10
    }
  }

  return {
    data,
    fields,
    page,
    size,
    setData,
    setFields,
    setPage,
    setSize,
  }
})
