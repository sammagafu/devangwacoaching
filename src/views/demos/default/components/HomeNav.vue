<template>
  <header class="home-nav home-nav--fixed" :class="{ 'home-nav--scrolled': isScrolled }">
    <b-container fluid="lg">
      <nav class="navbar navbar-expand-lg home-nav__bar px-0">
        <LogoBox logo-class="home-nav__logo" />
        <MobileNavbarToggler class="d-lg-none ms-auto" />

        <b-collapse id="navbarCollapse" class="navbar-collapse" is-nav>
          <ul class="navbar-nav home-nav__links mx-lg-auto">
            <li v-for="link in navLinks" :key="link.key" class="nav-item">
              <component
                :is="link.to ? 'router-link' : 'a'"
                v-bind="linkProps(link)"
                class="nav-link home-nav__link"
                active-class="is-active"
              >
                {{ link.label }}
              </component>
            </li>
          </ul>

          <ul class="navbar-nav home-nav__actions ms-lg-3 align-items-lg-center gap-lg-2">
            <li class="nav-item d-none d-lg-block">
              <HomePreferences />
            </li>
            <template v-if="authStore.isAuthenticated">
              <li class="nav-item">
                <router-link :to="{ name: 'student.dashboard' }" class="nav-link home-nav__link">
                  {{ t.nav.dashboard }}
                </router-link>
              </li>
              <ProfileDropdown className="nav-item" />
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link :to="{ name: 'auth.sign-in' }" class="nav-link home-nav__link">
                  {{ t.nav.signIn }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'auth.sign-up' }" class="btn btn-dw-primary btn-sm mb-0">
                  {{ t.nav.getStarted }}
                </router-link>
              </li>
            </template>
          </ul>
        </b-collapse>
      </nav>

      <div class="d-lg-none pb-3">
        <HomePreferences />
      </div>
    </b-container>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import LogoBox from '@/components/LogoBox.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import MobileNavbarToggler from '@/components/MobileNavbarToggler.vue'
import HomePreferences from '@/views/demos/default/components/HomePreferences.vue'
import { useHomeLocale } from '@/composables/useHomeLocale'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { t } = useHomeLocale()

const navLinks = computed(() => [
  { key: 'home', label: t.value.nav.home, to: { name: 'demos.default' } },
  { key: 'approach', label: t.value.nav.approach, href: '#home-about' },
  { key: 'programmes', label: t.value.nav.programmes, to: { name: 'courses' } },
  { key: 'testimonials', label: t.value.nav.testimonials, href: '#client-reviews' },
])

const linkProps = (link) => (link.to ? { to: link.to } : { href: link.href })

const isScrolled = ref(false)

const onScroll = () => {
  isScrolled.value = window.scrollY > 16
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.home-nav--fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  background: color-mix(in srgb, var(--dw-surface-elevated, #fff) 88%, transparent);
  border-bottom: 1px solid transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    backdrop-filter 0.35s ease;
  animation: dw-nav-enter 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.home-nav--fixed.home-nav--scrolled {
  background: color-mix(in srgb, var(--dw-surface-elevated, #fff) 94%, transparent);
  border-bottom-color: var(--dw-border, rgba(26, 43, 66, 0.08));
  box-shadow: var(--dw-shadow, 0 4px 24px rgba(26, 43, 66, 0.08));
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

@media (prefers-reduced-motion: reduce) {
  .home-nav--fixed {
    animation: none;
  }
}

.home-nav__bar {
  padding: 0.85rem 0;
}

.home-nav :deep(.home-nav__logo .brand-lockup__logo),
.home-nav :deep(.home-nav__logo .navbar-brand-item) {
  height: 2.15rem !important;
  max-width: 190px;
}

.home-nav__link {
  font-weight: 500;
  font-size: 0.9375rem;
  padding: 0.35rem 0.75rem !important;
  transition: color 0.25s ease, transform 0.25s ease;
}

@media (prefers-reduced-motion: no-preference) {
  .home-nav__link:hover {
    transform: translateY(-1px);
  }
}


@media (max-width: 991.98px) {
  .home-nav :deep(.navbar-collapse) {
    padding-top: 0.75rem;
    margin-top: 0.5rem;
    border-top: 1px solid var(--dw-border);
  }

  .home-nav__actions .btn {
    width: 100%;
  }
}
</style>
