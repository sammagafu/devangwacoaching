import { api } from '@/services/authService';

const DEFAULT_COURSE_IMAGE = '/default-course-image.jpg';

/**
 * Normalize API course payload for UI components.
 */
export function normalizeCourse(data) {
  if (!data) return null;

  const tags = (data.tags || []).map((t) =>
    typeof t === 'string' ? t : t.tag || t.name || ''
  ).filter(Boolean);

  const totalLectures =
    (data.total_videos || 0) + (data.total_documents || 0) + (data.total_quizzes || 0);

  return {
    ...data,
    image: data.cover || data.image || DEFAULT_COURSE_IMAGE,
    cover: data.cover || data.image || DEFAULT_COURSE_IMAGE,
    category: tags[0] || 'General',
    tags,
    price: data.price ?? data.final_price ?? 0,
    final_price: Number(data.final_price ?? data.price ?? 0),
    level: data.level || 'Beginner',
    language: data.language || 'English',
    certificate: data.certificate ?? true,
    rating: data.rating || 0,
    duration: data.duration || `${data.total_videos || 0} lectures`,
    student: data.student || 0,
    modules: (data.modules || []).map((mod) => ({
      ...mod,
      lectures: mod.lectures || [],
    })),
    faqs: data.faqs || [],
    reviews: data.reviews ?? 0,
    discount_percentage: data.discount_percentage || '0',
  };
}

export function normalizeEnrollment(enrollment) {
  const course = normalizeCourse(enrollment.course);
  const totalLectures =
    (course.total_videos || 0) + (course.total_documents || 0) + (course.total_quizzes || 0);

  return {
    ...enrollment,
    course,
    slug: course.slug,
    image: course.image,
    title: course.title,
    progress: enrollment.completion_percentage || 0,
    lectures: totalLectures,
    completed: Math.round(((enrollment.completion_percentage || 0) / 100) * totalLectures),
    enrolled_at: enrollment.enrolled_at,
    price: course.final_price,
  };
}

function unwrapList(response) {
  const data = response.data;
  if (Array.isArray(data)) return data;
  if (data?.results) return data.results;
  return [];
}

const courseService = {
  async fetchCourses(params = {}) {
    const response = await api.get('course/courses/', { params });
    return unwrapList(response).map(normalizeCourse);
  },

  async fetchCourse(slug) {
    const response = await api.get(`course/courses/${slug}/`);
    return normalizeCourse(response.data);
  },

  async fetchEnrolled() {
    const response = await api.get('course/courses/enrolled/');
    return unwrapList(response).map(normalizeEnrollment);
  },

  async isEnrolled(slug) {
    const enrolled = await this.fetchEnrolled();
    return enrolled.some((e) => e.course?.slug === slug || e.slug === slug);
  },

  async enroll(slug, paymentData = {}) {
    const body =
      paymentData.final_price > 0 || paymentData.amount > 0
        ? {
            payment_method: paymentData.payment_method || 'mpesa',
            phone_number: paymentData.phone_number,
            card_number: paymentData.card_number,
          }
        : {};
    const response = await api.post(`course/courses/${slug}/enroll/`, body);
    return response.data;
  },

  async fetchReviews(courseId) {
    const response = await api.get('course/reviews/', { params: { course: courseId } });
    return unwrapList(response);
  },

  async submitReview(courseId, { rating, comment }) {
    const response = await api.post('course/reviews/', {
      course: courseId,
      rating: parseInt(rating, 10),
      comment,
    });
    return response.data;
  },
};

export default courseService;
