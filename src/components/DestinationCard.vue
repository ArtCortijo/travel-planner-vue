<script lang="ts" setup>
defineProps<{
  trip: {
    id: string
    location: string
    coordinates: [number, number]
    startDate: string
    endDate: string
  }
}>()

const emit = defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  <div class="rounded-lg bg-zinc-800 text-white p-4 shadow hover:shadow-lg transition">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-lg font-bold">{{ trip.location }}</h3>
        <p class="text-sm text-zinc-400">{{ trip.startDate }} - {{ trip.endDate }}</p>
      </div>
      <button
        @click="emit('remove')"
        class="text-sm px-2 py-1 bg-red-600 rounded text-white hover:bg-red-700"
      >
        remove
      </button>
    </div>
  </div>
</template>
