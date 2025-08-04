const setTitle = (pageName?: string) => {
  return pageName
    ? `${pageName} | Devangwa | LMS, Education and Course`
    : 'Devangwa | LMS, Education and Course';
};

const demoRoutes = [
  {
    path: '/',
    redirect: { name: 'demos.default' },
    name: 'index'
  },
  {
    path: '',
    name: 'demos.default',
    meta: {
      title: setTitle('Home')
    },
    component: () => import('@/views/demos/default/index.vue')
  },
  {
    path: '/demos/education',
    name: 'demos.education',
    meta: {
      title: setTitle('Education')
    },
    component: () => import('@/views/demos/education/index.vue')
  },
  {
    path: '/demos/academy',
    name: 'demos.academy',
    meta: {
      title: setTitle('Academy')
    },
    component: () => import('@/views/demos/academy/index.vue')
  },
  {
    path: '/demos/course',
    name: 'demos.course',
    meta: {
      title: setTitle('Course')
    },
    component: () => import('@/views/demos/course/index.vue')
  },
  {
    path: '/demos/university',
    name: 'demos.university',
    meta: {
 Eletype: {
      title: setTitle('University')
    },
    component: () => import('@/views/demos/university/index.vue')
  }
},
  {
    path: '/demos/kindergarten',
    name: 'demos.kindergarten',
    meta: {
      title: setTitle('Kindergarten')
    },
    component: () => import('@/views/demos/kindergarten/index.vue')
  },
  {
    path: '/demos/landing',
    name: 'demos.landing',
    meta: {
      title: setTitle('Landing')
    },
    component: () => import('@/views/demos/landing/index.vue')
  },
  {
    path: '/demos/tutor',
    name: 'demos.tutor',
    meta: {
      title: setTitle('Tutor')
    },
    component: () => import('@/views/demos/tutor/index.vue')
  },
  {
    path: '/demos/school',
    name: 'demos.school',
    meta: {
      title: setTitle('School')
    },
    component: () => import('@/views/demos/school/index.vue')
  },
  {
    path: '/demos/abroad',
    name: 'demos.abroad',
    meta: {
      title: setTitle('Abroad')
    },
    component: () => import('@/views/demos/abroad/index.vue')
  },
  {
    path: '/demos/workshop',
    name: 'demos.workshop',
    meta: {
      title: setTitle('Workshop')
    },
    component: () => import('@/views/demos/workshop/index.vue')
  },
];

