<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const signOutError = ref('')

async function signOut() {
  signOutError.value = ''
  try {
    await auth.signOut()
    await router.replace({ name: 'login' })
  } catch (error) {
    signOutError.value = error instanceof Error ? error.message : 'Unable to sign out.'
  }
}
</script>

<template>
  <header>
    <div v-if="auth.session" class="app-header">
      <RouterLink class="brand" to="/">Trivia</RouterLink>
      <nav aria-label="Main navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink to="/random">Random Question</RouterLink>
        <RouterLink to="/report">Report Card</RouterLink>
      </nav>
      <div class="account">
        <span>{{ auth.user?.email }}</span>
        <button type="button" @click="signOut">Sign out</button>
      </div>
    </div>
    <p v-if="signOutError" class="sign-out-error" role="alert">{{ signOutError }}</p>
  </header>

  <RouterView />
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.brand {
  color: var(--color-heading);
  font-size: 1.1rem;
  font-weight: 700;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

nav a,
.account button {
  padding: 0.45rem 0.65rem;
  border: 0;
  border-radius: 0.4rem;
  color: var(--color-text);
  font: inherit;
}

nav a.router-link-exact-active {
  background: var(--color-background-mute);
  color: var(--color-heading);
  font-weight: 600;
}

.account {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text);
  font-size: 0.9rem;
}

.account button {
  background: var(--color-background-mute);
  cursor: pointer;
}

.sign-out-error {
  margin-top: 0.5rem;
  color: #b42318;
}

@media (max-width: 760px) {
  .app-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
