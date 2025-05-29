import { ref } from 'vue'
import { defineStore } from 'pinia'

// Api
import { fetchMenus } from '@/api/core/menu'

// Interfaces
import type { IMenu, IMenuWithChildren } from '@/interfaces/menu/IMenu'

function buildMenuTree(flat: IMenu[]) {
  const map = new Map<number, IMenu & { children: IMenuWithChildren[] }>()
  const tree: (IMenu & { children: IMenuWithChildren[] })[] = []

  for (const item of flat) {
    map.set(item.id, { ...item, children: [] })
  }

  for (const item of flat) {
    console.log('Item:', item, 'parent:', item.parent_id)
    const node = map.get(item.id)!
    if (item.parent_id !== null && item.parent_id !== undefined) {
      const parent = map.get(item.parent_id as number)
      if (parent) {
        parent.children.push(node)
      } else {
        console.warn(`Parent with id ${item.parent_id} not found for menu ${item.id}`)
        tree.push(node) // fallback in case parent missing
      }
    } else {
      tree.push(node)
    }
  }

  console.log('Menu tree built successfully:', tree)
  return tree
}

export const useCoreStore = defineStore('core', () => {
  const isGlobalLoading = ref(true)
  const isLoading = ref(true)
  const isSidebarOpen = ref(false)
  const menus = ref<IMenu[]>([])
  const menuTree = ref<(IMenu & { children: IMenuWithChildren[] })[]>([])

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
    localStorage.setItem('isSidebarOpen', isSidebarOpen.value.toString())
  }

  const checkSidebarLocalStorage = () => {
    const storedValue = localStorage.getItem('isSidebarOpen')
    if (storedValue !== null) {
      isSidebarOpen.value = storedValue === 'true'
    } else {
      isSidebarOpen.value = true // Default to open if not set
    }
  }

  function setMenus() {
    fetchMenus().then((data) => {
      menus.value = data || []
      menuTree.value = buildMenuTree(menus.value)
    })
  }

  function setGlobalLoading(loading: boolean) {
    isGlobalLoading.value = loading
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  return {
    isGlobalLoading,
    isLoading,
    isSidebarOpen,
    menus,
    menuTree,
    toggleSidebar,
    checkSidebarLocalStorage,
    setMenus,
    setGlobalLoading,
    setLoading,
  }
})
