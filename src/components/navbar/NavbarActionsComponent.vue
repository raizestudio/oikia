<script setup lang="ts">
// Components
import NavbarThemeComponent from '@/components/navbar/NavbarThemeComponent.vue'

const env = import.meta.env.DEV ? 'dev' : 'prod'
const isDemo = import.meta.env.VITE_IS_DEMO === 'true'
</script>

<template>
  <div v-if="env === 'dev' || isDemo">
    <router-link to="/dashboard" class="btn btn-sm btn-primary flex">Dashboard</router-link>
  </div>
  <NavbarThemeComponent />
</template>
