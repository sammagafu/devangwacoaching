<template>
  <footer class="pt-5">
    <b-container> 
      <hr class="mt-4 mb-0">

      <div class="py-3">
        <b-container class="px-0">
          <div class="d-lg-flex justify-content-between align-items-center py-3 text-center text-md-left">
            <div class="text-body text-primary-hover"> Copyrights ©{{ currentYear }} Devangwa Coaching. Build by
              <a :href="developedByLink" target="_blank" class="text-body">{{ developedBy }}</a>
            </div>
            <div class="justify-content-center mt-3 mt-lg-0">
              <ul class="nav list-inline justify-content-center mb-0">
                <ul class="nav list-inline justify-content-center mb-0">
                <router-link class="list-inline-item nav-link" :to="{name:'index'}">Home</router-link>
                <router-link class="list-inline-item nav-link" :to="{name:'TermsOfUse'}">Terms of use</router-link>
                <router-link class="list-inline-item nav-link" :to="{name:'PrivacyPolicy'}">Privacy policy</router-link>
              </ul>
              </ul>
            </div>
          </div>
        </b-container>
      </div>
    </b-container>
  </footer>
</template>
<script setup lang="ts">
import { currentYear, developedByLink, developedBy } from '@/helpers/constants';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


const socialLink = [
  { icon: faFacebookF, class: 'text-facebook' },
  { icon: faInstagram, class: 'text-instagram' },
  { icon: faTwitter, class: 'text-twitter' },
  { icon: faLinkedinIn, class: 'text-linkedin' },
];
</script>