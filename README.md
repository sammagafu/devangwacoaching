# Devangwa Coaching — Frontend

Vue 3 single-page application for the Devangwa relationship and marriage coaching platform. Built with Vite, Pinia, Vue Router, and Bootstrap 5.

## Repository

| | GitHub |
|---|--------|
| **Frontend** (this repo) | https://github.com/sammagafu/devangwacoaching.git |
| **Backend** | https://github.com/sammagafu/devangwabackend.git |

## Clone

```bash
git clone https://github.com/sammagafu/devangwacoaching.git
cd devangwacoaching
npm install && cp .env.example .env && npm run dev
```

For Docker / single-droplet deploy, clone **both** repos side by side — see [../devangwabackend/DEPLOY_DROPLET.md](../devangwabackend/DEPLOY_DROPLET.md).

## Prerequisites

- Node.js 18+
- Running backend API (see [../devangwabackend/README.md](../devangwabackend/README.md))
- MySQL for backend (see `../devangwabackend/docker-compose.yml`)

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Default dev server: http://localhost:5173

## Environment

| Variable | Description | Local example |
|----------|-------------|---------------|
| `VITE_API_URL` | Backend API prefix (trailing slash required) | `http://127.0.0.1:8000/api/v1/` |
| `VITE_USE_FAKE_BACKEND` | Mock auth/API in browser — **never `true` in production** | `false` |

Use `/api/v1/` when the SPA is served by the same host as Django (Docker/nginx). Use the full URL when Vite (5173) and Django (8000) run separately.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with HMR |
| `npm run dev:clean` | Clear Vite cache and start dev |
| `npm run build` | Production build → `dist/` (`prebuild` syncs favicon from `brand-mark.svg`) |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run type-check` | Vue TypeScript check |

## Production homepage (`/`)

The production home route (`demos.default`) uses custom Devangwa components:

| Area | Location |
|------|----------|
| Nav + EN/SW + light/dark | `HomeNav.vue`, `HomePreferences.vue` |
| Hero, features, about, programmes | `HomeHero.vue`, `HomeFeatures.vue`, … |
| Reviews, CTA, trending courses | `HomeReviews.vue`, `HomeReviewsCta.vue`, `TrendingCourses.vue` |
| Copy (EN / Swahili) | `src/i18n/home.ts` |
| Design tokens | `src/assets/scss/pages/_home.scss` |

Theme preview demo routes (`/demos/landing`, etc.) are **not** registered in production router — only the Devangwa home at `/`.

## Programme catalogue (`/courses`)

Route: `courses` → `src/views/accounts/student/courses-all/`

**Filters** (Devangwa-specific, not generic LMS):

- **Programme focus** — communication, conflict, marriage, connection, featured, API tags
- **Price** — all / free / paid
- No language or generic “skill level” filters

Filter logic: `src/helpers/courseFilters.js`, UI: `components/Filter.vue`.

## Project structure

```
src/
├── i18n/home.ts              # Homepage EN / SW strings
├── composables/useHomeLocale.ts
├── helpers/courseFilters.js  # Programme catalogue filters
├── services/
│   ├── authService.js        # Axios, JWT interceptors
│   └── courseService.js      # Courses, enrollment, reviews
├── stores/
│   ├── auth.js
│   ├── cart.js
│   └── layout.ts             # Light / dark theme
├── router/
│   ├── index.ts              # Auth guards
│   └── router.ts             # Routes (home at /)
└── views/
    ├── demos/default/        # Production homepage
    ├── pages/auth/
    ├── pages/course/
    ├── pages/shop/
    └── accounts/student/
```

## Key routes

| Route | Name | Auth | Purpose |
|-------|------|------|---------|
| `/` | `demos.default` | No | Devangwa homepage |
| `/courses` | `courses` | No | Programme catalogue + filters |
| `/course/:slug` | `course.detail` | No | Detail, enroll / cart |
| `/auth/sign-in` | `auth.sign-in` | No | Login |
| `/auth/sign-up` | `auth.sign-up` | No | Registration |
| `/checkout` | `shop.checkout` | Yes | Pay and enroll |

## API integration

Use `api` from `authService.js` or `courseService.js`.

```javascript
import courseService from '@/services/courseService';

const courses = await courseService.fetchCourses();
const course = await courseService.fetchCourse('my-course-slug');
await courseService.enroll('slug', { payment_method: 'mpesa', phone_number: '+255...' });
```

Registration must send `full_name`, `email`, `password` (see backend serializer).

## Auth behavior

- JWT in `localStorage` (remember me) or `sessionStorage`
- `Authorization: Bearer <token>` on API calls
- 401 → refresh via `auth/jwt/refresh/` → sign-in on failure
- `VITE_USE_FAKE_BACKEND=true` only for UI demos without API

## Production build

```bash
npm run build
```

Output in `dist/`. For production on a single droplet, the backend Dockerfile builds this automatically — no separate frontend server. See [../devangwabackend/DEPLOY_DROPLET.md](../devangwabackend/DEPLOY_DROPLET.md).

## Branding

- Favicon: `src/assets/images/brand-mark.svg` (copied to `public/favicon.svg` on build)
- Loading splash: wordmark only (`public/splash-logo.svg`)

## Related docs

- [../README.md](../README.md) — Monorepo quick start  
- [../devangwabackend/HANDOVER.md](../devangwabackend/HANDOVER.md) — Deployment  
- [../devangwabackend/INTEGRATION_GUIDE.md](../devangwabackend/INTEGRATION_GUIDE.md) — API reference  
- [../devangwabackend/FRONTEND_README.md](../devangwabackend/FRONTEND_README.md) — Extended frontend notes  
