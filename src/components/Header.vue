<template>
  <header :class="['main-header', { scrolled }]">
    <div class="bar">
      <!-- MOBILE: botón menú -->
      <button class="icon-btn burger" type="button" @click="menuOpen = true" aria-label="Abrir menú">
        <Menu :size="20" :stroke-width="2" />
      </button>

      <!-- IZQUIERDA (desktop) -->
      <nav class="nav">
       <router-link class="link-nav" to="/tours">{{ t("nav.tours") }}</router-link>
        <a href="#transportes">{{ t("nav.transportes") }}</a>
        <a href="#visitar">{{ t("nav.visitar") }}</a>
        <a href="#eventos">{{ t("nav.eventos") }}</a>
        <a href="#nosotros">{{ t("nav.nosotros") }}</a>
      </nav>

      <!-- CENTRO -->
      <div class="brand">TOCUCHARINH TOURS</div>

      <!-- DERECHA -->
      <div class="actions" @click.stop>
        <button class="btn-outline desktop-only" type="button">
          {{ t("nav.reservaciones") }}
        </button>

        <!-- Idioma -->
        <div class="lang">
          <button class="lang-btn" @click="langOpen = !langOpen" aria-label="Idioma" type="button">
            <Globe :size="18" :stroke-width="2" />
            <span class="code">{{ String(locale).toUpperCase() }}</span>
            <ChevronDown :size="16" :stroke-width="2" />
          </button>

          <div v-if="langOpen" class="lang-panel">
            <div class="lang-title">{{ t("nav.idioma") }}</div>

            <button
              v-for="opt in options"
              :key="opt.code"
              class="lang-item"
              @click="setLang(opt.code)"
              type="button"
            >
              <span>{{ opt.label }}</span>
              <span v-if="opt.code === locale" class="check">✓</span>
            </button>
          </div>
        </div>

        <!-- Carrito -->
        <button class="cart" aria-label="Carrito" type="button" @click="$emit('open-cart')">
          <ShoppingCart :size="18" :stroke-width="2" />
          <span v-if="count > 0" class="badge">{{ count }}</span>
        </button>
      </div>
    </div>

    <!-- OVERLAY + DRAWER (mobile) -->
    <transition name="fade">
      <div v-if="menuOpen" class="overlay" @click="menuOpen = false"></div>
    </transition>

    <transition name="slide">
      <aside v-if="menuOpen" class="drawer" @click.stop>
        <div class="drawer-top">
          <div class="drawer-brand">COSTA RICA</div>
          <button class="icon-btn" type="button" @click="menuOpen = false" aria-label="Cerrar menú">
            <X :size="20" :stroke-width="2" />
          </button>
        </div>

        <nav class="drawer-nav">
          <a href="#tours" @click="menuOpen = false">{{ t("nav.tours") }}</a>
          <a href="#transportes" @click="menuOpen = false">{{ t("nav.transportes") }}</a>
          <a href="#visitar" @click="menuOpen = false">{{ t("nav.visitar") }}</a>
          <a href="#eventos" @click="menuOpen = false">{{ t("nav.eventos") }}</a>
          <a href="#nosotros" @click="menuOpen = false">{{ t("nav.nosotros") }}</a>
        </nav>

        <div class="drawer-actions">
          <button class="btn-outline w-full" type="button">
            {{ t("nav.reservaciones") }}
          </button>

          <div class="drawer-row">
            <button class="lang-btn w-full" @click="langOpen = !langOpen" type="button">
              <Globe :size="18" :stroke-width="2" />
              <span class="code">{{ String(locale).toUpperCase() }}</span>
              <ChevronDown :size="16" :stroke-width="2" />
            </button>
          </div>

          <div v-if="langOpen" class="lang-panel mobile-panel">
            <div class="lang-title">{{ t("nav.idioma") }}</div>
            <button
              v-for="opt in options"
              :key="opt.code"
              class="lang-item"
              @click="setLang(opt.code)"
              type="button"
            >
              <span>{{ opt.label }}</span>
              <span v-if="opt.code === locale" class="check">✓</span>
            </button>
          </div>

          <button class="cart w-full cart-full" type="button" @click="$emit('open-cart')">
            <span class="cart-left">
              <ShoppingCart :size="18" :stroke-width="2" />
              <span>Carrito</span>
            </span>
            <span class="badge-inline" v-if="count > 0">{{ count }}</span>
          </button>
        </div>
      </aside>
    </transition>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useCartStore } from "@/stores/cart";
import { Globe, ChevronDown, ShoppingCart, Menu, X } from "lucide-vue-next";

const scrolled = ref(false);
const langOpen = ref(false);
const menuOpen = ref(false);

const { locale, t } = useI18n();
const cart = useCartStore();
const count = computed(() => cart.count);

const options = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

const setLang = (code) => {
  locale.value = code;
  localStorage.setItem("locale", code);
  langOpen.value = false;
};

