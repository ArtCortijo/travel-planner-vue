<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="mb-4">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/planner">Planner</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
