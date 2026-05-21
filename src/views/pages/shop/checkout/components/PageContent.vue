<template>
  <section class="pt-5">
    <b-container>
      <div v-if="!cartStore.cartItems.length && !checkingCart" class="text-center py-5">
        <h4>Nothing to checkout</h4>
        <p class="text-muted">Your cart is empty. Add a course first.</p>
        <router-link :to="{ name: 'courses' }" class="btn btn-primary">Browse courses</router-link>
      </div>

      <b-row v-else class="g-4 g-sm-5">
        <b-col xl="8" class="mb-4 mb-sm-0">
          <b-alert v-if="!authStore.isAuthenticated" variant="warning" show class="mb-4">
            Please
            <router-link :to="{ name: 'auth.sign-in', query: { redirectedFrom: '/checkout' } }">sign in</router-link>
            to complete checkout.
          </b-alert>
          <b-card no-body class="card-body shadow p-4">
            <h5 class="mb-4">Checkout</h5>
            <PaymentForm
              :cart-items="cartStore.cartItems"
              :total-amount="totalAmount"
              @success="handleCheckoutSuccess"
              @error="handleCheckoutError"
              @confirm="handleCheckout"
            />
          </b-card>
        </b-col>
        <OrderSummary />
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import courseService from '@/services/courseService'
import { api } from '@/services/authService'
import PaymentForm from '@/components/PaymentForm.vue'
import OrderSummary from '@/views/pages/shop/checkout/components/OrderSummary.vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['clear-cart'])

const router = useRouter()
const $toast = useToast()
const cartStore = useCartStore()
const authStore = useAuthStore()
const isProcessing = ref(false)
const checkingCart = ref(true)

const totalAmount = computed(() =>
  cartStore.cartItems.reduce((sum, item) => sum + (Number(item.final_price) || 0), 0)
)

const checkEnrollmentStatus = async (items) => {
  if (!authStore.isAuthenticated || !items?.length) return true
  try {
    const courseSlugs = items.filter((i) => i.type === 'course').map((i) => i.slug)
    if (courseSlugs.length) {
      const enrolled = await courseService.fetchEnrolled()
      const enrolledSlugs = enrolled.map((e) => e.course?.slug || e.slug).filter(Boolean)
      if (courseSlugs.some((slug) => enrolledSlugs.includes(slug))) {
        $toast.error('You are already enrolled in a course in your cart.')
        router.push({ name: 'student.course' })
        return false
      }
    }
    return true
  } catch {
    return true
  }
}

onMounted(async () => {
  await cartStore.fetchCartItems()
  checkingCart.value = false
  if (cartStore.cartItems.length) {
    await checkEnrollmentStatus(cartStore.cartItems)
  }
})

watch(
  () => cartStore.cartItems,
  async (items) => {
    if (items?.length) await checkEnrollmentStatus(items)
  }
)

const handleCheckoutSuccess = () => {
  cartStore.clearCart()
  $toast.success('Enrollment complete!')
  router.push({ name: 'student.dashboard' })
}

const handleCheckoutError = (message) => {
  $toast.error(typeof message === 'string' ? message : 'Checkout failed.')
}

const handleCheckout = async (paymentData) => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'auth.sign-in', query: { redirectedFrom: '/checkout' } })
    return
  }
  if (isProcessing.value) return
  isProcessing.value = true

  try {
    for (const item of cartStore.cartItems) {
      if (item.type === 'course') {
        await courseService.enroll(item.slug, { ...paymentData, final_price: item.final_price })
      } else if (item.type === 'event') {
        const body =
          item.final_price <= 0
            ? {}
            : {
                payment_method: paymentData.payment_method,
                phone_number: paymentData.phone_number,
                card_number: paymentData.card_number,
              }
        await api.post(`coaching/events/${item.slug}/attend/`, body)
      }
    }
    handleCheckoutSuccess()
  } catch (err) {
    const detail = err.response?.data?.detail
    handleCheckoutError(
      typeof detail === 'string' ? detail : 'Checkout failed. Please try again.'
    )
  } finally {
    isProcessing.value = false
  }
}
</script>
