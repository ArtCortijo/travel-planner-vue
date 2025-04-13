<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user', error.message)
    return
  }

  const user = data?.user

  if (user) {
    // get user metadata
    const name = user.user_metadata.full_name
    const avatar = user.user_metadata.avatar_url
    userStore.setUser({ name, avatar })

    // redirect to home
    router.push('/')
  }
})
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <p class="text-lg font-semibold">Logging you in...</p>
  </div>
</template>
