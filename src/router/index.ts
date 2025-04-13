import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AuthCallback from '@/views/AuthCallback.vue'
import PlannerView from '@/views/PlannerView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/planner',
      name: 'planner',
      component: PlannerView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth/callback',
      name: 'AuthCallback',
      component: AuthCallback,
    },
  ],
})

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  const { data } = await supabase.auth.getSession()
  const isAuthenticated = data.session ? true : false

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
