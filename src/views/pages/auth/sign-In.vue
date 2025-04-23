<template>
  <main>
    <section class="p-0 d-flex align-items-center position-relative overflow-hidden">
      <b-container fluid>
        <b-row>
          <b-col cols="12" lg="6"
            class="d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
            <div class="p-3 p-lg-5">
              <div class="text-center">
                <h2 class="fw-bold">Welcome to our largest community</h2>
                <p class="mb-0 h6 fw-light">Let's learn something new today!</p>
              </div>
              <img :src="element02" class="mt-5" alt="">  
            </div>
          </b-col>

          <b-col cols="12" lg="6" class="m-auto">
            <b-row class="my-5">
              <b-col sm="10" xl="8" class="m-auto">
                <span class="mb-0 fs-1">👋</span>
                <h1 class="fs-2">Login into Devangwa Coaching</h1>
                <p class="lead mb-4">Nice to see you! Please log in with your account.</p>

                <b-form @submit.prevent="handleSignIn">
                  <div v-if="error.length > 0" class="mb-4 text-danger">{{ error }}</div>
                  <div class="mb-4">
                    <b-form-group label="Email address *">
                      <b-input-group size="lg">
                        <template #prepend>
                          <span class="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                            <BIconEnvelopeFill />
                          </span>
                        </template>
                        <b-form-input type="email" class="border-0 bg-light rounded-end ps-1" placeholder="E-mail"
                          v-model="credentials.email" id="username-input" />
                      </b-input-group>
                    </b-form-group>
                  </div>
                  <div class="mb-4">
                    <b-form-group label="Password *">
                      <b-input-group size="lg">
                        <template #prepend>
                          <span class="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                            <font-awesome-icon :icon="faLock" />
                          </span>
                        </template>
                        <b-form-input :type="showPassword ? 'text' : 'password'" class="border-0 bg-light rounded-end ps-1" placeholder="*********"
                          v-model="credentials.password" />
                        <template #append>
                          <span class="input-group-text bg-light rounded-end border-0 text-secondary px-3 cursor-pointer" @click="togglePassword">
                            <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" />
                          </span>
                        </template>
                      </b-input-group>
                    </b-form-group>
                    <div id="passwordHelpBlock" class="form-text">
                      Your password must be 8 characters at least
                    </div>
                  </div>
                  <div class="mb-4 d-flex justify-content-between">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="checked">
                      <label class="form-check-label" for="exampleCheck1">Remember me</label>
                    </div>
                    <div class="text-primary-hover">
                      <router-link :to="{ name: 'auth.forgot-password' }" class="text-secondary">
                        <u>Forgot password?</u>
                      </router-link>
                    </div>
                  </div>
                  <div class="align-items-center mt-0">
                    <div class="d-grid">
                      <b-button variant="primary" class="mb-0" type="submit" :disabled="loading">Login</b-button>
                    </div>
                  </div>
                </b-form>

                <b-row>
                  <div class="position-relative my-4">
                    <hr>
                    <p class="small position-absolute top-50 start-50 translate-middle bg-body px-5">Or</p>
                  </div>

                  <b-col xxl="6" class="d-grid">
                    <a href="#" class="btn bg-google mb-2 mb-xxl-0 flex-centered">
                      <font-awesome-icon :icon="faGoogle" class="fa-fw text-white me-2" />
                      Login with Google
                    </a>
                  </b-col>
                  <b-col xxl="6" class="d-grid">
                    <a href="#" class="btn bg-facebook mb-0 flex-centered">
                      <font-awesome-icon :icon="faFacebookF" class="fa-fw me-2" />
                      Login with Facebook
                    </a>
                  </b-col>
                </b-row>
                <div class="mt-4 text-center">
                  <span>Don't have an account? 
                    <router-link :to="{ name: 'auth.sign-up' }">Signup here</router-link>
                  </span>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import element02 from '@/assets/images/element/02.svg';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { BIconEnvelopeFill } from 'bootstrap-icons-vue';

const router = useRouter();
const authStore = useAuthStore();

const credentials = reactive({
  email: '',
  password: '',
});

const error = ref('');
const checked = ref(false);
const loading = ref(false);
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const validateForm = () => {
  if (!credentials.email) {
    error.value = 'Email is required';
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
    error.value = 'Please enter a valid email';
    return false;
  }
  if (!credentials.password) {
    error.value = 'Password is required';
    return false;
  }
  if (credentials.password.length < 8) {
    error.value = 'Password must be at least 8 characters';
    return false;
  }
  return true;
};

const handleSignIn = async () => {
  try {
    console.log('Form submitted, validating...');
    if (!validateForm()) {
      console.log('Validation failed:', error.value);
      return;
    }

    console.log('Validation passed, proceeding with login...');
    loading.value = true;
    error.value = '';

    await authStore.login(
      {
        email: credentials.email,
        password: credentials.password,
      },
      checked.value
    );

    console.log('Login successful, user stored in Pinia:', authStore.user);
    console.log('Is Authenticated:', authStore.isAuthenticated);

    // Add a slight delay to ensure state updates propagate
    await new Promise(resolve => setTimeout(resolve, 100));

    // Determine redirect based on user role
    let redirect;
    if (authStore.isStaff) {
      redirect = { name: 'admin.dashboard' }; // Redirect staff to admin dashboard
    } else {
      redirect = { name: 'student.dashboard' }; // Redirect others to student dashboard
    }

    // Check if there's a redirect query parameter and override if present
    const queryRedirect = router.currentRoute.value.query.redirectedFrom;
    if (queryRedirect) {
      redirect = queryRedirect;
    }

    console.log('Redirecting to:', redirect);

    // Check if the redirect route exists
    const resolvedRoute = router.resolve(redirect);
    if (!resolvedRoute.matched.length) {
      console.error('Redirect route not found, redirecting to a fallback route');
      await router.push('/');
    } else {
      await router.push(redirect);
    }
  } catch (err) {
    console.error('Login error:', err);
    if (err.message === 'Token refresh failed') {
      error.value = 'Your session has expired. Please log in again.';
    } else {
      error.value = err.detail || err.message || 'Invalid credentials';
    }
  } finally {
    loading.value = false;
  }
};
</script>