import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null)
  const user = computed(() => session.value?.user ?? null)
  const initialized = ref(false)
  let initializationPromise: Promise<void> | null = null

  async function initialize() {
    if (initialized.value) return

    if (!initializationPromise) {
      initializationPromise = (async () => {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error

        session.value = data.session
        initialized.value = true
        supabase.auth.onAuthStateChange((_event, nextSession) => {
          session.value = nextSession
          initialized.value = true
        })
      })().catch((error: unknown) => {
        initializationPromise = null
        throw error
      })
    }

    await initializationPromise
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    session.value = data.session
  }

  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    session.value = data.session
    return data.session !== null
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    session.value = null
  }

  return { session, user, initialized, initialize, signIn, signUp, signOut }
})
