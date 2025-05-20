<script lang="ts" setup>
// Components
import FooterBrand from '@/components/footer/FooterBrand.vue'

const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <div>
    <div class="flex flex-col gap-8 p-4">
      <div class="flex justify-between">
        <div>
          <span class="text-xl font-black">{{ appName }}</span>
        </div>
        <div class="flex gap-4">
          <a class="opacity-60 hover:opacity-100" href="">Politique de confidentialité</a>
          <a class="opacity-60 hover:opacity-100" href="">Conditions d'utilisation</a>
          <a class="opacity-60 hover:opacity-100" href="">Nous contacter</a>
        </div>
      </div>
      <div class="flex justify-center">
        <span>© {{ new Date().getFullYear() }} {{ appName }}. Tous droits réservés.</span>
      </div>
    </div>
    <FooterBrand />
  </div>
</template>
