import { useFetch } from '@vueuse/core'

// const ipInfoToken = import.meta.env.VITE_IP_INFO_TOKEN

// export const getIPInfo = async (clientIP?: string) => {
export const getIPInfo = async () => {
  const { data, error } = await useFetch(
    `https://freeipapi.com/api/json/`, //&ip=${clientIP}
  )
    .get()
    .json()

  if (error.value) {
    console.error('Fetch IP info failed:', error.value)
    return
  }

  console.log('Fetch IP info successful:', data.value)
  return data.value
}
