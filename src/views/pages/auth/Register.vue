<template>
  <div class="pt-12">
    <div class="bg-gray-100 w-1/2 py-16 px-24 mx-auto text-gray-800 shadow-md rounded-lg">
      <img src="@/assets/images/logo/devangwa-logo.svg" alt="Devangwa Logo">
      <h2 class="text-center py-4">Welcome to PAT Learning Management System. <br> Already have an account? <router-link
          :to="{ name: 'login' }" class="text-sky-600">Login</router-link>
      </h2>
      <form @submit.prevent="registerUser">
        <div class="flex flex-col gap-2">
          <label for="fullname">Enter your full-name</label>
          <InputText id="fullname" v-model="fullname" aria-describedby="email-help" type="text" size="large"
            placeholder="Mwajuma Hamis" />
          <small class="p-invalid" v-if="submitted && !fullname">Course price is required.</small>
        </div>


        <!-- Email input -->
        <div class="flex flex-col gap-2">
          <label for="email">Enter email</label>
          <InputText id="email" v-model="email" aria-describedby="email-help" type="email" size="large"
            placeholder="mwajuma@gmail.com" />
          <small class="p-invalid" v-if="submitted && !email">E-mail is required.</small>
        </div>

        <!-- Password input -->
        <div class="flex flex-col gap-2 my-2">
          <label for="password">Enter password</label>
          <Password v-model="password" toggleMask size="large" placeholder="........" />
          <small class="p-invalid" v-if="submitted && !password">Password price is required.</small>
        </div>

        <div class="py-2">
          <label for="phone">Phone Number </label>
          <InputText id="phone" type="phonenumber"
            class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="+2557884111111" v-model="phonenumber" />
          <p class="text-xs text-gray-400">start with +255 or any country code</p>
        </div>

        <div class="py-2">
          <label for="whoareyou">Who are you </label>
          <div class="flex flex-wrap gap-4 py-4">
            <div class="flex items-center">
              <RadioButton v-model="whoareyou" inputId="ingredient1" name="usertype" value="company" />
              <label for="ingredient1" class="ml-2">Company</label>
            </div>
            <div class="flex items-center">
              <RadioButton v-model="whoareyou" inputId="ingredient2" name="usertype" value="individual" />
              <label for="ingredient2" class="ml-2">individual</label>
            </div>
          </div>
        </div>



        <!-- Submit button -->
        <button type="submit"
          class="inline-block px-7 py-3 bg-devanga-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true" data-mdb-ripple-color="light">
          Register User
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import RadioButton from 'primevue/radiobutton';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'; // Import your auth store
import apiService from '@/service/apiService'; // Import your API service


const router = useRouter();
const email = ref('');
const fullname = ref('');
const phonenumber = ref('');
const usertype = ref("")
const is_individual = computed(() => whoareyou.value === 'individual');
const is_company = computed(() => whoareyou.value === 'company');
const password = ref('');
const whoareyou = ref(false);
const authStore = useAuthStore();

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const registerUser = async () => {
  try {
    const response = await apiService.post('auth/users/', {
      full_name: fullname.value,
      phonenumber: phonenumber.value,
      email: email.value,
      password: password.value,
      is_individual: is_individual.value,
      is_company: is_company.value,
    });

  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error, such as displaying a message to the user
  }
  router.push({ name: 'login' });
};





</script>