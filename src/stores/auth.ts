import { ref } from 'vue'
import { defineStore } from 'pinia'

// Api
import { getIPInfo } from '@/api/ipInfo'
import { createSessionIpInfo, authenticateUser } from '@/api/auth/auth'

// Interfaces
import type { ISession } from '@/interfaces/auth/ISession'
import type { IUser } from '@/interfaces/users/IUser'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const session = ref<ISession | null>(null)
  const user = ref<IUser | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))

  function setIPInfo() {
    getIPInfo().then((data) => {
      createSessionIpInfo(data.ipAddress).then((data) => {
        session.value = data
      })
    })
  }

  async function authenticate(email: string, password: string) {
    const isDemo = import.meta.env.VITE_IS_DEMO === 'true'

    if (isDemo && email === 'demo' && password === 'demo') {
      console.warn('Demo mode is enabled. Authentication will not proceed.')
      isAuthenticated.value = true
      return true
    }

    try {
      const authInfo = await authenticateUser(email, password)

      if (authInfo) {
        console.log(`Authentication successful for user: ${authInfo.token}`)
        localStorage.setItem('token', authInfo.token as string)
        token.value = authInfo.token
        refreshToken.value = authInfo.refresh
        isAuthenticated.value = true
        return true
      } else {
        isAuthenticated.value = false
        user.value = null
        return false
      }
    } catch (err) {
      console.error('Authentication error:', err)
      return false
    }
  }

  return { isAuthenticated, session, user, token, refreshToken, setIPInfo, authenticate }
})
