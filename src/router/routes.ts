import type { RouteRecordRaw } from "vue-router";

// Layouts
const DefaultLayout = () => import("@layouts/DefaultLayout.vue");

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
const NotFoundView = () => import("@views/errors/NotFoundView.vue");

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
        meta: { title: "Home", requiresAuth: false },
      },
      {
        path: "products",
        name: "products",
        component: ProductsView,
        meta: { title: "Products", requiresAuth: false },
      },
      {
        path: "products/:id",
        name: "product-details",
        component: ProductDetailView,
        meta: { title: "Product Details", requiresAuth: false },
        props: true,
      },
      {
        path: "about-us",
        name: "about-us",
        component: AboutUsView,
        meta: { title: "About Us", requiresAuth: false },
      },
      {
        path: "contact",
        name: "contact",
        component: ContactView,
        meta: { title: "Contact", requiresAuth: false },
      },
      {
        path: "cart",
        name: "cart",
        component: CartView,
        meta: { title: "Shopping Cart", requiresAuth: true },
      },
      {
        path: "checkout",
        name: "checkout",
        component: CheckoutView,
        meta: { title: "Checkout", requiresAuth: true },
      },
      {
        path: "profile",
        name: "profile",
        component: ProfileView,
        meta: { title: "My Profile", requiresAuth: true },
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
    ],
  },
  // 404 - Keep this as the last route
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
    meta: { title: "Page Not Found", requiresAuth: false },
  },
];
