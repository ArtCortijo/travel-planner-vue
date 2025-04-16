<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { RouterView, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useUserStore } from './stores/user'

const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  const session = sessionData.session

  if (session) {
    const { data: userData, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Error fetching user', error.message)
    } else {
      const userName = userData?.user?.user_metadata?.full_name || ''
      const userAvatar = userData?.user?.user_metadata?.avatar_url || ''
      userStore.setUser(userName, userAvatar)
    }
  } else {
    router.push('/login')
  }
})
</script>

<template>
  <header class="mb-4">
    <Navbar />
  </header>

  <Suspense>
    <!-- Can work without the use of template #default but keep template #fallback -->
    <template #default>
      <Transition name="fade" mode="out-in">
        <RouterView />
      </Transition>
    </template>

    <template #fallback>
      <div class="text-center py-8">Loading...</div>
    </template>
  </Suspense>
</template>

<style>
/* Basic fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
