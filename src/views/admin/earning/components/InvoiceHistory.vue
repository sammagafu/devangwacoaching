<template>
  <b-card no-body class="bg-transparent border">
    <b-card-header class="bg-light border-bottom">
      <h5 class="mb-0">Invoice History</h5>
    </b-card-header>
    <b-card-body class="pb-0">
      <div class="table-responsive border-0 mb-0">
        <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
          <thead>
            <tr>
              <th scope="col" class="border-0 rounded-start">Invoice ID</th>
              <th scope="col" class="border-0">Title</th>
              <th scope="col" class="border-0">Date</th>
              <th scope="col" class="border-0">Payment Method</th>
              <th scope="col" class="border-0">Amount</th>
              <th scope="col" class="border-0">Status</th>
              <th scope="col" class="border-0 rounded-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in payments" :key="item.order_tracking_id">
              <td>{{ item.order_tracking_id }}</td>
              <td>
                <h6 class="table-responsive-title mb-0"><a href="#">{{ item.content_object_title }}</a></h6>
              </td>
              <td>{{ formatDate(item.created_at) }}</td>
              <td>{{ item.payment_method_display }}</td>
              <td>{{ currency }}{{ item.amount.toFixed(2) }}
                <a href="#" class="h6 mb-0 icons-center" role="button" id="dropdownShare1" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <BIconInfoCircleFill />
                </a>
                <ul class="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded"
                  aria-labelledby="dropdownShare1">
                  <li>
                    <div class="d-flex justify-content-between">
                      <span class="small">Commission</span>
                      <span class="h6 mb-0 small">{{ currency }}{{ (item.amount * 0.25).toFixed(2) }}</span>
                    </div>
                    <hr class="my-1">
                  </li>
                  <li>
                    <div class="d-flex justify-content-between">
                      <span class="small">Earning</span>
                      <span class="h6 mb-0 small">{{ currency }}{{ (item.amount * 0.75).toFixed(2) }}</span>
                    </div>
                  </li>
                </ul>
              </td>
              <td>
                <div class="badge bg-opacity-10"
                  :class="item.status === 'succeeded' ? 'bg-success text-success' : item.status === 'failed' ? 'bg-danger text-danger' : 'bg-orange text-orange'">
                  {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
                </div>
              </td>
              <td>
                <a href="#" class="btn btn-primary-soft btn-round me-1 mb-1 mb-md-0" v-b-tooltip.hover.top="'Download'">
                  <BIconDownload />
                </a>
              </td>
            </tr>
            <tr v-if="!payments.length">
              <td colspan="7" class="text-center">No payments found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card-body>
    <b-card-footer class="bg-transparent" v-if="totalPages > 1">
      <div class="d-sm-flex justify-content-sm-between align-items-sm-center">
        <p class="mb-0 text-center text-sm-start">Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalPayments) }} of {{ totalPayments }} entries</p>
        <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
          <ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
            <li class="page-item mb-0" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"><font-awesome-icon :icon="faAngleLeft" /></a>
            </li>
            <li class="page-item mb-0" v-for="page in visiblePages" :key="page" :class="{ active: page === currentPage }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item mb-0" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)"><font-awesome-icon :icon="faAngleRight" /></a>
            </li>
          </ul>
        </nav>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { currency } from '@/helpers/constants';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { BIconInfoCircleFill, BIconDownload } from 'bootstrap-icons-vue';

const $toast = useToast();
const payments = ref([]);
const totalPayments = ref(0);
const totalPages = ref(1);
const currentPage = ref(1);
const pageSize = ref(8);

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const fetchPayments = async (page = 1) => {
  try {
    const response = await api.get('/payments/earnings/', {
      params: { page, page_size: pageSize.value }
    });
    payments.value = response.data.payments;
    totalPayments.value = payments.value.length > 0 ? (page - 1) * pageSize.value + payments.value.length : 0;
    totalPages.value = response.data.total_pages;
    currentPage.value = response.data.current_page;
  } catch (err) {
    $toast.error('Failed to load payment history');
    console.error('Payment fetch error:', err);
  }
};

const changePage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  currentPage.value = page;
  fetchPayments(page);
};

onMounted(() => {
  fetchPayments();
});
</script>