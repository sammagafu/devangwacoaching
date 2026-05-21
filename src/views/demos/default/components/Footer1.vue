<template>
  <footer :class="homeMode ? 'home-footer pt-5' : 'pt-5'">
    <b-container>
      <hr class="mt-4 mb-0">

      <div class="py-3">
        <b-container class="px-0">
          <div class="d-lg-flex justify-content-between align-items-center py-3 text-center text-md-left">
            <div :class="homeMode ? '' : 'text-body text-primary-hover'">
              <template v-if="homeMode">
                {{ t.footer.copyright }}{{ currentYear }} {{ t.footer.rights }}
                {{ t.footer.builtBy }}
              </template>
              <template v-else>
                Copyrights ©{{ currentYear }} Devangwa Coaching. Build by
              </template>
              <a :href="developedByLink" target="_blank" :class="homeMode ? '' : 'text-body'">{{ developedBy }}</a>
            </div>
            <div class="justify-content-center mt-3 mt-lg-0">
              <ul class="nav list-inline justify-content-center mb-0">
                <router-link class="list-inline-item nav-link" :to="{ name: 'demos.default' }">
                  {{ homeMode ? t.footer.home : 'Home' }}
                </router-link>
                <router-link class="list-inline-item nav-link" :to="{ name: 'TermsOfUse' }">
                  {{ homeMode ? t.footer.terms : 'Terms of use' }}
                </router-link>
                <router-link class="list-inline-item nav-link" :to="{ name: 'PrivacyPolicy' }">
                  {{ homeMode ? t.footer.privacy : 'Privacy policy' }}
                </router-link>
              </ul>
            </div>
          </div>
        </b-container>
      </div>
    </b-container>
  </footer>
</template>

<script setup lang="ts">
import { currentYear, developedByLink, developedBy } from '@/helpers/constants'
import { useHomeLocale } from '@/composables/useHomeLocale'

defineProps({
  homeMode: { type: Boolean, default: false },
})

const { t } = useHomeLocale()
</script>
