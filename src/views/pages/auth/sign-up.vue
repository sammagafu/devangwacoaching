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
              <h2 class="fw-bold">Join Devangwa Coaching</h2>
              <p class="mb-0 h6 fw-light">Create an account and start learning today.</p>
              <img :src="element02" class="mt-5 img-fluid" alt="" />
            </div>
          </b-col>

          <b-col cols="12" lg="6" class="m-auto">
            <b-row class="my-5">
              <b-col sm="10" xl="8" class="m-auto">
                <h1 class="fs-2">Create account</h1>
                <p class="lead mb-4">All fields marked with * are required.</p>

                <b-alert v-if="error" variant="danger" show class="mb-4">{{ error }}</b-alert>

                <b-form @submit.prevent="registerUser">
                  <b-form-group label="Account type *" class="mb-3">
                    <div class="d-flex gap-4">
                      <b-form-radio v-model="credentials.usertype" value="individual" name="usertype">
                        Individual
                      </b-form-radio>
                      <b-form-radio v-model="credentials.usertype" value="company" name="usertype">
                        Company
                      </b-form-radio>
                    </div>
                  </b-form-group>

                  <b-form-group label="Full name *" label-for="fullname" class="mb-3">
                    <b-form-input
                      id="fullname"
                      v-model="credentials.fullname"
                      type="text"
                      autocomplete="name"
                      placeholder="Your full name"
                      size="lg"
                      required
                    />
                  </b-form-group>

                  <b-form-group label="Phone *" label-for="phone" class="mb-3">
                    <b-form-input
                      id="phone"
                      v-model="credentials.phonenumber"
                      type="tel"
                      autocomplete="tel"
                      placeholder="+255712345678"
                      size="lg"
                      required
                    />
                    <b-form-text>Use international format, e.g. +255712345678</b-form-text>
                  </b-form-group>

                  <b-form-group label="Email *" label-for="email" class="mb-3">
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

                  <b-form-group label="Password *" label-for="password" class="mb-3">
                    <b-input-group size="lg">
                      <b-form-input
                        id="password"
                        v-model="credentials.password"
                        :type="showPassword ? 'text' : 'password'"
                        autocomplete="new-password"
                        placeholder="At least 8 characters"
                        minlength="8"
                        required
                      />
                      <template #append>
                        <b-button
                          variant="light"
                          @click="showPassword = !showPassword"
                          :aria-label="showPassword ? 'Hide password' : 'Show password'"
                        >
                          <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" />
                        </b-button>
                      </template>
                    </b-input-group>
                  </b-form-group>

                  <div class="d-grid">
                    <b-button variant="primary" type="submit" size="lg" :disabled="loading">
                      <b-spinner v-if="loading" small class="me-2" />
                      {{ loading ? 'Creating account…' : 'Sign up' }}
                    </b-button>
                  </div>
                </b-form>

                <p class="mt-4 text-center mb-0">
                  Already have an account?
                  <router-link :to="{ name: 'auth.sign-in' }">Sign in</router-link>
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
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import authService from '@/services/authService'
import element02 from '@/assets/images/element/02.svg'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

/** Tanzania / Kenya E.164 (+255… or +254…) */
const PHONE_REGEX = /^\+25[45]\d{8,9}$/

const router = useRouter()
const $toast = useToast()
const credentials = reactive({
  fullname: '',
  phonenumber: '',
  usertype: 'individual',
  email: '',
  password: '',
})

const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

const is_individual = computed(() => credentials.usertype === 'individual')
const is_company = computed(() => credentials.usertype === 'company')

const validateForm = () => {
  if (!credentials.usertype) {
    error.value = 'Please select an account type.'
    return false
  }
  if (!credentials.fullname.trim()) {
    error.value = 'Full name is required.'
    return false
  }
  let phone = credentials.phonenumber.trim()
  if (!phone.startsWith('+')) {
    phone = phone.startsWith('0') ? `+255${phone.slice(1)}` : `+255${phone}`
    credentials.phonenumber = phone
  }
  if (!PHONE_REGEX.test(phone)) {
    error.value = 'Enter a valid phone number (e.g. +255712345678 or +254712345678).'
    return false
  }
  if (!credentials.email.trim()) {
    error.value = 'Email is required.'
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email.trim())) {
    error.value = 'Enter a valid email address.'
    return false
  }
  if (!credentials.password || credentials.password.length < 8) {
    error.value = 'Password must be at least 8 characters.'
    return false
  }
  return true
}

const registerUser = async () => {
  error.value = ''
  if (!validateForm()) return

  loading.value = true
  try {
    await authService.register({
      full_name: credentials.fullname.trim(),
      phonenumber: credentials.phonenumber.trim(),
      email: credentials.email.trim(),
      password: credentials.password,
      is_individual: is_individual.value,
      is_company: is_company.value,
    })
    $toast.success('Account created. Please sign in.')
    router.push({ name: 'auth.sign-in', query: { registered: '1' } })
  } catch (err) {
    const data = err?.response?.data ?? err
    const fieldMsg =
      data?.phonenumber?.[0] ||
      data?.email?.[0] ||
      data?.password?.[0] ||
      data?.full_name?.[0]
    const firstField =
      data && typeof data === 'object' && !fieldMsg
        ? Object.values(data).flat?.()?.[0] || Object.values(data)[0]
        : null
    error.value =
      fieldMsg ||
      data?.detail ||
      (Array.isArray(firstField) ? firstField[0] : firstField) ||
      data?.message ||
      'Registration failed. Please try again.'
    $toast.error(error.value)
  } finally {
    loading.value = false
  }
}
</script>
