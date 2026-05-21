# Devangwa Coaching — Frontend

Vue 3 single-page application for the Devangwa coaching platform. Built with Vite, Pinia, Vue Router, and Bootstrap 5.

## Prerequisites

- Node.js 18+
- Running backend API (see [../devangwabackend/README.md](../devangwabackend/README.md))

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Default dev server: http://localhost:5173 (see Vite output).

## Environment

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API prefix (trailing slash required) | `http://127.0.0.1:8000/api/v1/` or `/api/v1/` |

Use a **relative** URL (`/api/v1/`) when the SPA is served by the same host as Django (Docker/nginx). Use the full backend URL during local split dev (Vite on 5173, Django on 8000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build → `dist/` (required before Docker deploy) |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run type-check` | Vue TypeScript check |

## Production deploy

1. Copy `.env.example` → `.env` and set `VITE_API_URL=/api/v1/` when served with Django/nginx.
2. Run `npm run build` — must complete without errors.
3. For the combined image, build from the **monorepo root**:  
   `docker build -f devangwabackend/Dockerfile -t devangwa-app .`
4. Do **not** commit `dist/` or `.env` (see root `.gitignore`).
5. Keep `VITE_USE_FAKE_BACKEND` unset or `false` in production.

## Project structure

```
src/
├── services/
│   ├── authService.js    # Axios instance, JWT interceptors, login/register
│   └── courseService.js  # Courses, enrollment, reviews (normalized API data)
├── stores/
│   ├── auth.js           # User session and roles
│   └── cart.js           # Cart persisted in localStorage
├── router/
│   ├── index.ts          # Auth guards
│   └── router.ts         # Route definitions
└── views/
    ├── pages/auth/       # Sign in / sign up
    ├── pages/course/     # Course detail (classic), listings
    ├── pages/shop/       # Cart and checkout
    └── accounts/student/ # Student courses and dashboard
```

## Key routes

| Route | Name | Auth | Purpose |
|-------|------|------|---------|
| `/courses` | `courses` | No | Published course catalog |
| `/course/:slug` | `course.detail` | No | Course detail, enroll / add to cart |
| `/auth/sign-in` | `auth.sign-in` | No | Login |
| `/auth/sign-up` | `auth.sign-up` | No | Registration |
| `/checkout` | `shop.checkout` | Yes | Pay and enroll |
| `/cart` | (cart) | No* | Shopping cart |

\* Checkout requires authentication.

## API integration

All HTTP calls should go through `api` from `authService.js` or helpers in `courseService.js`.

### Authentication

```javascript
import authService from '@/services/authService';

await authService.login({ email, password }, rememberMe);
await authService.register({ email, password, full_name, phonenumber, is_individual, is_company });
```

Registration body must use `full_name` and `phonenumber` (optional), not split first/last name fields, to match the backend serializer.

### Courses

```javascript
import courseService from '@/services/courseService';

const courses = await courseService.fetchCourses();
const course = await courseService.fetchCourse('my-course-slug');
const enrolled = await courseService.fetchEnrolled();
await courseService.enroll('my-course-slug', { payment_method: 'mpesa', phone_number: '+255...' });
```

`normalizeCourse()` maps API fields (`cover`, `tags[].tag`, `modules[].lectures`) to what UI components expect (`image`, tag strings, curriculum).

### Checkout flow

1. User adds a course on `/course/:slug` (paid → cart; free → direct `enroll()`).
2. `/checkout` calls `courseService.enroll()` per cart item (and `coaching/events/{slug}/attend/` for events).
3. Duplicate enrollment is checked via `GET course/courses/enrolled/` before payment.

## Auth behavior

- Tokens stored in `localStorage` (remember me) or `sessionStorage`.
- Access token attached as `Authorization: Bearer <token>`.
- On 401, refresh via `POST auth/jwt/refresh/`; on failure, redirect to `/auth/sign-in`.
- `?redirectedFrom=` query is honored after login (see router guard in `router/index.ts`).
- Debug logging only runs when `import.meta.env.DEV` is true.

## Production build

```bash
npm run build
```

Output in `dist/`. In the combined Docker image, assets are copied into `devangwabackend/static/` and `templates/index.html`.

## Related docs

- [../README.md](../README.md) — Monorepo overview  
- [../devangwabackend/INTEGRATION_GUIDE.md](../devangwabackend/INTEGRATION_GUIDE.md) — Full API reference  
- [../devangwabackend/FRONTEND_README.md](../devangwabackend/FRONTEND_README.md) — Extended frontend notes  
