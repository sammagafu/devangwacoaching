<template>
  <main>
    <section class="p-0 d-flex align-items-center position-relative overflow-hidden">
      <b-container fluid>
        <b-row>
          <b-col
            cols="12"
            lg="6"
            class="d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100"
          >
            <div class="p-3 p-lg-5 text-center">
              <h2 class="fw-bold">Welcome to Devangwa Coaching</h2>
              <p class="mb-0 h6 fw-light">Learn new skills with expert-led courses.</p>
              <img :src="element02" class="mt-5 img-fluid" alt="" />
            </div>
          </b-col>

          <b-col cols="12" lg="6" class="m-auto">
            <b-row class="my-5">
              <b-col sm="10" xl="8" class="m-auto">
                <h1 class="fs-2">Sign in</h1>
                <p class="lead mb-4">Use your email and password to access your account.</p>

                <b-alert v-if="registeredBanner" variant="success" show class="mb-4">
                  Account created. Sign in with your email and password.
                </b-alert>
                <b-alert v-if="error" variant="danger" show class="mb-4">{{ error }}</b-alert>

                <b-form @submit.prevent="handleSignIn">
                  <b-form-group label="Email" label-for="email" class="mb-3">
                    <b-form-input
                      id="email"
                      v-model="credentials.email"
                      type="email"
                      autocomplete="email"
                      placeholder="you@example.com"
                      size="lg"
                      required
                    />
                  </b-form-group>

                  <b-form-group label="Password" label-for="password" class="mb-3">
                    <b-input-group size="lg">
                      <b-form-input
                        id="password"
                        v-model="credentials.password"
                        :type="showPassword ? 'text' : 'password'"
                        autocomplete="current-password"
                        placeholder="••••••••"
                        required
                      />
                      <template #append>
                        <b-button variant="light" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
                          <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" />
                        </b-button>
                      </template>
                    </b-input-group>
                  </b-form-group>

                  <div class="mb-4 d-flex justify-content-between align-items-center">
                    <b-form-checkbox v-model="rememberMe">Remember me</b-form-checkbox>
                    <router-link :to="{ name: 'auth.forgot-password' }" class="small text-primary">
                      Forgot password?
                    </router-link>
                  </div>

                  <div class="d-grid">
                    <b-button variant="primary" type="submit" size="lg" :disabled="loading">
                      <b-spinner v-if="loading" small class="me-2" />
                      {{ loading ? 'Signing in…' : 'Sign in' }}
                    </b-button>
                  </div>
                </b-form>

                <p class="mt-4 text-center mb-0">
                  New here?
                  <router-link :to="{ name: 'auth.sign-up' }">Create an account</router-link>
                </p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import element02 from '@/assets/images/element/02.svg'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const registeredBanner = computed(() => route.query.registered === '1')
const credentials = reactive({ email: '', password: '' })
const error = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const showPassword = ref(false)

const handleSignIn = async () => {
  error.value = ''
  if (!credentials.email?.trim()) {
    error.value = 'Email is required.'
    return
  }
  if (!credentials.password || credentials.password.length < 8) {
    error.value = 'Password must be at least 8 characters.'
    return
  }

  loading.value = true
  try {
    await authStore.login(
      { email: credentials.email.trim(), password: credentials.password },
      rememberMe.value
    )

    const redirectFrom = route.query.redirectedFrom
    if (typeof redirectFrom === 'string' && redirectFrom.startsWith('/')) {
      await router.push(redirectFrom)
      return
    }

    if (authStore.isStaff || authStore.isAdmin) {
      await router.push({ name: 'admin.dashboard' })
    } else {
      await router.push({ name: 'student.dashboard' })
    }
  } catch (err) {
    const detail = err?.detail
    error.value =
      typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
          ? detail[0]
          : err?.message || 'Invalid email or password.'
  } finally {
    loading.value = false
  }
}
</script>
