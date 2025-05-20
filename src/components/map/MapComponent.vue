<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: maplibregl.Map | null = null

onMounted(() => {
  if (!mapContainer.value) return

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: 'https://tiles.stadiamaps.com/styles/alidade_smooth.json',
    center: [2.3522, 48.8566], // Paris [lng, lat]
    zoom: 12,
  })

  new maplibregl.Marker().setLngLat([2.3522, 48.8566]).addTo(map)
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>



<style scoped>
.map-container {
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
}
</style>
