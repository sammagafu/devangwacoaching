<template>
  <section class="pb-0 pb-lg-5">
    <b-container>
      <div class="text-center mb-5">
        <h2 class="display-4 font-weight-bold">Our Services</h2>
        <p class="lead">
          At Devangwa Coaching, we believe every marriage has the potential to thrive. Our self-paced, online courses are designed to help couples build stronger, happier, and more fulfilling relationships. Let NDOA TAMU be your thinking partner as you embark on a journey toward deeper connection, trust, and lasting love.
        </p>
      </div>
      <div>
        <b-row
          v-for="(service, index) in services"
          :key="service.title"
          :class="['g-4', 'g-lg-5', 'align-items-center', index % 2 === 1 ? 'flex-row-reverse' : '']"
          :style="{ marginTop: index > 0 ? '5rem' : '0' }"
        >
          <b-col lg="6" class="position-relative">
            <img :src="service.image" class="img-fluid" :alt="service.title">
          </b-col>
          <b-col lg="6">
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <a v-if="service.hasButton" href="#" class="btn btn-primary">Get started</a>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import image1 from '@/assets/images/services/ndoa-tamu.jpg';
import image2 from '@/assets/images/services/conflit.jpg';
import image3 from '@/assets/images/services/connection.jpg';
import image4 from '@/assets/images/services/lasting-marriage.jpg';
import image5 from '@/assets/images/services/communication.jpg';

const services = ref([
  {
    title: "Building the Foundation: Essential Principles for a Happy and Lasting Marriage",
    description: "Imagine a marriage built on unshakeable trust, shared values, and deep mutual respect—a partnership that grows stronger with each passing day. \"Building the Foundation\" is a self-paced, online training designed for couples who want to build a truly fulfilling, lasting relationship. This isn’t just another course. This course goes beyond surface advice, giving you the tools and insights to cultivate connection, resilience, and joy in your marriage. Through engaging, accessible online modules, you’ll explore principles like shared values, healthy boundaries, and building trust—all at your own pace and from the comfort of your home.",
    image: image1,
    hasButton: false
  },
  {
    title: "From Tension to Teamwork: Mastering Conflict Resolution for a Stronger and Happier Marriage",
    description: "Every marriage faces challenges, but it doesn’t have to be destructive. How you handle those challenges determines the strength of your bond. \"From Tension to Teamwork\" is a self-paced, online course designed to help couples navigate conflict with confidence and compassion, turning conflict and moments of tension into powerful opportunities for growth, understanding, and deeper connection. In this course, you’ll learn powerful, practical tools to resolve disagreements without the emotional fallout in a way that strengthens your connection. Discover how to communicate with empathy, navigate tension with respect, and rebuild trust after conflict. Each module is filled with real-life strategies that will transform how you approach and resolve conflicts—turning those moments of tension into opportunities to grow stronger as a couple.",
    image: image2,
    hasButton: true
  },
  {
    title: "Unified Hearts: The Art of Building a Deep Emotional Connection that Lasts",
    description: "True intimacy is built on a deep emotional connection—one that isn’t fleeting, but lasting and unshakeable. \"Unified Hearts\" is an intimate, transformative course designed to help you and your partner create and nurture an emotional bond that stands the test of time. In this course, you’ll explore the art of emotional intimacy, learning how to connect on a level that goes beyond surface conversations. You’ll discover the power of vulnerability, empathy, and trust in building a connection that feels secure and deeply fulfilling. Through expert guidance, you’ll gain the tools and insights to not only strengthen your emotional bond but also cultivate a relationship where both partners feel truly seen, heard, and valued. Together, you’ll build a foundation of mutual respect, understanding, and unwavering love, ensuring that your emotional connection continues to deepen with time.",
    image: image3,
    hasButton: false
  },
  {
    title: "Trust: The Foundation of a Strong Marriage – Building Confidence, Security, and Lasting Love from Inside Out",
    description: "Trust is the bedrock of any successful marriage, and without it, relationships struggle to thrive. \"Trust: The Foundation of a Strong Marriage\" is an empowering online course designed to help you and your partner build an unshakable trust that creates confidence, security, and lasting love. In this course, you’ll explore how trust goes beyond mere honesty—it’s about creating a safe space where both partners feel valued, understood, and emotionally secure. You’ll learn practical techniques to nurture and rebuild trust, even after setbacks, and discover how this vital foundation strengthens every aspect of your relationship. By building trust from the inside out, you’ll unlock a love that is more resilient, confident, and deeply connected. This course isn’t just about avoiding betrayal; it’s about creating a lasting bond that thrives on mutual respect, reliability, and the shared commitment to growth.",
    image: image4,
    hasButton: true
  },
  {
    title: "Communication: The Power of Words Spoken and Not Spoken: Mastering Communication for Deeper Intimacy and a Marriage that Lasts",
    description: "Communication is more than just exchanging words; it’s the lifeblood of every healthy relationship. \"The Power of Words Spoken and Not Spoken\" is a transformative online course designed to help you master the art of communication in your marriage, unlocking deeper intimacy and lasting love. In this course, you’ll learn how to communicate not just with words, but with your heart. You’ll discover the art of communication that reaches beyond words Unspoken communication invites deeper intimacy, trust, and understanding into your marriage. You’ll learn how to speak from the heart, using your words to nurture closeness, while also exploring the unspoken language of emotions, body language, and tone. Recognize how these non-verbal cues impact your bond, uncovering the power they hold to either heal or hurt. With practical exercises and expert guidance, you’ll develop the skills to communicate with honesty, empathy, and clarity, strengthening your connection in every way. Master both verbal and non-verbal communication, and unlock a profound connection that allows you and your partner to face life’s challenges with unity, grace, and unwavering support.",
    image: image5,
    hasButton: false
  }
]);
</script>