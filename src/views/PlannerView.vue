<script lang="ts" setup>
import TripForm from '@/components/TripForm.vue'
import MapView from '@/components/MapView.vue'
import DestinationList from '@/components/DestinationList.vue'
import { ref } from 'vue'
import { useTripsStore } from '@/stores/trips'

const mapViewRef = ref()
const tripsStore = useTripsStore()

// Handle location selection
const handleLocationSelected = (conrdinates: [number, number]) => {
  // Use the exposed method from MapView
  mapViewRef.value.focusLocation(conrdinates)
}

// Handle trip saving
const handleTripSaved = (trip: {
  location: string
  coordinates: [number, number]
  startDate: string
  endDate: string
}) => {
  tripsStore.addTrip(trip)
}
</script>

<template>
  <div class="planner">
    <h1>This is my planner page</h1>
    <TripForm @location-selected="handleLocationSelected" @trip-saved="handleTripSaved" />
    <MapView ref="mapViewRef" />
    <DestinationList />
  </div>
</template>
