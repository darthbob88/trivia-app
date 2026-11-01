<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const mode = ref<'sign-in' | 'sign-up'>('sign-in')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const notice = ref('')
const submitting = ref(false)

function getRedirectPath() {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')
    ? redirect
    : { name: 'home' }
}

async function submit() {
  submitting.value = true
  errorMessage.value = ''
  notice.value = ''

  try {
    if (mode.value === 'sign-in') {
      await auth.signIn(email.value, password.value)
    } else {
      const signedIn = await auth.signUp(email.value, password.value)
      if (!signedIn) {
        notice.value = 'Check your email for a confirmation link, then sign in.'
        return
      }
    }

    await router.replace(getRedirectPath())
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Authentication failed.'
  } finally {
    submitting.value = false
  }
}

function changeMode(nextMode: 'sign-in' | 'sign-up') {
  mode.value = nextMode
  errorMessage.value = ''
  notice.value = ''
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card" aria-labelledby="auth-title">
      <p class="eyebrow">TRIVIA APP</p>
      <h1 id="auth-title">{{ mode === 'sign-in' ? 'Welcome back' : 'Create your account' }}</h1>
      <p class="intro">
        {{
          mode === 'sign-in'
            ? 'Sign in to continue to your questions.'
            : 'Sign up to start exploring trivia.'
        }}
      </p>

      <div class="mode-switch" aria-label="Authentication options">
        <button
          type="button"
          :aria-pressed="mode === 'sign-in'"
          @click="changeMode('sign-in')"
        >
          Sign in
        </button>
        <button
          type="button"
          :aria-pressed="mode === 'sign-up'"
          @click="changeMode('sign-up')"
        >
          Sign up
        </button>
      </div>

      <form class="auth-form" @submit.prevent="submit">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
        />

        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          :autocomplete="mode === 'sign-in' ? 'current-password' : 'new-password'"
          required
        />

        <p v-if="errorMessage" class="message error" role="alert">{{ errorMessage }}</p>
        <p v-if="notice" class="message notice" role="status">{{ notice }}</p>

        <button class="submit-button" type="submit" :disabled="submitting">
          {{
            submitting
              ? 'Please wait…'
              : mode === 'sign-in'
                ? 'Sign in'
                : 'Create account'
          }}
        </button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  display: grid;
  min-height: min(76vh, 720px);
  place-items: center;
  padding: 2rem 1rem;
}

.auth-card {
  width: min(100%, 430px);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;
  background: var(--color-background-soft);
  box-shadow: 0 1.5rem 4rem rgb(20 30 55 / 8%);
}

.eyebrow {
  margin-bottom: 0.6rem;
  color: #387c66;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

h1 {
  color: var(--color-heading);
  font-size: clamp(1.7rem, 5vw, 2.1rem);
  font-weight: 700;
  line-height: 1.2;
}

.intro {
  margin-top: 0.65rem;
  color: var(--color-text);
}

.mode-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.35rem;
  margin: 1.7rem 0;
  padding: 0.3rem;
  border-radius: 0.7rem;
  background: var(--color-background-mute);
}

.mode-switch button {
  min-height: 2.5rem;
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  font: inherit;
}

.mode-switch button[aria-pressed='true'] {
  background: var(--color-background);
  color: var(--color-heading);
  box-shadow: 0 1px 4px rgb(20 30 55 / 12%);
  font-weight: 600;
}

.auth-form {
  display: grid;
  gap: 0.6rem;
}

.auth-form label {
  margin-top: 0.45rem;
  color: var(--color-heading);
  font-size: 0.9rem;
  font-weight: 600;
}

.auth-form input {
  width: 100%;
  min-height: 2.9rem;
  padding: 0.65rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 0.55rem;
  background: var(--color-background);
  color: var(--color-heading);
  font: inherit;
}

.auth-form input:focus-visible,
.mode-switch button:focus-visible,
.submit-button:focus-visible {
  outline: 2px solid #387c66;
  outline-offset: 2px;
}

.message {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.error {
  color: #b42318;
}

.notice {
  color: #256b4f;
}

.submit-button {
  min-height: 3rem;
  margin-top: 0.8rem;
  border: 0;
  border-radius: 0.6rem;
  background: #28664f;
  color: white;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

.submit-button:hover:not(:disabled) {
  background: #1f523f;
}

.submit-button:disabled {
  cursor: wait;
  opacity: 0.7;
}
</style>
