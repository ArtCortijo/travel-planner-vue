<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const userStore = useUserStore()

const logout = async () => {
  await supabase.auth.signOut()
  userStore.clearUser()
  router.push('/login')
}
</script>

<template>
  <nav class="flex justify-between items-center p-4">
    <div class="font-bold text-lg">Travel Planner</div>

    <div class="flex items-center gap-4">
      <span v-if="userStore.name">Hi, {{ userStore.name }}</span>
      <img
        v-if="userStore.avatar"
        :src="userStore.avatar"
        alt="Profile"
        class="w-8 h-8 rounded-full"
      />
      <button
        v-if="userStore.name"
        @click="logout"
        class="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
