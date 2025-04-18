<script lang="ts" setup>
import { useTripsStore } from '@/stores/trips'
import DestinationCard from './DestinationCard.vue'

const tripsStore = useTripsStore()
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold">Saved Destinations</h2>

    <div v-if="tripsStore.trips.length === 0" class="text-gray-400">No destinations added yet.</div>

    <div v-else class="grid gap-4 sm:grid-cols-2">
      <DestinationCard
        v-for="trip in tripsStore.trips"
        :key="trip.id"
        :trip="trip"
        @remove="tripsStore.removeTrip(trip.id)"
      />
    </div>
  </div>
</template>
