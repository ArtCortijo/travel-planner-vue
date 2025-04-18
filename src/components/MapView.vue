<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import { useTripsStore } from '@/stores/trips'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

const mapContainer = ref<HTMLElement | null>(null)
const map = ref<mapboxgl.Map | null>(null) as Ref<mapboxgl.Map | null>
const marker: Ref<mapboxgl.Marker | null> = ref(null)
const tripsStore = useTripsStore()

// Use the environment variable directly
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string

onMounted(() => {
  if (mapContainer.value) {
    // Montreal coordinates: longitude, latitude
    const montrealCoordinates: [number, number] = [-73.5674, 45.5017]

    map.value = new mapboxgl.Map({
      container: mapContainer.value,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: montrealCoordinates,
      zoom: 12,
    })

    // Adding controls
    map.value.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.value.on('load', () => {
      // additional map configuration here
    })
  }
})

// Function to focus on a location
const focusLocation = (coords: [number, number]) => {
  if (map.value) {
    // Move map to new location
    map.value.flyTo({ center: coords, zoom: 12 })

    // Remove existing marker if present
    if (marker.value) {
      marker.value.remove()
    }

    // Add new marker
    marker.value = new mapboxgl.Marker().setLngLat(coords).addTo(map.value)
  }
}

// Expose the method to parent components
defineExpose({ focusLocation })

// Watch for changes in selected location when a trip is added
watch(
  () => tripsStore.trips[tripsStore.trips.length - 1], // watch the last trip
  (newTrip) => {
    if (newTrip && map.value) {
      const coords = newTrip.coordinates
      focusLocation(coords)
    }
  },
  // Vue will recursively watch everything inside the object
  { deep: true },
)
</script>

<template>
  <div ref="mapContainer" class="map-container w-full h-[50vh]"></div>
</template>
