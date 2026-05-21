<template>
  <li class="nav-item ms-0 ms-sm-2 d-none d-sm-block">
    <router-link
      :to="{ name: 'shop.cart' }"
      class="btn btn-light btn-round mb-0 flex-centered position-relative"
      aria-label="View cart"
    >
      <BIconCart3 class="fa-fw" />
      <span
        v-if="cartCount > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary"
      >
        {{ cartCount > 9 ? '9+' : cartCount }}
      </span>
    </router-link>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { BIconCart3 } from 'bootstrap-icons-vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.cartItems.length)
</script>
