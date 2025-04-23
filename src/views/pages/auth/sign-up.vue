<template>
  <main>
    <section class="p-0 d-flex align-items-center position-relative overflow-hidden">
      <b-container fluid>
        <b-row>
          <b-col cols="12" lg="6"
            class="d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
            <div class="p-3 p-lg-5">
              <div class="text-center">
                <h2 class="fw-bold">Join our largest community</h2>
                <p class="mb-0 h6 fw-light">Create an account to start learning today!</p>
              </div>
              <img :src="element02" class="mt-5" alt="">  
            </div>
          </b-col>

          <b-col cols="12" lg="6" class="m-auto">
            <b-row class="my-5">
              <b-col sm="10" xl="8" class="m-auto">
                <span class="mb-0 fs-1">🎉</span>
                <h1 class="fs-2">Sign Up for Devangwa Coaching</h1>
                <p class="lead mb-4">Create your account to get started.</p>

                <b-form @submit.prevent="registerUser">
                  <div v-if="error.length > 0" class="mb-4 text-danger">{{ error }}</div>
                  
                  <div class="mb-4">
                    <label class="form-label">Account Type *</label>
                    <div class="d-flex gap-3">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" 
                          v-model="credentials.usertype" id="individual" value="individual">
                        <label class="form-check-label" for="individual">Individual</label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" 
                          v-model="credentials.usertype" id="company" value="company">
                        <label class="form-check-label" for="company">Company</label>
                      </div>
                    </div>
                  </div>

                  <div class="mb-4">
                    <b-form-group label="Full Name *">
                      <b-input-group size="lg">
                        <template #prepend>
                          <span class="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                            <font-awesome-icon :icon="faUser" />
                          </span>
                        </template>
                        <b-form-input type="text" class="border-0 bg-light rounded-end ps-1" 
                          placeholder="Full Name" v-model="credentials.fullname" id="fullname-input" />
                      </b-input-group>
                    </b-form-group>
                  </div>

                  <div class="mb-4">
                    <b-form-group label="Phone Number *">
                      <b-input-group size="lg">
                        <template #prepend>
                          <span class="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                            <font-awesome-icon :icon="faPhone" />
                          </span>
                        </template>
                        <b-form-input type="tel" class="border-0 bg-light rounded-end ps-1" 
                          placeholder="Phone Number" v-model="credentials.phonenumber" id="phonenumber-input" />
                      </b-input-group>
                    </b-form-group>
                  </div>

                  <div class="mb-4">
                    <b-form-group label="Email address *">
                      <b-input-group size="lg">
                        <template #prepend>
                          <span class="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                            <BIconEnvelopeFill />
                          </span>
                        </template>
                        <b-form-input type="email" class="border-0 bg-light rounded-end ps-1" 
                          placeholder="E-mail" v-model="credentials.email" id="username-input" />
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
                        <b-form-input :type="showPassword ? 'text' : 'password'" 
                          class="border-0 bg-light rounded-end ps-1" 
                          placeholder="*********" v-model="credentials.password" />
                        <template #append>
                          <span class="input-group-text bg-light rounded-end border-0 text-secondary px-3 cursor-pointer" 
                            @click="togglePassword">
                            <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" />
                          </span>
                        </template>
                      </b-input-group>
                    </b-form-group>
                    <div id="passwordHelpBlock" class="form-text">
                      Your password must be at least 8 characters
                    </div>
                  </div>

                  <div class="align-items-center mt-0">
                    <div class="d-grid">
                      <b-button variant="primary" class="mb-0" type="submit" :disabled="loading">Sign Up</b-button>
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
                      Sign up with Google
                    </a>
                  </b-col>
                  <b-col xxl="6" class="d-grid">
                    <a href="#" class="btn bg-facebook mb-0 flex-centered">
                      <font-awesome-icon :icon="faFacebookF" class="fa-fw me-2" />
                      Sign up with Facebook
                    </a>
                  </b-col>
                </b-row>

                <div class="mt-4 text-center">
                  <span>Already have an account? 
                    <router-link :to="{ name: 'auth.sign-in' }">Login here</router-link>
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
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import authService from '@/services/authService';
import element02 from '@/assets/images/element/02.svg';
import { faLock, faEye, faEyeSlash, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { BIconEnvelopeFill } from 'bootstrap-icons-vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
const router = useRouter();

const credentials = reactive({
  fullname: '',
  phonenumber: '',
  usertype: '',
  email: '',
  password: '',
});

const error = ref('');
const loading = ref(false);
const showPassword = ref(false);

const is_individual = computed(() => credentials.usertype === 'individual');
const is_company = computed(() => credentials.usertype === 'company');

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const validateForm = () => {
  if (!credentials.usertype) {
    error.value = 'Please select an account type';
    return false;
  }
  if (!credentials.fullname) {
    error.value = 'Full name is required';
    return false;
  }
  if (!credentials.phonenumber) {
    error.value = 'Phone number is required';
    return false;
  }
  if (!/^\+?[\d\s-]{10,}$/.test(credentials.phonenumber)) {
    error.value = 'Please enter a valid phone number';
    return false;
  }
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

const registerUser = async () => {
  try {
    console.log('Form submitted, validating...');
    if (!validateForm()) {
      console.log('Validation failed:', error.value);
      $toast.error(error.value);
      return;
    }

    console.log('Validation passed, proceeding with registration...');
    console.log('Registration payload:', {
      full_name: credentials.fullname,
      phonenumber: credentials.phonenumber,
      email: credentials.email,
      password: credentials.password,
      is_individual: is_individual.value,
      is_company: is_company.value,
    });

    loading.value = true;
    error.value = '';

    await authService.register({
      full_name: credentials.fullname,
      phonenumber: credentials.phonenumber,
      email: credentials.email,
      password: credentials.password,
      is_individual: is_individual.value,
      is_company: is_company.value,
    });

    $toast.success('Registration successful! Please log in.');
    router.push({ name: 'auth.sign-in' });
  } catch (error) {
    console.error('Error registering user:', error);
    const errorMessage = error.detail || error.message || Object.values(error)[0] || 'Registration failed. Please try again.';
    error.value = errorMessage;
    $toast.error(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.flex-centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-check {
  margin-bottom: 0;
}

.form-check-label {
  cursor: pointer;
}
</style>