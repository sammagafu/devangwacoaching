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
              <h2 class="fw-bold">Reset your password</h2>
              <p class="mb-0 h6 fw-light">We will email you a link to choose a new password.</p>
              <img :src="element02" class="mt-5 img-fluid" alt="" />
            </div>
          </b-col>

          <b-col cols="12" lg="6" class="m-auto">
            <b-row class="my-5">
              <b-col sm="10" xl="8" class="m-auto">
                <h1 class="fs-2">Forgot password?</h1>
                <p class="lead mb-4">Enter the email address linked to your account.</p>

                <b-alert v-if="success" variant="success" show class="mb-4">
                  If an account exists for that email, you will receive reset instructions shortly.
                </b-alert>
                <b-alert v-else-if="error" variant="danger" show class="mb-4">{{ error }}</b-alert>

                <b-form v-if="!success" @submit.prevent="handleSubmit">
                  <b-form-group label="Email" label-for="email" class="mb-4">
                    <b-form-input
                      id="email"
                      v-model="email"
                      type="email"
                      autocomplete="email"
                      placeholder="you@example.com"
                      size="lg"
                      required
                    />
                  </b-form-group>

                  <div class="d-grid mb-3">
                    <b-button variant="primary" type="submit" size="lg" :disabled="loading">
                      <b-spinner v-if="loading" small class="me-2" />
                      {{ loading ? 'Sending…' : 'Send reset link' }}
                    </b-button>
                  </div>
                </b-form>

                <p class="text-center mb-0">
                  <router-link :to="{ name: 'auth.sign-in' }">Back to sign in</router-link>
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
import { ref } from 'vue'
import authService from '@/services/authService'
import element02 from '@/assets/images/element/02.svg'

const email = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  const trimmed = email.value.trim()
  if (!trimmed) {
    error.value = 'Email is required.'
    return
  }

  loading.value = true
  try {
    await authService.requestPasswordReset(trimmed)
    success.value = true
  } catch (err) {
    const data = err?.response?.data || err
    error.value = data?.detail || data?.email?.[0] || 'Could not send reset email. Try again later.'
  } finally {
    loading.value = false
  }
}
</script>
