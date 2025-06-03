import type { RouteRecordRaw } from "vue-router";

// Layouts
const DefaultLayout = () => import("@layouts/DefaultLayout.vue");
const AdminLayout = () => import("@layouts/AdminLayout.vue");

// Views
const LoginView = () => import("@views/auth/LoginView.vue");
const RegisterView = () => import("@views/auth/RegisterView.vue");
const HomeView = () => import("@views/HomeView.vue");
const AboutUsView = () => import("@views/about/AboutUsView.vue");
const ContactView = () => import("@views/contact/ContactView.vue");
const ProductsView = () => import("@views/products/ProductsView.vue");
const ProductDetailView = () =>
  import("@views/products/ProductDetailsView.vue");
const CartView = () => import("@views/cart/CartView.vue");
const CheckoutView = () => import("@views/checkout/CheckoutView.vue");
const ProfileView = () => import("@views/profile/ProfileView.vue");
const UIExampleView = () => import("@/components/ui/UIExample.vue");
const NotFoundView = () => import("@views/errors/NotFoundView.vue");

// Admin Views
const AdminDashboardView = () => import("@views/admin/AdminDashboardView.vue");
const AdminUsersView = () => import("@/views/admin/AdminUsersView.vue");
const AdminProductsView = () => import("@/views/admin/AdminProductsView.vue");
const AdminAddProductView = () =>
  import("@/views/admin/AdminAddProductView.vue");
const AdminOrdersView = () => import("@/views/admin/AdminOrdersView.vue");
const AdminOrdersHistoryView = () =>
  import("@/views/admin/AdminOrdersHistoryView.vue");
// const CollectionView = () => import("@/views/collections/CollectionView.vue");

export const routes: RouteRecordRaw[] = [
  // Admin Routes
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, isAdmin: true },
    children: [
      {
        path: "",
        name: "admin-dashboard",
        component: AdminDashboardView,
        meta: { title: "Admin Dashboard", requiresAuth: true, isAdmin: true },
      },
      {
        path: "users",
        name: "admin-users",
        component: AdminUsersView,
        meta: { title: "User Management", requiresAuth: true, isAdmin: true },
      },
      {
        path: "products",
        name: "admin-products",
        component: AdminProductsView,
        meta: {
          title: "Product Management",
          requiresAuth: true,
          isAdmin: true,
        },
      },
      {
        path: "products/add",
        name: "admin-add-product",
        component: AdminAddProductView,
        meta: { title: "Add New Product", requiresAuth: true, isAdmin: true },
      },
      {
        path: "products/:id/edit",
        name: "admin-edit-product",
        component: AdminAddProductView,
        meta: { title: "Edit Product", requiresAuth: true, isAdmin: true },
      },
      {
        path: "orders",
        name: "admin-orders",
        component: AdminOrdersView,
        meta: { title: "Order Management", requiresAuth: true, isAdmin: true },
      },
      {
        path: "orders/history",
        name: "admin-orders-history",
        component: AdminOrdersHistoryView,
        meta: { title: "Order History", requiresAuth: true, isAdmin: true },
      },
    ],
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
        meta: { title: "Home", requiresAuth: false, isAdmin: false },
      },
      {
        path: "products",
        name: "products",
        component: ProductsView,
        meta: { title: "Products", requiresAuth: false, isAdmin: false },
      },
      {
        path: "product/:id",
        name: "product-details",
        component: ProductDetailView,
        meta: { title: "Product Details", requiresAuth: false, isAdmin: false },
        props: true,
      },
      {
        path: "about-us",
        name: "about-us",
        component: AboutUsView,
        meta: { title: "About Us", requiresAuth: false, isAdmin: false },
      },
      {
        path: "contact",
        name: "contact",
        component: ContactView,
        meta: { title: "Contact", requiresAuth: false, isAdmin: false },
      },
      {
        path: "cart",
        name: "cart",
        component: CartView,
        meta: { title: "Shopping Cart", requiresAuth: true, isAdmin: false },
      },
      {
        path: "checkout",
        name: "checkout",
        component: CheckoutView,
        meta: { title: "Checkout", requiresAuth: true, isAdmin: false },
      },
      {
        path: "profile",
        name: "profile",
        component: ProfileView,
        meta: { title: "My Profile", requiresAuth: true, isAdmin: false },
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
        meta: { title: "Login" },
      },
      {
        path: "register",
        name: "register",
        component: RegisterView,
        meta: { title: "Register" },
      },
      {
        path: "ui-examples",
        name: "ui-examples",
        component: UIExampleView,
        meta: { title: "UI Examples", requiresAuth: false },
      },
      /*  {
        path: "collections/:category",
        name: "collection",
        component: CollectionView,
        meta: { title: "Collection", requiresAuth: false },
        props: true,
      }, */
    ],
  },
  // 404 - Keep this as the last route
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
    meta: { title: "Page Not Found" },
  },
];
