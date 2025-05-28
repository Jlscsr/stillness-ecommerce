<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-3.5 md:py-4 px-3 sm:px-4 md:px-6 lg:px-8',
      isScrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent',
    ]"
  >
    <ShoppingCartSidebar :is-open="isCartOpen" @close="closeCart" />
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <Logo />

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <router-link
          to="/"
          class="text-charcoal/80 hover:text-charcoal text-sm tracking-wide transition-colors duration-300 relative group"
        >
          Home
          <span
            class="absolute bottom-0 left-0 w-0 h-px bg-beige transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
        <router-link
          to="/products"
          class="text-charcoal/80 hover:text-charcoal text-sm tracking-wide transition-colors duration-300 relative group"
        >
          Products
          <span
            class="absolute bottom-0 left-0 w-0 h-px bg-beige transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
        <router-link
          :to="{ name: 'about-us' }"
          class="text-charcoal/80 hover:text-charcoal text-sm tracking-wide transition-colors duration-300 relative group"
        >
          About Us
          <span
            class="absolute bottom-0 left-0 w-0 h-px bg-beige transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
        <router-link
          :to="{ name: 'contact' }"
          class="text-charcoal/80 hover:text-charcoal text-sm tracking-wide transition-colors duration-300 relative group"
        >
          Contact
          <span
            class="absolute bottom-0 left-0 w-0 h-px bg-beige transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
      </nav>

      <!-- Right Side Icons -->
      <div class="flex items-center space-x-4 md:space-x-6 relative z-10">
        <template v-if="isAuthenticated">
          <!-- User Account - Authenticated -->
          <div class="relative">
            <button
              @click="toggleUserMenu"
              class="text-charcoal/70 hover:text-charcoal transition-colors duration-300 flex items-center"
              aria-label="Account"
            >
              <User class="h-5 w-5" />
              <span class="ml-2 text-sm hidden lg:inline-block">{{
                user?.firstName
              }}</span>
              <span
                class="ml-1 text-xs text-charcoal/60 hidden lg:inline-block"
              >
                {{ user?.lastName }}
              </span>
            </button>

            <!-- User dropdown menu -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-cream border border-charcoal/10 rounded-sm shadow-md z-50"
            >
              <div class="py-2 px-4 border-b border-charcoal/10">
                <p class="text-sm font-medium text-charcoal">
                  {{ user?.firstName }} {{ user?.lastName }}
                </p>
                <p class="text-xs text-charcoal/60">{{ user?.email }}</p>
              </div>
              <div class="py-1">
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-charcoal hover:bg-beige/10"
                  @click="closeUserMenu"
                >
                  My Account
                </router-link>
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-charcoal hover:bg-beige/10"
                  @click="closeUserMenu"
                >
                  Orders
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-beige/10"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <!-- Shopping Cart -->
          <button
            @click="toggleCart"
            class="text-charcoal/70 hover:text-charcoal transition-colors duration-300 relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag class="h-5 w-5" />
            <span
              v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 bg-beige text-charcoal text-xs w-4 h-4 flex items-center justify-center rounded-full"
            >
              {{ cartItemsCount }}
            </span>
          </button>
        </template>

        <template v-else>
          <!-- Login Button - Unauthenticated -->
          <router-link
            :to="{ name: 'login' }"
            class="text-charcoal/70 hover:text-charcoal transition-colors duration-300 flex items-center"
          >
            <LogIn class="h-5 w-5 mr-1" />
            <span class="text-sm hidden sm:inline-block">Login</span>
          </router-link>

          <!-- Register Button - Unauthenticated -->
          <router-link
            :to="{ name: 'register' }"
            class="bg-beige text-charcoal px-4 py-2 rounded-sm hover:bg-beige/90 transition-colors text-sm hidden sm:inline-block"
          >
            Register
          </router-link>
          <router-link
            :to="{ name: 'register' }"
            class="text-charcoal/70 hover:text-charcoal transition-colors duration-300 sm:hidden"
            aria-label="Register"
          >
            <UserPlus class="h-5 w-5" />
          </router-link>
        </template>

        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden text-charcoal/70 hover:text-charcoal transition-colors duration-300"
          @click="toggleMobileMenu"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <X v-if="isMobileMenuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      :class="[
        'fixed inset-0 bg-cream z-40 transition-transform duration-500 ease-in-out transform md:hidden overflow-y-auto',
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
      style="height: 100vh"
    >
      <div class="px-6 py-8 h-full flex flex-col relative">
        <nav class="flex flex-col space-y-6">
          <router-link
            to="/"
            class="text-charcoal text-lg font-light tracking-wide"
            @click="closeMobileMenu"
          >
            Home
          </router-link>
          <router-link
            to="/products"
            class="text-charcoal text-lg font-light tracking-wide"
            @click="closeMobileMenu"
          >
            Products
          </router-link>
          <router-link
            :to="{ name: 'about-us' }"
            class="text-charcoal text-lg font-light tracking-wide"
            @click="closeMobileMenu"
          >
            About Us
          </router-link>
          <router-link
            :to="{ name: 'contact' }"
            class="text-charcoal text-lg font-light tracking-wide"
            @click="closeMobileMenu"
          >
            Contact
          </router-link>
        </nav>

        <div class="mt-auto pt-8 border-t border-charcoal/10">
          <template v-if="isAuthenticated">
            <div class="space-y-4">
              <div class="flex items-center mb-4">
                <div
                  class="w-10 h-10 bg-beige/30 rounded-full flex items-center justify-center mr-3"
                >
                  <User class="h-5 w-5 text-charcoal/70" />
                </div>
                <div>
                  <p class="text-charcoal font-medium">
                    {{ user?.firstName }} {{ user?.lastName }}
                  </p>
                  <p class="text-sm text-charcoal/60">{{ user?.email }}</p>
                </div>
              </div>
              <router-link
                to="/profile"
                class="block w-full py-3 text-center border border-charcoal/20 rounded-sm text-charcoal hover:bg-charcoal/5 transition-colors"
                @click="closeMobileMenu"
              >
                My Account
              </router-link>
              <button
                @click="handleMobileLogout"
                class="block w-full py-3 text-center bg-beige text-charcoal rounded-sm hover:bg-beige/90 transition-colors"
              >
                Logout
              </button>
            </div>
          </template>

          <template v-else>
            <div class="flex flex-col space-y-4">
              <router-link
                :to="{ name: 'login' }"
                class="block w-full py-3 text-center border border-charcoal/20 rounded-sm text-charcoal hover:bg-charcoal/5 transition-colors"
                @click="closeMobileMenu"
              >
                Login
              </router-link>
              <router-link
                :to="{ name: 'register' }"
                class="block w-full py-3 text-center bg-beige text-charcoal rounded-sm hover:bg-beige/90 transition-colors"
                @click="closeMobileMenu"
              >
                Register
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@stores/auth.store";
import { useCartStore } from "@stores/cart.store";

import { LogIn, User, ShoppingBag, Menu, X, UserPlus } from "lucide-vue-next";
import Logo from "@components/atoms/Logo.vue";
import ShoppingCartSidebar from "@components/cart/ShoppingCartSidebar.vue";

// Types
interface User {
  name: string;
  email: string;
}

// Store and router
const authStore = useAuthStore();
const cartStore = useCartStore();
const { cartItemsCount } = storeToRefs(cartStore);
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

// State
const isScrolled = ref(false);
const isUserMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);
const isCartOpen = ref(false);

// Methods
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const closeCart = () => {
  isCartOpen.value = false;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const closeUserMenu = () => {
  isUserMenuOpen.value = false;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleLogout = () => {
  isUserMenuOpen.value = false;
  authStore.logoutUser();
  cartStore.clearCart();
  router.push("/");
};

const handleMobileLogout = () => {
  handleLogout();
  closeMobileMenu();
};

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

// Prevent body scrolling when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  // Reset body overflow on unmount
  document.body.style.overflow = "";
});
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
