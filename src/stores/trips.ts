import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Trip = {
  id: string
  location: string
  coordinates: [number, number]
  startDate: string
  endDate: string
}

export const useTripsStore = defineStore('trips', () => {
  const trips = ref<Trip[]>([])

  const addTrip = (trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      // Generate a unique ID
      id: crypto.randomUUID(),
      ...trip,
    }
    trips.value.push(newTrip)
  }

  const removeTrip = (id: string) => {
    trips.value = trips.value.filter((trip) => trip.id !== id)
  }

  return {
    trips,
    addTrip,
    removeTrip,
  }
})
