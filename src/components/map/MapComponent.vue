<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapContainer = ref(null)
let map = null

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: 'https://demotiles.maplibre.org/style.json', // OSM-compatible style
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
  height: 500px;
  width: 100%;
}
</style>