const handleScroll = () => (scrolled.value = window.scrollY > 80);

const closeOnOutside = () => {
  langOpen.value = false;
};

const closeOnEsc = (e) => {
  if (e.key === "Escape") {
    menuOpen.value = false;
    langOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("click", closeOnOutside);
  document.addEventListener("keydown", closeOnEsc);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", closeOnOutside);
  document.removeEventListener("keydown", closeOnEsc);
});
</script>

<style scoped>
/* ================== HEADER ================== */
.main-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 14px 0;
  background: transparent;
  transition: background 0.25s ease, box-shadow 0.25s ease;
}

.main-header.scrolled {
  background: #fff;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.08);
}

.bar {
  width: 100%;
  padding: 0 24px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
}

/* Desktop nav (izquierda) */
.nav {
  display: flex;
  gap: 22px;
  align-items: center;
}

/* Links */
.nav a {
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.98);
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
  white-space: nowrap;
}

.main-header.scrolled .nav a {
  color: #151515;
  text-shadow: none;
}

/* Brand */
.brand {
  justify-self: center;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.98);
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
  white-space: nowrap;
}

.main-header.scrolled .brand {
  color: #111;
  text-shadow: none;
}

/* Actions */
.actions {
  justify-self: end;
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;
}

.btn-outline {
  border-radius: 22px;
  padding: 9px 16px;
  font-weight: 700;
  cursor: pointer;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.9);
  color: rgba(255, 255, 255, 0.98);
}

.main-header.scrolled .btn-outline {
  border: 1px solid rgba(0, 0, 0, 0.18);
  color: #111;
}

/* Icon btn (burger / close) */
.icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.85);
  background: rgba(0, 0, 0, 0.18);
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #fff;
}

.main-header.scrolled .icon-btn {
  border: 1px solid rgba(0, 0, 0, 0.18);
  background: #fff;
  color: #111;
}

.burger {
  display: none; /* se muestra en mobile */
}

/* ================== IDIOMA ================== */
.lang {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 999px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.85);
  background: rgba(0, 0, 0, 0.18);
  color: #fff;
}

.main-header.scrolled .lang-btn {
  background: #fff;
  color: #111;
  border: 1px solid rgba(0, 0, 0, 0.18);
}

.lang-panel {
  position: absolute;
  top: 54px;
  right: 0;
  width: 270px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.16);
  padding: 10px;
  overflow: hidden;
  z-index: 1200;
}

.lang-title {
  font-weight: 900;
  color: #666;
  letter-spacing: 0.14em;
  font-size: 0.9rem;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
}

.lang-item {
  width: 100%;
  padding: 14px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.05rem;
  border-radius: 12px;
}

.lang-item:hover {
  background: #f4f4f4;
}

.check {
  font-weight: 900;
}

/* ================== CARRITO ================== */
.cart {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.85);
  background: rgba(0, 0, 0, 0.18);
  cursor: pointer;
  position: relative;
  display: grid;
  place-items: center;
  color: #fff;
}

.main-header.scrolled .cart {
  border: 1px solid rgba(0, 0, 0, 0.18);
  background: #fff;
  color: #111;
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #111;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 900;
  border: 2px solid #fff;
}

/* SVG hereda color */
.lang-btn svg,
.cart svg,
.icon-btn svg {
  color: currentColor;
}

/* ================== DRAWER MOBILE ================== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1100;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: min(360px, 90vw);
  height: 100vh;
  background: #fff;
  z-index: 1200;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.18);
}

.drawer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-brand {
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #111;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 4px;
}

.drawer-nav a {
  text-decoration: none;
  color: #111;
  font-weight: 700;
  padding: 12px 12px;
  border-radius: 12px;
}

.drawer-nav a:hover {
  background: #f4f4f4;
}

.drawer-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.w-full {
  width: 100%;
}

.mobile-panel {
  position: static;
  width: 100%;
  box-shadow: none;
  border: 1px solid #eee;
}

.cart-full {
  height: 48px;
  border-radius: 14px;
  justify-content: space-between;
  padding: 0 14px;
  display: flex;
  align-items: center;
  background: #fff;
  color: #111;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.cart-left {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  font-weight: 800;
}

.badge-inline {
  background: #111;
  color: #fff;
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 900;
  font-size: 12px;
}

/* ================== RESPONSIVE ================== */
.desktop-only {
  display: inline-flex;
}

/* <= 980px: ocultar nav y mostrar burger */
@media (max-width: 980px) {
  .nav {
    display: none;
  }
  .burger {
    display: grid;
  }

  .bar {
    grid-template-columns: auto 1fr auto;
  }

  .brand {
    justify-self: center;
    font-size: 0.95rem;
    letter-spacing: 0.16em;
  }

  .desktop-only {
    display: none;
  }
}

/* ================== TRANSITIONS ================== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.22s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
