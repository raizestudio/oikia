import { computed, ref } from 'vue'

export function usePagination(defaultPage = 1, defaultSize = 10) {
  const page = ref(defaultPage)
  const size = ref(defaultSize)
  const count = ref(0)

  const totalPages = computed(() => {
    return size.value > 0 ? Math.ceil(count.value / size.value) : 0
  })

  function setCount(newCount: number) {
    count.value = newCount
  }

  function nextPage() {
    if (page.value < totalPages.value) {
      page.value++
    }
  }

  function prevPage() {
    if (page.value > 1) {
      page.value--
    }
  }

  function setPage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage
    }
  }

  function setSize(newSize: number) {
    if (newSize > 0) {
      size.value = newSize
      page.value = 1 // Reset to first page when size changes
    }
  }

  return {
    page,
    size,
    count,
    totalPages,
    setCount,
    nextPage,
    prevPage,
    setPage,
    setSize,
  }
}
