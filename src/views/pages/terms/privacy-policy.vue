<script setup lang="ts">
import Footer1 from './components/Footer1.vue';
</script>

<template>
  <div class="container my-5">
    <h1 class="mb-4 text-center">Privacy Policy</h1>
    <p class="text-muted text-center">Effective Date: {{ new Date().toLocaleDateString() }}</p>
    <p class="lead">
      This Privacy Policy explains how <strong>Devangwa Coaching</strong> collects, uses, discloses, and protects your personal information when you use our website, services, or interact with our content.
    </p>

    <div class="accordion mt-4" id="privacyAccordion">

      <!-- Section 1 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="privacyHeadingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#privacyCollapseOne">
            1. Information We Collect
          </button>
        </h2>
        <div id="privacyCollapseOne" class="accordion-collapse collapse show" data-bs-parent="#privacyAccordion">
          <div class="accordion-body">
            We collect personal information such as name, email address, phone number, and any details provided when registering or contacting us. We may also collect usage data through cookies and analytics tools.
          </div>
        </div>
      </div>

      <!-- Section 2 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="privacyHeadingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacyCollapseTwo">
            2. How We Use Your Information
          </button>
        </h2>
        <div id="privacyCollapseTwo" class="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
          <div class="accordion-body">
            Your information helps us deliver coaching programs, communicate with you, improve our services, and send relevant updates or offers.
          </div>
        </div>
      </div>

      <!-- Section 3 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="privacyHeadingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacyCollapseThree">
            3. Sharing of Information
          </button>
        </h2>
        <div id="privacyCollapseThree" class="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
          <div class="accordion-body">
            We do not sell your data. We may share it with service providers to perform essential services (e.g., hosting, email delivery) or where legally required.
          </div>
        </div>
      </div>

      <!-- Section 4 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="privacyHeadingFour">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacyCollapseFour">
            4. Data Security
          </button>
        </h2>
        <div id="privacyCollapseFour" class="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
          <div class="accordion-body">
            We implement appropriate security measures to protect your data. However, no system is 100% secure. Please use strong passwords and safeguard your account credentials.
          </div>
        </div>
      </div>

      <!-- Section 5 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="privacyHeadingFive">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacyCollapseFive">
            5. Your Rights
          </button>
        </h2>
        <div id="privacyCollapseFive" class="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
          <div class="accordion-body">
            You may request access, correction, or deletion of your personal data. To exercise these rights, contact us at the email provided below.
          </div>
        </div>
      </div>

      <!-- Section 6 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="privacyHeadingSix">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacyCollapseSix">
            6. Cookies and Tracking
          </button>
        </h2>
        <div id="privacyCollapseSix" class="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
          <div class="accordion-body">
            We use cookies to understand user behavior and improve our site. You can disable cookies in your browser settings.
          </div>
        </div>
      </div>

      <!-- Section 7 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="privacyHeadingSeven">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacyCollapseSeven">
            7. Changes to this Policy
          </button>
        </h2>
        <div id="privacyCollapseSeven" class="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
          <div class="accordion-body">
            We may update this Privacy Policy. Changes will be posted on this page with the updated effective date.
          </div>
        </div>
      </div>

      <!-- Section 8 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="privacyHeadingEight">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacyCollapseEight">
            8. Contact Information
          </button>
        </h2>
        <div id="privacyCollapseEight" class="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
          <div class="accordion-body">
            For questions about this policy or your data, contact us at:<br>
            <strong>Email:</strong> info@devangwacoaching.com<br>
            <strong>Website:</strong> <a href="https://www.devangwacoaching.com">devangwacoaching.com</a>
          </div>
        </div>
      </div>

    </div>
  </div>
  <Footer1 />
</template>
