import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Components
import LandingView from '@/views/LandingView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import DashboardUsers from '@/views/dashboard/DashboardUsers.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import InternalErrorView from '@/views/errors/InternalErrorView.vue'

const geoRoutes = [
  {
    path: '/dashboard/data/geo/continents',
    name: 'dashboard-continents',
    component: () => import('@/views/dashboard/DashboardContinents.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/countries',
    name: 'dashboard-countries',
    component: () => import('@/views/dashboard/DashboardCountries.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/administrative-level-ones',
    name: 'dashboard-administrative-level-ones',
    component: () => import('@/views/dashboard/DashboardAdministrativeLevelOnes.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/administrative-level-twos',
    name: 'dashboard-administrative-level-twos',
    component: () => import('@/views/dashboard/DashboardAdministrativeLevelTwos.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/cities',
    name: 'dashboard-cities',
    component: () => import('@/views/dashboard/DashboardCities.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/streets',
    name: 'dashboard-streets',
    component: () => import('@/views/dashboard/DashboardStreets.vue'),
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/dashboard/data/geo/addresses',
    name: 'dashboard-addresses',
    component: () => import('@/views/dashboard/DashboardAddresses.vue'),
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
  ...geoRoutes,
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
  // const coreStore = useCoreStore()
  // const usersStore = useUsersStore()
  // const authStore = useAuthStore()

  // Start global loading
  // coreStore.setGlobalLoading(true)

  // authStore.setIPInfo()

  // If already authenticated, proceed
  // if (usersStore.isAuth) {
  //   coreStore.setGlobalLoading(false)
  //   return next()
  // }

  const token = localStorage.getItem('token')

  // If there's a token, try to authenticate
  if (token) {
    try {
      // const user = await authenticateUserFromToken(token)
      // if (user) {
      //   usersStore.getPlayerProfile(user.id)
      //   usersStore.login(user)
      // } else {
      //   localStorage.removeItem('token')
      // }
    } catch (error) {
      console.log(`Error authenticating, removing token: ${error}`)
      localStorage.removeItem('token')
    }
  }

  // Redirect to home if authentication is required and user is not authenticated
  // if (to.meta.requiresAuth && !usersStore.isAuth) {
  //   coreStore.setGlobalLoading(false)
  //   return next({ name: 'home' })
  // }

  // Stop global loading before navigating
  // coreStore.setGlobalLoading(false)
  next()
})

export default router
