import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useUserStore = defineStore('user', () => {
  const name = ref<string>('')
  const avatar = ref<string>('')
  const isLoading = ref<boolean>(false)

  const setUser = (newName: string, newAvatar: string) => {
    name.value = newName
    avatar.value = newAvatar
  }

  const fetchUser = async () => {
    isLoading.value = true
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Error fetching user', error.message)
      return
    }

    if (data?.user) {
      name.value = data.user.user_metadata.full_name
      avatar.value = data.user.user_metadata.avatar_url
    }

    isLoading.value = false
  }

  const clearUser = () => {
    name.value = ''
    avatar.value = ''
  }

  return { name, avatar, isLoading, setUser, fetchUser, clearUser }
})
