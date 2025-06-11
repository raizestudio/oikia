import { type Ref } from 'vue'
import { useFetch } from '@vueuse/core'

// Api
import type { ISession } from '@/interfaces/auth/ISession'

// Interfaces
import type { IAuth } from '@/interfaces/auth/IAuth'

const apiProtocol = import.meta.env.VITE_API_PROTOCOL
const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const apiVersion = import.meta.env.VITE_API_VERSION
const baseUrl = `${apiProtocol}://${apiHost}:${apiPort}/api/${apiVersion}`

export const authenticateUser = async (email: string, password: string) => {
  const formData = new URLSearchParams()
  formData.append('username', email)
  formData.append('password', password)

  const { data, error }: { data: Ref<IAuth | null>; error: Ref<unknown | null> } =
    await useFetch<IAuth>(`${baseUrl}/auth/authenticate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .post()
      .json()

  if (error.value) {
    console.error('Login failed:', error.value)
    return
  }

  console.log('Login successful:', data.value)
  if (data.value) {
    return data.value
  }
}

export const authenticateUserFromToken = async (token: string) => {
  const { data, error } = await useFetch(`${baseUrl}/auth/authenticate/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ token }),
  })
    .get()
    .json()

  if (error.value) {
    console.error('Fetch user failed:', error.value)
    return
  }

  console.log('Fetch user successful:', data.value)
  return data.value
}

export const logoutUser = async (token: string) => {
  const { data, error } = await useFetch(`${baseUrl}/auth/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .post()
    .json()

  if (error.value) {
    console.error('Logout failed:', error.value)
    return
  }

  console.log('Logout successful:', data.value)
  return data.value
}

export const createSession = async (bodyData: object, token?: string) => {
  const body = JSON.stringify(bodyData)
  const { data, error } = await useFetch(`${baseUrl}/auth/sessions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Token ${token}`,
    },
    body: body,
  })
    .post()
    .json()

  if (error.value) {
    console.error('Create session failed:', error.value)
    return
  }

  console.log('Create session successful:', data.value)
  return data.value
}

export const createSessionIpInfo = async (clientId: string) => {
  const { data, error } = await useFetch(`${baseUrl}/auth/sessions/ip-info/?client_id=${clientId}`)
    .get()
    .json()

  if (error.value) {
    console.error('Create session failed:', error.value)
    return
  }

  console.log('Create session successful:', data.value)
  return data.value
}

export const fetchSessions = async (token: string) => {
  const { data, error } = await useFetch(`${baseUrl}/auth/sessions/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .get()
    .json()

  if (error.value) {
    console.error('Fetch session failed:', error.value)
    return
  }

  console.log('Fetch session successful:', data.value)
  return data.value
}
