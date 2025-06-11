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

export const useCoreStore = defineStore('core', {
  state: () => ({
    isGlobalLoading: false,
    isLoading: true,
    isSidebarOpen: false,
    menus: [] as IMenu[],
    menuTree: [] as (IMenu & { children: IMenuWithChildren[] })[],
    currentMenu: -1,
    currentSubMenu: -1,
  }),

  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
      localStorage.setItem('isSidebarOpen', this.isSidebarOpen.toString())
    },

    checkSidebarLocalStorage() {
      const storedValue = localStorage.getItem('isSidebarOpen')
      if (storedValue !== null) {
        this.isSidebarOpen = storedValue === 'true'
      } else {
        this.isSidebarOpen = true
      }
    },

    async setMenus() {
      if (this.menus.length > 0) {
        return
      }
      const data = await fetchMenus()
      this.menus = data || []
      this.menuTree = buildMenuTree(this.menus)
    },

    setGlobalLoading(loading: boolean) {
      this.isGlobalLoading = loading
    },

    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    toggleMenu(menuId: number) {
      this.currentMenu = this.currentMenu === menuId ? -1 : menuId
    },

    toggleSubMenu(subMenuId: number) {
      this.currentSubMenu = this.currentSubMenu === subMenuId ? -1 : subMenuId
    },
  },
})
