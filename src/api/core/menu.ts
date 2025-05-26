import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core'
// Interfaces
import type { IMenu } from '@/interfaces/menu/IMenu'

const apiProtocol = import.meta.env.VITE_API_PROTOCOL
const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const apiVersion = import.meta.env.VITE_API_VERSION
const baseUrl = `${apiProtocol}://${apiHost}:${apiPort}/api/${apiVersion}`

export const fetchMenus = async () => {
  const { data, error }: { data: Ref<IMenu[] | null>; error: Ref<unknown | null> } = await useFetch<
    IMenu[]
  >(`${baseUrl}/menus`)
    .get()
    .json()

  if (error.value) {
    console.error('Fetch menus failed:', error.value)
    return
  }

  console.log('Fetch menus successful:', data.value)
  return data.value
}
