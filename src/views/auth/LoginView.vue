<script setup lang="ts">
import { ref } from 'vue'
import { Field, Form } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'

// Components
import IconInfo from '@/components/icons/IconInfo.vue'

// Stores
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const isDemo = import.meta.env.VITE_IS_DEMO === 'true'

const handleLogin = async () => {
  const success = await authStore.authenticate(email.value, password.value)
  console.log('Login attempt:', { email: email.value, password: password.value })
  console.log('Authentication success:', success)
  if (success) {
    const redirectTo = route.query.next || '/dashboard'
    router.push(redirectTo as string)
  } else {
    // Optional: show an error message or toast
    console.error('Authentication failed')
  }
}

const validateEmail = (value: unknown) => {
  if (isDemo) {
    return true // Skip validation in demo mode
  }
  if (typeof value !== 'string') {
    return 'Invalid email'
  }

  if (!value) {
    return 'Email is required'
  } else if (!value.includes('@')) {
    return 'Invalid email'
  }

  return true
}

const validatePassword = (value: unknown) => {
  if (isDemo) {
    return true // Skip validation in demo mode
  }
  if (typeof value !== 'string') {
    return 'Invalid password'
  }

  if (!value) {
    return 'Password is required'
  }

  return true
}
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <div class="flex flex-col gap-2">
      <div class="alert bg-info/80 shadow-none">
        <IconInfo class="w-6 h-6" />
        <span>User: demo / Passwd: demo</span>
      </div>

      <div class="bg-base-200 p-4 rounded">
        <h1 class="text-center text-3xl font-bold mb-4">Login</h1>

        <!-- <Form class="flex flex-col gap-8 pt-8" @submit="handleLogin"> -->
        <Form class="flex flex-col gap-8 pt-8" @submit="handleLogin">
          <div class="flex flex-col items-center gap-2 px-6">
            <div class="flex flex-col w-full gap-2">
              <label for="email">Email</label>
              <Field name="email" v-slot="{ field, errorMessage }" :rules="validateEmail">
                <input
                  v-model="email"
                  v-bind="field"
                  :class="`input input-bordered w-full ${errorMessage ? 'input-error' : ''}`"
                  type="text"
                />
                <span class="text-xs text-error/60">{{ errorMessage }}</span>
              </Field>
            </div>
            <div class="flex flex-col w-full gap-2">
              <label for="password">Password</label>
              <Field name="password" v-slot="{ field, errorMessage }" :rules="validatePassword">
                <input
                  v-model="password"
                  v-bind="field"
                  :class="`input input-bordered w-full ${errorMessage && 'input-error'}`"
                  type="password"
                />
                <span class="text-xs text-error/60">{{ errorMessage }}</span>
                <span class="text-sm">Hint: Enter a secure password you can remember</span>
              </Field>
            </div>
          </div>
          <button
            class="btn bg-base-100 hover:bg-primary border-none shadow-none"
            v-bind:disabled="!email || !password"
            type="submit"
          >
            <span>Login</span>
            <!-- <span v-else class="loading loading-spinner loading-sm"></span> -->
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>
