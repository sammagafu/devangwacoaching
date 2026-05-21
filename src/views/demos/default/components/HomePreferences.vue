<template>
  <div class="home-prefs" role="toolbar" aria-label="Site preferences">
    <div class="home-prefs__switch" role="group" aria-label="Language">
      <button
        type="button"
        class="home-prefs__option"
        :class="{ 'is-active': locale === 'en' }"
        :aria-pressed="locale === 'en'"
        @click="setLocale('en')"
      >
        EN
      </button>
      <button
        type="button"
        class="home-prefs__option"
        :class="{ 'is-active': locale === 'sw' }"
        :aria-pressed="locale === 'sw'"
        @click="setLocale('sw')"
      >
        SW
      </button>
    </div>

    <div class="home-prefs__switch" role="group" aria-label="Theme">
      <button
        type="button"
        class="home-prefs__option home-prefs__option--icon"
        :class="{ 'is-active': isLight }"
        :aria-pressed="isLight"
        :aria-label="isLight ? 'Light mode active' : 'Switch to light mode'"
        @click="setTheme('light')"
      >
        <BIconSunFill />
      </button>
      <button
        type="button"
        class="home-prefs__option home-prefs__option--icon"
        :class="{ 'is-active': isDark }"
        :aria-pressed="isDark"
        :aria-label="isDark ? 'Dark mode active' : 'Switch to dark mode'"
        @click="setTheme('dark')"
      >
        <BIconMoonStarsFill />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BIconSunFill, BIconMoonStarsFill } from 'bootstrap-icons-vue'
import { useHomeLocale } from '@/composables/useHomeLocale'
import { useLayoutStore } from '@/stores/layout'

const { locale, setLocale } = useHomeLocale()
const layoutStore = useLayoutStore()

const isLight = computed(() => layoutStore.theme === 'light')
const isDark = computed(() => layoutStore.theme === 'dark')

const setTheme = (theme) => layoutStore.setTheme(theme)
</script>
