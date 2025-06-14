import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";
import { routes } from "@router/routes";
import { useAuthStore } from "@stores/auth.store";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || "/"),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // Return to saved position if exists (browser back/forward)
    if (savedPosition) {
      return savedPosition;
    }
    // Scroll to top for new page loads
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 100, // Offset for fixed header
      };
    }
    return { top: 0, behavior: "smooth" };
  },
});

// Track if auth status has been checked to avoid multiple calls
let authStatusChecked = false;

// Global navigation guard
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  // Check authentication status on first navigation or if not authenticated
  if (!authStatusChecked || !authStore.isAuthenticated) {
    try {
      await authStore.checkUserAuthStatus();
      authStatusChecked = true;
    } catch (error) {
      authStatusChecked = true;
    }
  }

  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);
  const adminOnly = to.matched.some((record) => record.meta.isAdmin);

  // Set page title
  const title = (to.meta.title as string) || "Stillness";
  document.title = `Stillness | ${title}`;

  // Handle authentication requirements
  if (requiresAuth && !isAuthenticated) {
    return next({
      name: "login",
      query: { redirect: to.fullPath },
    });
  }

  // Handle guest-only routes (like login/register pages)
  if (guestOnly && isAuthenticated) {
    return next({ name: "home" });
  }

  if (adminOnly && authStore.userRole !== "admin") {
    // block non-admins
    return next({ name: "home" });
  }

  // OPTIONAL auto-redirect admins away from public pages
  if (
    !adminOnly &&
    authStore.userRole === "admin" &&
    to.name !== "admin-dashboard"
  ) {
    return next({ name: "admin-dashboard" });
  }

  next();
});

// Optional: Reset auth check flag when user logs out
// You can call this from your logout function
export const resetAuthCheck = () => {
  authStatusChecked = false;
};

export const getPageTitle = (route: RouteLocationNormalized): string => {
  const title = (route.meta.title as string) || "Stillness";
  return `Stillness | ${title}`;
};

export default router;
