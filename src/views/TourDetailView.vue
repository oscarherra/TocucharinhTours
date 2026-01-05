<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import {
  Clock,
  Calendar,
  Mountain,
  Users,
  Bus,
  UserCheck,
  ShieldCheck,
} from "lucide-vue-next";

const route = useRoute();
const cart = useCartStore();

const tour = ref({
  id: route.params.id,
  title: "Ascenso al Volcán Misti",
  region: "AREQUIPA",
  duration: "2 Días",
  startTime: "06:00",
  difficulty: "Moderado",
  capacity: "10 max",
  transport: "Incluido",
  guide: "Incluido",
  languages: "ES, IT, EN, FR, PT",
  price: 100,
  heroImage:
    "https://images.unsplash.com/photo-1587502536263-9298f73f1e9c?auto=format&fit=crop&w=2000&q=80",
  description:
    "Vive una experiencia inolvidable ascendiendo el imponente Volcán Misti, uno de los guardianes de Arequipa. Este tour combina aventura, naturaleza y vistas panorámicas inigualables.",
});

const activeTab = ref("descripcion");

const addToCart = () => {
  cart.add({
    id: tour.value.id,
    title: tour.value.title,
    price: tour.value.price,
  });
};
</script>

<template>
  <div class="tour-detail">
    <!-- HERO -->
    <section class="hero">
      <img :src="tour.heroImage" alt="" />
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <span class="region">{{ tour.region }}</span>
        <h1>{{ tour.title }}</h1>

        <div class="hero-meta">
          <span><Clock :size="16" /> {{ tour.duration }}</span>
          <span><Mountain :size="16" /> {{ tour.difficulty }}</span>
        </div>
      </div>
    </section>

    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      Inicio <span>›</span> Tours <span>›</span> {{ tour.title }}
    </div>

    <!-- CONTENIDO -->
    <section class="content">
      <!-- IZQUIERDA -->
      <div class="main">
        <!-- Tabs -->
        <div class="tabs">
          <button
            v-for="tab in ['descripcion', 'itinerario', 'incluye', 'politicas']"
            :key="tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab.toUpperCase() }}
          </button>
        </div>

        <!-- DESCRIPCIÓN -->
        <div v-if="activeTab === 'descripcion'" class="tab-content">
          <p class="description">{{ tour.description }}</p>

          <div class="facts">
            <div><Clock /> <strong>Duración:</strong> {{ tour.duration }}</div>
            <div><Calendar /> <strong>Inicio:</strong> {{ tour.startTime }}</div>
            <div><Mountain /> <strong>Dificultad:</strong> {{ tour.difficulty }}</div>
            <div><Users /> <strong>Capacidad:</strong> {{ tour.capacity }}</div>
            <div><Bus /> <strong>Transporte:</strong> {{ tour.transport }}</div>
            <div><UserCheck /> <strong>Guía:</strong> {{ tour.guide }}</div>
            <div><ShieldCheck /> <strong>Idiomas:</strong> {{ tour.languages }}</div>
          </div>
        </div>
      </div>

      <!-- DERECHA -->
      <aside class="sidebar">
        <div class="price-box">
          <div class="price">
            ${{ tour.price }} <span>/ persona</span>
          </div>

          <div class="availability">
            ✔ Disponible todos los días
          </div>

          <button class="reserve" @click="addToCart">
            Reservar ahora
          </button>

          <button class="whatsapp">
            Reservar por WhatsApp
          </button>

          <ul class="benefits">
            <li>✔ Confirmación instantánea</li>
            <li>✔ Pagos seguros y encriptados</li>
            <li>✔ Modificación de fechas</li>
          </ul>
        </div>
      </aside>
    </section>
  </div>
</template>

<style scoped>

.tour-detail {
  background: #fff;
  color: #111;
  min-height: 100vh;
}


.hero {
  position: relative;
  height: 70vh;
  overflow: hidden;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.hero-content {
  position: absolute;
  bottom: 60px;
  left: 8%;
  color: #fff;
}

.hero-content h1 {
  font-size: 3.6rem;
  margin: 10px 0 14px;
}

.region {
  letter-spacing: 0.2em;
  font-size: 0.85rem;
  opacity: 0.9;
}

.hero-meta {
  display: flex;
  gap: 18px;
  font-size: 0.95rem;
  opacity: 0.95;
}

/* ================== BREADCRUMB ================== */
.breadcrumb {
  padding: 18px 8%;
  font-size: 0.9rem;
  color: #666;
}


.content {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  padding: 40px 8% 80px;
}


.tabs {
  display: flex;
  gap: 28px;
  border-bottom: 1px solid #e5e5e5;
}

.tabs button {
  background: none;
  border: none;
  padding: 14px 0;
  font-weight: 600;
  cursor: pointer;
  color: #666;
}

.tabs button.active {
  color: #111;
  border-bottom: 2px solid #111;
}


.description {
  margin: 30px 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #444;
}

.facts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.facts div {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #333;
}

/* ================== SIDEBAR ================== */
.sidebar {
  position: sticky;
  top: 120px;
}

.price-box {
  border: 1px solid #e5e5e5;
  padding: 26px;
  border-radius: 14px;
}

.price {
  font-size: 2.2rem;
  font-weight: 800;
}

.price span {
  font-size: 1rem;
  color: #666;
}

.availability {
  margin: 14px 0;
  padding: 12px;
  background: #ecfdf5;
  color: #065f46;
  border-radius: 8px;
  font-size: 0.95rem;
}

.reserve {
  width: 100%;
  padding: 14px;
  background: #111;
  color: #fff;
  border: none;
  margin-top: 14px;
  cursor: pointer;
  font-weight: 700;
}

.whatsapp {
  width: 100%;
  padding: 14px;
  background: #16a34a;
  color: #fff;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 700;
}

.benefits {
  list-style: none;
  padding: 0;
  margin-top: 18px;
  color: #444;
}

.benefits li {
  margin-bottom: 10px;
}


@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
