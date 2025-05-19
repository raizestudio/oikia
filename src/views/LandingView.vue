<script setup lang="ts">
// Components
import HeroComponent from '@/components/hero/HeroComponent.vue'
import MapComponent from '@/components/map/MapComponent.vue'
</script>

<template>
  <div class="h-[calc(100vh-64px)]">
    <HeroComponent
      class="h-full"
      title="Trouvez votre prochain chez vous"
      description="Notre application vous aide à trouver l'endroit idéal pour vivre, que ce soit un appartement, une maison ou un studio."
    />
  </div>
  <div class="bg-base-200">
    <MapComponent />
  </div>
</template>
