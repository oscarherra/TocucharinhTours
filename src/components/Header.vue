<template>
  <header :class="['main-header', { scrolled }]">
    <div class="bar">
      <!-- MOBILE -->
      <button class="icon-btn burger" @click="menuOpen = true">
        <Menu :size="20" />
      </button>

      <!-- NAV -->
      <nav class="nav">
        <router-link to="/tours">{{ t("nav.tours") }}</router-link>
        <a href="#transportes">{{ t("nav.transportes") }}</a>
        <a href="#visitar">{{ t("nav.visitar") }}</a>
        <a href="#eventos">{{ t("nav.eventos") }}</a>
        <a href="#nosotros">{{ t("nav.nosotros") }}</a>
      </nav>

      <!-- LOGO -->
      <div class="brand">TOCUCHARINH TOURS</div>

      <!-- ACCIONES -->
      <div class="actions">
        <button class="btn-outline desktop-only">
          {{ t("nav.reservaciones") }}
        </button>

        <!-- IDIOMA -->
        <div class="lang">
          <button class="lang-btn" @click="langOpen = !langOpen">
            <Globe :size="18" />
            <span class="code">{{ locale.toUpperCase() }}</span>
            <ChevronDown :size="16" />
          </button>

          <div v-if="langOpen" class="lang-panel">
            <div class="lang-title">IDIOMA</div>

            <button
              v-for="opt in options"
              :key="opt.code"
              class="lang-item"
              @click="setLang(opt.code)"
            >
              <span>{{ opt.label }}</span>
              <span v-if="opt.code === locale" class="check">✓</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- OVERLAY -->
    <transition name="fade">
      <div v-if="menuOpen" class="overlay" @click="menuOpen = false"></div>
    </transition>

    <!-- DRAWER -->
    <transition name="slide">
      <aside v-if="menuOpen" class="drawer">
        <div class="drawer-top">
          <div class="drawer-brand">COSTA RICA</div>
          <button class="icon-btn" @click="menuOpen = false">
            <X />
          </button>
        </div>

        <nav class="drawer-nav">
          <a href="#tours" @click="menuOpen = false">Tours</a>
          <a href="#transportes" @click="menuOpen = false">Transportes</a>
          <a href="#visitar" @click="menuOpen = false">Visitar</a>
          <a href="#eventos" @click="menuOpen = false">Eventos</a>
          <a href="#nosotros" @click="menuOpen = false">Nosotros</a>
        </nav>

        <div class="drawer-actions">
          <button class="btn-outline w-full">
            {{ t("nav.reservaciones") }}
          </button>
        </div>
      </aside>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { Globe, ChevronDown, Menu, X } from "lucide-vue-next";

const { locale, t } = useI18n();

const scrolled = ref(false);
const langOpen = ref(false);
const menuOpen = ref(false);

const options = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

const setLang = (code) => {
  locale.value = code;
  langOpen.value = false;
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 80;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>

/* HEADER */
.main-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 14px 0;
  transition: 0.3s;
}

.main-header.scrolled {
  background: #fff;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.08);
}

/* GRID */
.bar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 24px;
}

/* NAV */
.nav {
  display: flex;
  gap: 20px;
}

.nav a {
  text-decoration: none;
  color: #fff;
}

.main-header.scrolled .nav a {
  color: #111;
}

/* BRAND */
.brand {
  text-align: center;
  font-weight: 800;
  color: #fff;
}

.main-header.scrolled .brand {
  color: #111;
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* BOTÓN */
.btn-outline {
  border-radius: 22px;
  padding: 9px 16px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.main-header.scrolled .btn-outline {
  border: 1px solid #ccc;
  color: #111;
}

/* ICON BUTTON */
.icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

/* LANG */
.lang {
  position: relative;
}

.lang-btn {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 20px;
  background: rgba(0,0,0,0.2);
  color: #fff;
  border: none;
}

.main-header.scrolled .lang-btn {
  background: #fff;
  color: #111;
}

/* LANG PANEL */
.lang-panel {
  position: absolute;
  right: 0;
  top: 50px;
  background: #fff;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.lang-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
}

.lang-item:hover {
  background: #f4f4f4;
}

/* OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
}

/* DRAWER */
.drawer {
  position: fixed;
  right: 0;
  top: 0;
  width: 280px;
  height: 100%;
  background: #fff;
  padding: 20px;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* RESPONSIVE */
.burger {
  display: none;
}

@media (max-width: 980px) {
  .nav {
    display: none;
  }
  .burger {
    display: block;
  }
}

/* TRANSITIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>