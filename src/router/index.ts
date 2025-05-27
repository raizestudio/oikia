import { createRouter, createWebHistory } from 'vue-router'

// Components
import LandingView from '@/views/LandingView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import DashboardUsers from '@/views/dashboard/DashboardUsers.vue'
import DashboardContinents from '@/views/dashboard/DashboardContinents.vue'
import DashboardCountries from '@/views/dashboard/DashboardCountries.vue'
import DashboardAdministrativeLevelOnes from '@/views/dashboard/DashboardAdministrativeLevelOnes.vue'
import DashboardAdministrativeLevelTwos from '@/views/dashboard/DashboardAdministrativeLevelTwos.vue'
import DashboardCities from '@/views/dashboard/DashboardCities.vue'
import DashboardAddresses from '@/views/dashboard/DashboardAddresses.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import InternalErrorView from '@/views/errors/InternalErrorView.vue'
import DashboardStreets from '@/views/dashboard/DashboardStreets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: '/dashboard/data/geo/continents',
      name: 'dashboard-continents',
      component: DashboardContinents,
      meta: {
        layout: 'dashboard',
      },
    },
    {
      path: '/dashboard/data/geo/countries',
      name: 'dashboard-countries',
      component: DashboardCountries,
      meta: {
        layout: 'dashboard',
      },
    },
    {
      path: '/dashboard/data/geo/administrative-level-ones',
      name: 'dashboard-administrative-level-ones',
      component: DashboardAdministrativeLevelOnes,
      meta: {
        layout: 'dashboard',
      },
    },
    {
      path: '/dashboard/data/geo/administrative-level-twos',
      name: 'dashboard-administrative-level-twos',
      component: DashboardAdministrativeLevelTwos,
      meta: {
        layout: 'dashboard',
      },
    },
    {
      path: '/dashboard/data/geo/cities',
      name: 'dashboard-cities',
      component: DashboardCities,
      meta: {
        layout: 'dashboard',
      },
    },
    {
      path: '/dashboard/data/geo/streets',
      name: 'dashboard-streets',
      component: DashboardStreets,
      meta: {
        layout: 'dashboard',
      },
    },
    {
      path: '/dashboard/data/geo/addresses',
      name: 'dashboard-addresses',
      component: DashboardAddresses,
      meta: {
        layout: 'dashboard',
      },
    },
    // Errors
    { path: '/500', name: 'InternalError', component: InternalErrorView },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: { layout: 'error' },
    },

    // {
    //   path: '/about',
    //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
