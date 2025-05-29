import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Interfaces
import type { IToast } from '@/interfaces/toast/IToast'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<IToast[]>([])
  const toastTimers = ref<Record<string, number>>({})
  const defaultTimeout = 5000

  const addToast = (toast: IToast) => {
    toasts.value.push(toast)
    const duration = toast.duration || defaultTimeout
    toastTimers.value[toast.id] = duration

    const interval = setInterval(() => {
      toastTimers.value[toast.id] -= 100

      if (toastTimers.value[toast.id] <= 0) {
        toasts.value = toasts.value.filter((t) => t.id !== toast.id)
        delete toastTimers.value[toast.id]
        clearInterval(interval)
      }
    }, 100)
  }

  const getRemainingTime = (id: string) => computed(() => toastTimers.value[id] || 0)

  const getRemainingTimePercent = (id: string, totalDuration: number) =>
    computed(() => {
      const remaining = toastTimers.value[id] || 0
      return (remaining / totalDuration) * 100
    })
  return { toasts, addToast, getRemainingTime, getRemainingTimePercent, defaultTimeout }
})
