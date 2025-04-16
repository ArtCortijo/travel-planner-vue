<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

const mapContainer = ref<HTMLElement | null>(null)
// TypeScript issue when working with deeply inferred types from external libraries like Mapbox GL
// can be fixed by using the `Ref` type
const markers: Ref<mapboxgl.Marker[]> = ref([])
// or by using a more relaxed type
// const markers = ref([] as unknown as mapboxgl.Marker[])
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
      // additional map configuration here
    })

    // Adding a marker when click on the map
    map.on('click', (e) => {
      const { lng, lat } = e.lngLat
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map!)
      markers.value.push(marker)
      console.log('lng: ', lng, ' lat: ', lat)
    })
  }
})
</script>

<template>
  <div ref="mapContainer" class="map-container w-full h-[50vh]"></div>
</template>
