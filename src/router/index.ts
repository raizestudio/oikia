import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Components
import LandingView from '@/views/LandingView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import ProfileView from '@/views/dashboard/ProfileView.vue'
import DashboardUsers from '@/views/dashboard/DashboardUsers.vue'
import LoginView from '@/views/auth/LoginView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import InternalErrorView from '@/views/errors/InternalErrorView.vue'

// Stores
import { useCoreStore } from '@/stores/core'
import { useAuthStore } from '@/stores/auth'

const geoRoutes = [
  {
    path: '/dashboard/data/geo/continents',
    name: 'dashboard-continents',
    component: () => import('@/views/dashboard/data/geo/DashboardContinents.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/countries',
    name: 'dashboard-countries',
    component: () => import('@/views/dashboard/data/geo/DashboardCountries.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/administrative-level-ones',
    name: 'dashboard-administrative-level-ones',
    component: () => import('@/views/dashboard/data/geo/DashboardAdministrativeLevelOnes.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/administrative-level-twos',
    name: 'dashboard-administrative-level-twos',
    component: () => import('@/views/dashboard/data/geo/DashboardAdministrativeLevelTwos.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/cities',
    name: 'dashboard-cities',
    component: () => import('@/views/dashboard/data/geo/DashboardCities.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/streets',
    name: 'dashboard-streets',
    component: () => import('@/views/dashboard/data/geo/DashboardStreets.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/addresses',
    name: 'dashboard-addresses',
    component: () => import('@/views/dashboard/data/geo/DashboardAddresses.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
]

const authRoutes = [
  {
    path: '/dashboard/data/auth/tokens',
    name: 'dashboard-tokens',
    component: () => import('@/views/dashboard/data/auth/DashboardTokens.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/auth/refreshes',
    name: 'dashboard-refreshes',
    component: () => import('@/views/dashboard/data/auth/DashboardRefreshes.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/auth/sessions',
    name: 'dashboard-sessions',
    component: () => import('@/views/dashboard/data/auth/DashboardSessions.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: LandingView,
  },
  // Dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard/profile',
    name: 'dashboard-profile',
    component: ProfileView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard/data/users',
    name: 'dashboard-users',
    component: DashboardUsers,
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      layout: 'auth',
    },
  },
  ...geoRoutes,
  ...authRoutes,
  // Errors
  { path: '/500', name: 'InternalError', component: InternalErrorView },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { layout: 'error' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const coreStore = useCoreStore()
  const authStore = useAuthStore()

  console.log('BeforeEach store loading:', coreStore.isGlobalLoading)
  // Start global loading
  coreStore.setGlobalLoading(true)

  // authStore.setIPInfo()

  // If already authenticated, proceed
  if (authStore.isAuthenticated) {
    return next()
  }

  const token = localStorage.getItem('token')

  // If there's a token, try to authenticate
  if (token) {
    const success = await authStore.authenticateFromToken()
    if (success) {
      return next()
    } else {
      localStorage.removeItem('token')
      return next({ name: 'login', query: { next: to.fullPath } })
    }
  }

  // Redirect to home if authentication is required and user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({
      name: 'login',
      query: { next: to.fullPath },
    })
  }

  next()
})

router.afterEach(() => {
  const coreStore = useCoreStore()
  console.log('AfterEach store loading:', coreStore.isGlobalLoading)
  coreStore.setGlobalLoading(false)
})

export default router
