import { currency } from '@/helpers/constants'
import defaultCourseImg from '@/assets/images/about/01.jpg'

const DEFAULT_IMAGE = defaultCourseImg

export function formatPrice(amount) {
  const value = Number(amount) || 0
  if (value <= 0) return 'Free'
  return `${currency}${value.toLocaleString()}`
}

export function courseImage(course) {
  return course?.image || course?.cover || DEFAULT_IMAGE
}

export function truncate(text, max = 120) {
  if (!text) return ''
  const plain = String(text).replace(/<[^>]*>/g, '')
  return plain.length <= max ? plain : `${plain.slice(0, max).trim()}…`
}
