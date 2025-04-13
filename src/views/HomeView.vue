<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

const user = useUserStore()
</script>

<template>
  <div class="max-w-3xl mx-auto py-10 px-4 text-center">
    <h1 class="text-3xl font-bold mb-4">Welcome, {{ user.name }} 👋</h1>
    <img :src="user.avatar" alt="Profile" class="w-24 h-24 rounded-full mx-auto mb-6" />

    <p class="text-gray-600 mb-6">Access the planner and start building your itinerary.</p>

    <RouterLink
      to="/planner"
      class="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
    >
      Start Planning
    </RouterLink>
  </div>
</template>