const pagesRoutes = [
  {
    path: '/forbidden',
    name: 'specialty.forbidden',
    meta: {
      title: setTitle('Forbidden')
    },
    component: () => import('@/views/Forbiden.vue')
  },
  {
    path: '/course/categories',
    name: 'course.categories',
    meta: {
      title: setTitle('Course Categories')
    },
    component: () => import('@/views/pages/course/categories/index.vue')
  },
  {
    path: '/course/grid',
    name: 'course.grid.classic',
    meta: {
      title: setTitle('Grid Classic')
    },
    component: () => import('@/views/accounts/student/courses-all/index.vue')
  },
  {
    path: '/course/grid-2',
    name: 'course.grid.minimal',
    meta: {
      title: setTitle('Grid Minimal')
    },
    component: () => import('@/views/pages/course/grid-minimal/index.vue')
  },
  {
    path: '/course/list',
    name: 'course.list.classic',
    meta: {
      title: setTitle('List Classic')
    },
    component: () => import('@/views/pages/course/list-classic/index.vue')
  },
  {
    path: '/course/list-2',
    name: 'course.list.minimal',
    meta: {
      title: setTitle('List Minimal')
    },
    component: () => import('@/views/pages/course/list-minimal/index.vue')
  },
 
  {
    path: '/course/detail-min',
    name: 'course.detail.minimal',
    meta: {
      title: setTitle('Detail Minimal')
    },
    component: () => import('@/views/pages/course/detail-minimal/index.vue')
  },
  {
    path: '/course/detail-module',
    name: 'course.detail.module',
    meta: {
      title: setTitle('Detail Module')
    },
    component: () => import('@/views/pages/course/detail-module/index.vue')
  },
  {
    path: '/course/video-player',
    name: 'course.video.player',
    meta: {
      title: setTitle('Course Video'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/pages/course/coursevideo/index.vue')
  },
  {
    path: '/about/about-us',
    name: 'about',
    meta: {
      title: setTitle('About')
    },
    component: () => import('@/views/pages/about/about-us/index.vue')
  },
  {
    path: '/about/contact-us',
    name: 'about.contact.us',
    meta: {
      title: setTitle('Contact Us')
    },
    component: () => import('@/views/pages/about/contact-us/index.vue')
  },
  {
    path: '/about/blog-grid',
    name: 'about.blog.grid',
    meta: {
      title: setTitle('Blog Grid')
    },
    component: () => import('@/views/pages/about/blog-grid/index.vue')
  },
  {
    path: '/about/blog-masonry',
    name: 'about.blog.masonry',
    meta: {
      title: setTitle('Blog Masonry')
    },
    component: () => import('@/views/pages/about/blog-masonry/index.vue')
  },
  {
    path: '/about/blog-detail',
    name: 'about.blog.detail',
    meta: {
      title: setTitle('Blog Detail')
    },
    component: () => import('@/views/pages/about/blog-detail/index.vue')
  },
  {
    path: '/about/pricing',
    name: 'about.pricing',
    meta: {
      title: setTitle('Pricing')
    },
    component: () => import('@/views/pages/about/pricing/index.vue')
  },
  {
    path: '/hero/form',
    name: 'hero.form',
    meta: {
      title: setTitle('Form')
    },
    component: () => import('@/views/pages/heroBanner/form/index.vue')
  },
  {
    path: '/hero/vector',
    name: 'hero.vector',
    meta: {
      title: setTitle('Vector')
    },
    component: () => import('@/views/pages/heroBanner/vector/index.vue')
  },
  {
    path: '/shop',
    name: 'shop.grid',
    meta: {
      title: setTitle('Shop')
    },
    component: () => import('@/views/pages/shop/shop/index.vue')
  },
  {
    path: '/shop/:id',
    name: 'shop.product.detail',
    params: { id: '3001' },
    meta: {
      title: setTitle('Shop Details')
    },
    component: () => import('@/views/pages/shop/shop/[id]/index.vue')
  },
  {
    path: '/shop/cart',
    name: 'shop.cart',
    meta: {
      title: setTitle('Cart'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/pages/shop/cart/index.vue')
  },
  {
    path: '/checkout',
    name: 'shop.checkout',
    meta: {
      title: setTitle('Checkout'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/pages/shop/checkout/index.vue')
  },
  {
    path: '/shop/empty-cart',
    name: 'shop.empty-cart',
    meta: {
      title: setTitle('Empty Cart'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/pages/shop/empty-cart/index.vue')
  },
  {
    path: '/shop/wishlist',
    name: 'shop.wishlist',
    meta: {
      title: setTitle('Wishlist'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/pages/shop/wishlist/index.vue')
  },
  {
    path: '/help-center',
    name: 'help.center',
    meta: {
      title: setTitle('Help Center')
    },
    component: () => import('@/views/pages/help/help-center/index.vue')
  },
  {
    path: '/help-center/:id',
    name: 'help.center.single',
    params: { id: '3001' },
    meta: {
      title: setTitle('Help Center Details')
    },
    component: () => import('@/views/pages/help/help-center/[id]/index.vue')
  },
  {
    path: '/faq',
    name: 'help.faq',
    meta: {
      title: setTitle('FAQs')
    },
    component: () => import('@/views/pages/help/faqs/index.vue')
  },
  {
    path: '/auth/sign-in',
    name: 'auth.sign-in',
    meta: {
      title: setTitle('Sign In')
    },
    component: () => import('@/views/pages/auth/sign-In.vue')
  },
  {
    path: '/auth/sign-up',
    name: 'auth.sign-up',
    meta: {
      title: setTitle('Sign Up')
    },
    component: () => import('@/views/pages/auth/sign-up.vue')
  },
  {
    path: '/auth/forgot-password',
    name: 'auth.forgot-password',
    meta: {
      title: setTitle('Forgot Password')
    },
    component: () => import('@/views/pages/auth/forgot-password.vue')
  },
  {
    path: '/form/request-demo',
    name: 'form.request.demo',
    meta: {
      title: setTitle('Request Demo')
    },
    component: () => import('@/views/pages/form/request-demo.vue')
  },
  {
    path: '/form/book-class',
    name: 'form.book.class',
    meta: {
      title: setTitle('Book Class')
    },
    component: () => import('@/views/pages/form/book-class.vue')
  },
  {
    path: '/form/request-access',
    name: 'form.request.access',
    meta: {
      title: setTitle('Request Access')
    },
    component: () => import('@/views/pages/form/request-access/index.vue')
  },
  {
    path: '/form/admission-form',
    name: 'form.admission.form',
    meta: {
      title: setTitle('Admission Form')
    },
    component: () => import('@/views/pages/form/admission-form.vue')
  },
  {
    path: '/error-404',
    name: 'specialty.error-404',
    meta: {
      title: setTitle('Error 404')
    },
    component: () => import('@/views/pages/specialty/error-404.vue')
  },
  {
    path: '/coming-soon',
    name: 'specialty.coming.soon',
    meta: {
      title: setTitle('Coming Soon')
    },
    component: () => import('@/views/pages/specialty/coming-soon.vue')
  },
  {
    path: '/instructor-list',
    name: 'instructor.list',
    meta: {
      title: setTitle('Instructor List')
    },
    component: () => import('@/views/pages/instructors/index.vue')
  },
  {
    path: '/instructor/:id',
    name: 'instructor.single',
    params: { id: '3001' },
    meta: {
      title: setTitle('Instructor Details')
    },
    component: () => import('@/views/pages/instructors/[id]/index.vue')
  },
  {
    path: '/become-instructor',
    name: 'become.instructor',
    meta: {
      title: setTitle('Become an Instructor'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/pages/become-instructor/index.vue')
  },
  {
    path: '/abroad-single',
    name: 'abroad.single',
    meta: {
      title: setTitle('Abroad Single')
    },
    component: () => import('@/views/pages/abroad-single/index.vue')
  },
  {
    path: '/workshop-detail',
    name: 'workshop.detail',
    meta: {
      title: setTitle('Workshop Detail')
    },
    component: () => import('@/views/pages/workshop-detail/index.vue')
  },
  {
    path: '/event-detail',
    name: 'event.detail',
    meta: {
      title: setTitle('Event Detail')
    },
    component: () => import('@/views/pages/event-detail/index.vue')
  }
];

const adminRoutes = [
  {
    path: '/admin/dashboard',
    name: 'admin.dashboard',
    meta: {
      title: setTitle('Dashboard'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/dashboard/index.vue')
  },
  {
    path: '/admin/course-list',
    name: 'admin.course-list',
    meta: {
      title: setTitle('Course List'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/courses/list/index.vue')
  },
  {
    path: '/admin/course-category',
    name: 'admin.course.category',
    meta: {
      title: setTitle('Course Category'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/courses/category/index.vue')
  },
  {
    path: '/admin/course-detail/:slug',
    name: 'admin.course.detail',
    meta: {
      title: setTitle('Course Detail'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/courses/details/index.vue')
  },
  {
    path: '/admin/courses/edit/:slug',
    name: 'admin.course.edit',
    meta: {
      title: setTitle('Course Edits'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/courses/create-course/index.vue'),
  },
  {
    path: '/admin/student-list',
    name: 'admin.student.list',
    meta: {
      title: setTitle('Student List'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/studentList/index.vue')
  },
  {
    path: '/admin/instructor-list',
    name: 'admin.instructor.list',
    meta: {
      title: setTitle('Instructor List'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/instructors/list/index.vue')
  },
  {
    path: '/admin/instructor-detail',
    name: 'admin.instructor.detail',
    meta: {
      title: setTitle('Instructor Detail'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/instructors/details/index.vue')
  },
  {
    path: '/admin/instructor-request',
    name: 'admin.instructor.request',
    meta: {
      title: setTitle('Instructor Request'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/instructors/request/index.vue')
  },
  {
    path: '/admin/review',
    name: 'admin.review',
    meta: {
      title: setTitle('Review'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/reviews/index.vue')
  },
  {
    path: '/admin/earning',
    name: 'admin.earning',
    meta: {
      title: setTitle('Earning'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/earning/index.vue')
  },
  {
    path: '/admin/setting',
    name: 'admin.setting',
    meta: {
      title: setTitle('Setting'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/setting/index.vue')
  },
  {
    path: '/admin/create-course',
    name: 'admin.create.course',
    meta: {
      title: setTitle('Create Course'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/courses/create-course/index.vue')
  },
  {
    path: '/admin/manage-events/',
    name: 'admin.manage.event',
    meta: {
      title: setTitle('Manage Events'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/events/index.vue')
  },
  {
    path: '/admin/manage-events/:slug',
    name: 'admin.manage.event-details',
    meta: {
      title: setTitle('Manage Events'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/events/components/EventDetails.vue')
  },
  {
    path: '/admin/manage-events/create-event',
    name: 'admin.manage.event-create',
    meta: {
      title: setTitle('Create Event'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/events/create-events/index.vue')
  },
  {
    path: '/admin/manage-community',
    name: 'admin.manage.community',
    meta: {
      title: setTitle('Manage Community'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/community/index.vue')
  },
  {
    path: '/admin/error-404',
    name: 'admin.error-404',
    meta: {
      title: setTitle('Error 404'),
      authRequired: true,
      roles: ['admin']
    },
    component: () => import('@/views/admin/Error-404.vue')
  },
];

const accountsRoutes = [
  {
    path: '/instructor/dashboard',
    name: 'instructor.dashboard',
    meta: {
      title: setTitle('Dashboard'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/dashboard/index.vue')
  },
  {
    path: '/instructor/course',
    name: 'instructor.course',
    meta: {
      title: setTitle('Course'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/course/index.vue')
  },
  {
    path: '/instructor/course-added',
    name: 'instructor.course.added',
    meta: {
      title: setTitle('Course Added'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/course-added.vue')
  },
  {
    path: '/instructor/quiz',
    name: 'instructor.quiz',
    meta: {
      title: setTitle('Quiz'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/quiz/index.vue')
  },
  {
    path: '/instructor/earning',
    name: 'instructor.earning',
    meta: {
      title: setTitle('Earning'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/earning/index.vue')
  },
  {
    path: '/instructor/student',
    name: 'instructor.student',
    meta: {
      title: setTitle('Student List'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/students/index.vue')
  },
  {
    path: '/instructor/order',
    name: 'instructor.order',
    meta: {
      title: setTitle('Orders'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/orders/index.vue')
  },
  {
    path: '/instructor/review',
    name: 'instructor.review',
    meta: {
      title: setTitle('Reviews'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/reviews/index.vue')
  },
  {
    path: '/instructor/settings',
    name: 'instructor.settings',
    meta: {
      title: setTitle('Settings'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/settings.vue')
  },
  {
    path: '/instructor/payout',
    name: 'instructor.payout',
    meta: {
      title: setTitle('Payouts'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/payout/index.vue')
  },
  {
    path: '/instructor/delete-account',
    name: 'instructor.delete.account',
    meta: {
      title: setTitle('Delete Account'),
      authRequired: true,
      roles: ['staff', 'admin']
    },
    component: () => import('@/views/accounts/instructor/delete-account.vue')
  },
  {
    path: '/student/dashboard',
    name: 'student.dashboard',
    meta: {
      title: setTitle('Dashboard'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/dashboard/index.vue')
  },
  {
    path: '/student/profile',
    name: 'student.profile',
    meta: {
      title: setTitle('Profile'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/dashboard/index.vue')
  },
  {
    path: '/student/edit-profile',
    name: 'student.edit.profile',
    meta: {
      title: setTitle('Edit Profile'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/edit-profile/index.vue')
  },
  {
    path: '/student/subscription',
    name: 'student.subscription',
    meta: {
      title: setTitle('Subscription'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/subscription/index.vue')
  },
  {
    path: '/student/course',
    name: 'student.course',
    meta: {
      title: setTitle('Courses'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/courses/index.vue')
  },
  {
    path: '/student/course/:slug',
    name: 'student.course.details',
    meta: {
      title: setTitle('Course Details'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/course-resume/index.vue')
  },
  {
    path: '/student/quiz',
    name: 'student.quiz',
    meta: {
      title: setTitle('Quiz'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/quiz/index.vue')
  },
  {
    path: '/student/payment',
    name: 'student.payment',
    meta: {
      title: setTitle('Payment Info'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/payment/index.vue')
  },
  {
    path: '/student/bookmark',
    name: 'student.bookmark',
    meta: {
      title: setTitle('Bookmark'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/bookmark/index.vue')
  },
  {
    path: '/student/community',
    name: 'student.community',
    meta: {
      title: setTitle('Community'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    // src/views/accounts/student/community/Index.vue
    component: () => import('@/views/accounts/student/community/Index.vue')
  },
  {
    path: '/student/community/:slug',
    name: 'student.community.threads',
    meta: {
      title: setTitle('Community Threads'),
      authRequired: true,
      roles: ['normal', 'admin']
    },
    component: () => import('@/views/accounts/student/community/CommunityThreads.vue')
  },
  {
    path:'/courses',
    name: 'courses',
    meta: {
      title: setTitle('Courses'),},
    component: () => import('@/views/accounts/student/courses-all/index.vue')
  },
 {
    path: '/course/:slug',
    name: 'course.detail',
    meta: {
      title: setTitle('Course Detail')
    },
    component: () => import('@/views/pages/course/detail-classic/index.vue')
  },
   {
    path: '/terms-of-use',
    name: 'TermsOfUse',
    component: () => import('@/views/pages/terms/term-of-use.vue'),
     meta: {
      title: setTitle('Terms of Use')
    },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component:() => import('@/views/pages/terms/privacy-policy.vue'),
     meta: {
      title: setTitle('Privacy Policy')
    },
  },
];

export const allRoutes = [
  ...demoRoutes, ...pagesRoutes, ...accountsRoutes, ...adminRoutes
];