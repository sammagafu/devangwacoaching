import { createRouter, createWebHistory } from 'vue-router'
import { allRoutes } from '@/router/router'
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRoutes
})

// Set document title
router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = title.toString()
  }
  next()
})

// Role-based access control
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const authRequired = to.matched.some((route) => route.meta.authRequired);

  // Allow access to routes that don't require authentication
  if (!authRequired) {
    return next();
  }

  // Redirect unauthenticated users to login
  if (!auth.isAuthenticated) {
    return redirectToLogin(to);
  }

  // Collect required roles from the route and its parents
  const requiredRoles = to.matched.reduce((roles, route) => {
    return route.meta.roles ? [...roles, ...route.meta.roles] : roles;
  }, []);

  // If no specific roles are required, allow access (for authenticated users)
  if (requiredRoles.length === 0) {
    return next();
  }

  // Check if the user has at least one of the required roles
  const hasAccess = requiredRoles.some(role => {
    if (role === 'normal') return auth.isNormalUser;
    if (role === 'staff') return auth.isStaff;
    if (role === 'admin') return auth.isAdmin;
    return false;
  });

  if (!hasAccess) {
    return next({ name: 'specialty.forbidden' });
  }

  // Allow access if all checks pass
  next();
});

// Redirect to login with the original route as a query parameter
function redirectToLogin(to) {
  return { name: 'auth.sign-in', query: { redirectedFrom: to.fullPath } };
}

export default router