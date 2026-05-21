<template>
  <section class="pt-5">
    <b-container>
      <b-row class="g-4 g-sm-5">
        <b-col lg="8">
          <b-card no-body class="card-body p-4 shadow">
            <div v-if="cartStore.isLoading" class="text-center py-5">
              <b-spinner variant="primary" />
              <p class="mt-3 text-muted mb-0">Updating cart…</p>
            </div>

            <div v-else-if="!cartStore.cartItems.length" class="text-center py-5">
              <BIconCart3 class="display-4 text-muted mb-3" />
              <h5>Your cart is empty</h5>
              <p class="text-muted">Browse courses and add one to get started.</p>
              <router-link :to="{ name: 'courses' }" class="btn btn-primary">Explore courses</router-link>
            </div>

            <div v-else>
              <h4 class="mb-4">Cart items ({{ cartStore.cartItems.length }})</h4>
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col" class="text-center">Price</th>
                      <th scope="col" class="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cartStore.cartItems" :key="`${item.type}-${item.slug}`">
                      <td>
                        <div class="d-flex align-items-center gap-3">
                          <img
                            :src="item.image"
                            class="rounded"
                            width="80"
                            height="60"
                            alt=""
                            style="object-fit: cover;"
                          >
                          <div>
                            <h6 class="mb-1">
                              <router-link
                                v-if="item.type === 'course'"
                                :to="{ name: 'course.detail', params: { slug: item.slug } }"
                              >
                                {{ item.title }}
                              </router-link>
                              <span v-else>{{ item.title }}</span>
                            </h6>
                            <span class="badge bg-light text-dark text-capitalize">{{ item.type }}</span>
                          </div>
                        </div>
                      </td>
                      <td class="text-center">
                        <span class="fw-bold" :class="item.final_price <= 0 ? 'text-success' : 'text-primary'">
                          {{ formatPrice(item.final_price) }}
                        </span>
                      </td>
                      <td class="text-end">
                        <b-button
                          variant="outline-danger"
                          size="sm"
                          @click="cartStore.removeFromCart(item.slug, item.type)"
                        >
                          Remove
                        </b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-between mt-4">
                <router-link :to="{ name: 'courses' }" class="btn btn-light">Continue shopping</router-link>
                <b-button variant="outline-secondary" @click="cartStore.clearCart">Clear cart</b-button>
              </div>
            </div>
          </b-card>
        </b-col>

        <b-col lg="4">
          <b-card no-body class="card-body p-4 shadow sticky-lg-top" style="top: 100px;">
            <h4 class="mb-3">Order summary</h4>
            <ul class="list-group list-group-borderless mb-3">
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span>Subtotal</span>
                <span class="fw-bold">{{ formatPrice(subtotal) }}</span>
              </li>
            </ul>
            <div class="d-grid gap-2">
              <router-link
                :to="{ name: 'shop.checkout' }"
                class="btn btn-lg btn-success"
                :class="{ disabled: !cartStore.cartItems.length }"
              >
                Proceed to checkout
              </router-link>
            </div>
            <p class="small text-muted mt-3 mb-0 text-center">
              Secure checkout. You can enroll in free courses without payment.
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { BIconCart3 } from 'bootstrap-icons-vue'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/helpers/format'

const cartStore = useCartStore()

const subtotal = computed(() =>
  cartStore.cartItems.reduce((sum, item) => sum + (Number(item.final_price) || 0), 0)
)

onMounted(() => cartStore.fetchCartItems())
</script>
