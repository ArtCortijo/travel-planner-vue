<script lang="ts" setup>
import { ref, watch } from 'vue'
import axios from 'axios'

interface MapboxFeature {
  place_name: string
  center: [number, number]
  type: string
  place_type: string[]
  name?: string
  address?: {
    city?: string
    town?: string
    village?: string
    hamlet?: string
    county?: string
    country?: string
  }
}

interface MapboxResponse {
  features: MapboxFeature[]
}

const locationInput = ref<string>('')
const locationSuggestions = ref<
  { place_name: string; center: [number, number]; place_type: string[] }[]
>([])
const selectedLocation = ref<{ place_name: string; center: [number, number] } | null>(null)
const startDate = ref<string>('')
const endDate = ref<string>('')
const isLoading = ref<boolean>(false)

const emit = defineEmits<{
  (
    event: 'trip-saved',
    trip: { location: string; coordinates: [number, number]; startDate: string; endDate: string },
  ): void
  (event: 'location-selected', coordinates: [number, number]): void
}>()

// Debounce function to limit API requests
let debounceTimeout: number | null = null
const debounce = (func: () => Promise<void>, delay: number) => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(func, delay) as unknown as number
}

watch(locationInput, (newValue) => {
  if (!newValue || newValue.length < 2) {
    locationSuggestions.value = []
    return
  }

  debounce(async () => {
    isLoading.value = true

    try {
      // Using Mapbox Geocoding API
      const response = await axios.get<MapboxResponse>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(newValue)}.json`,
        {
          params: {
            access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
            types: 'country,region,place,locality', // Filter to only include countries, regions, places (cities)
            limit: 15,
            language: 'en',
          },
        },
      )

      if (response.data.features) {
        locationSuggestions.value = response.data.features.map((feature: MapboxFeature) => ({
          place_name: feature.place_name,
          center: [feature.center[0], feature.center[1]], // Mapbox returns [lng, lat]
          place_type: feature.place_type,
        }))
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error)
      locationSuggestions.value = []
    } finally {
      isLoading.value = false
    }
  }, 300) // 300ms debounce
})

const selectSuggestion = (suggestion: { place_name: string; center: [number, number] }) => {
  selectedLocation.value = suggestion
  locationInput.value = suggestion.place_name
  locationSuggestions.value = []

  // Emit the coordinates when a location is selected
  emit('location-selected', suggestion.center)
}

const saveTrip = () => {
  if (selectedLocation.value && startDate.value && endDate.value) {
    emit('trip-saved', {
      location: selectedLocation.value.place_name,
      coordinates: selectedLocation.value.center,
      startDate: startDate.value,
      endDate: endDate.value,
    })

    // Reset form fields
    locationInput.value = ''
    selectedLocation.value = null
    startDate.value = ''
    endDate.value = ''
  }
}
</script>

<template>
  <div class="space-y-4 p-4 bg-gray-800 rounded-lg shadow-md">
    <div class="relative">
      <label class="block text-white mb-1">City or Country</label>
      <div class="relative">
        <input
          v-model="locationInput"
          type="text"
          class="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Enter a city or country"
        />
        <div v-if="isLoading" class="absolute right-2 top-1/2 transform -translate-y-1/2">
          <svg
            class="animate-spin h-4 w-4 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
      <ul
        v-if="locationSuggestions.length"
        class="absolute z-10 w-full bg-gray-700 mt-1 rounded shadow max-h-60 overflow-y-auto"
      >
        <li
          v-for="(suggestion, index) in locationSuggestions"
          :key="index"
          @click="selectSuggestion(suggestion)"
          class="p-2 cursor-pointer hover:bg-gray-600 text-white flex items-center"
        >
          <span class="flex-1">{{ suggestion.place_name }}</span>
          <span class="text-xs text-gray-400 px-2 py-1 rounded bg-gray-800 ml-2">
            {{
              suggestion.place_type[0] === 'place'
                ? 'City'
                : suggestion.place_type[0] === 'country'
                  ? 'Country'
                  : suggestion.place_type[0] === 'region'
                    ? 'Region'
                    : suggestion.place_type[0]
            }}
          </span>
        </li>
      </ul>
    </div>
    <div class="flex gap-4">
      <div class="flex-1">
        <label class="block text-white mb-1">Start Date</label>
        <input v-model="startDate" type="date" class="w-full p-2 rounded bg-gray-700 text-white" />
      </div>
      <div class="flex-1">
        <label class="block text-white mb-1">End Date</label>
        <input v-model="endDate" type="date" class="w-full p-2 rounded bg-gray-700 text-white" />
      </div>
    </div>
    <button
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer disabled:opacity-50"
      :disabled="!selectedLocation || !startDate || !endDate"
      @click="saveTrip"
    >
      Save Trip
    </button>
  </div>
</template>
