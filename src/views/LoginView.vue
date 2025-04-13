<script setup lang="ts">
import { supabase } from '../lib/supabase'

const loginWithGoogle = async (): Promise<void> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL,
    },
  })

  if (error) console.error('Google login error', error)
}
</script>

<template>
  <div class="h-[400px] flex items-center justify-center">
    <div class="p-6 rounded shadow-md max-w-sm w-full">
      <h2 class="text-xl font-bold mb-4 text-center">Login</h2>
      <button
        @click="loginWithGoogle"
        class="ease-in-out duration-300 w-full bg-red-600 hover:bg-red-700 cursor-pointer text-white py-2 px-4 rounded"
      >
        Continue with Google
      </button>
    </div>
  </div>
</template>
