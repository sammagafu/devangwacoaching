<template>
  <section class="home-section action-cta py-5">
    <b-container>
      <div class="action-cta-card rounded-4 overflow-hidden">
        <b-row class="align-items-center g-4 p-4 p-lg-5">
          <b-col lg="8">
            <h3 class="h2 fw-bold text-white mb-3">
              Start Your Journey to a Stronger Relationship
            </h3>
            <p class="text-white mb-0 action-cta-text">
              Discover the power of connection with Devangwa Coaching. Our self-paced, expert-guided
              courses empower couples to build trust, resolve conflicts, and nurture lasting love—all
              from the comfort of home.
            </p>
          </b-col>
          <b-col lg="4" class="text-lg-end">
            <router-link
              :to="{ name: 'courses' }"
              class="btn btn-lg btn-light fw-semibold px-4"
            >
              Start Learning Today
            </router-link>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<style scoped>
.action-cta-card {
  background: linear-gradient(135deg, #0556a8 0%, #066ac9 45%, #0d7fd4 100%);
  box-shadow: 0 16px 40px rgba(6, 106, 201, 0.25);
}

.action-cta-text {
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.95;
  max-width: 42rem;
}
</style>
