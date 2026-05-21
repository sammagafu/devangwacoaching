import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { homeMessages, type HomeLocale } from '@/i18n/home'

const locale = useLocalStorage<HomeLocale>('devangwa_home_locale', 'en')

export function useHomeLocale() {
  const t = computed(() => homeMessages[locale.value])

  const setLocale = (next: HomeLocale) => {
    locale.value = next
  }

  const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'sw' : 'en'
  }

  return {
    locale,
    t,
    setLocale,
    toggleLocale,
  }
}
