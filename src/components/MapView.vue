<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: mapboxgl.Map | null = null

onMounted(() => {
  if (mapContainer.value) {
    // Use the environment variable directly
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string

    // Montreal coordinates: longitude, latitude
    const montrealCoordinates: [number, number] = [-73.5674, 45.5017]

    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: montrealCoordinates,
      zoom: 12,
    })

    // Adding controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      // You can add additional map configuration here
    })
  }
})
</script>

<template>
  <div ref="mapContainer" class="map-container w-full h-[50vh]"></div>
</template>
