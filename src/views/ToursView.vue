<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { Search, Clock, ArrowRight } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
const cart = useCartStore();

const q = ref("");
const tab = ref("all");

const tabs = [
  { key: "all", label: "TODOS" },
  { key: "aventura", label: "AVENTURA" },
  { key: "cultural", label: "CULTURAL" },
  { key: "naturaleza", label: "NATURALEZA" },
];

const tours = ref([
  {
    id: "misti",
    title: "Ascenso al Volcán Ricon de la Vieja",
    category: "aventura",
    excerpt:
      "Vive una experiencia inolvidable ascendiendo el imponente Volcán Misti. Este tour combina aventura, naturaleza y vistas panorámicas.",
    days: 2,
    priceNumber: 100,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "colca",
    title: "Tour Cañón del Colca 2 Días",
    category: "naturaleza",
    excerpt:
      "Disfruta una experiencia inolvidable en el majestuoso Cañón del Colca. Incluye miradores naturales, pueblos tradicionales y paisajes épicos.",
    days: 2,
    priceNumber: 150,
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "machu",
    title: "Tour Machu Picchu Full Day",
    category: "cultural",
    excerpt:
      "Descubre Machu Picchu en un tour completo de un día. Incluye transporte, guía profesional y una experiencia inolvidable recorriendo la Ciudadela Inca.",
    days: 1,
    priceNumber: 260,
    image:
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "vinicunca",
    title: "Montaña de 7 Colores (Vinicunca)",
    category: "aventura",
    excerpt:
      "Explora la impresionante Montaña de 7 Colores. Ruta temprana, paradas fotográficas y paisajes únicos para un recuerdo perfecto.",
    days: 1,
    priceNumber: 100,
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=70",
  },
]);

const list = computed(() => {
  const search = q.value.trim().toLowerCase();
  return tours.value.filter((t) => {
    const okTab = tab.value === "all" || t.category === tab.value;
    const okSearch =
      !search ||
      t.title.toLowerCase().includes(search) ||
      t.excerpt.toLowerCase().includes(search);
    return okTab && okSearch;
  });
});

const money = (n) => `$${Number(n).toFixed(0)}`;

const reserve = (t) => {
  cart.add({
    id: t.id,
    title: t.title,
    type: "Tour",
    priceNumber: t.priceNumber,
    price: `$${Number(t.priceNumber).toFixed(2)}`,
    image: t.image,
    dateText: "", // opcional
  });
  cart.open(); // abre el drawer
};

const details = (t) => router.push(`/tours/${t.id}`);
</script>

<template>
  <section class="tours-page">
    <!-- HERO -->
    <div class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>

      <div class="hero-inner">
        <div class="hero-kicker">PERÚ, SUDAMÉRICA</div>
        <h1>Descubre Experiencias Únicas</h1>
        <p>Tours diseñados para crear recuerdos inolvidables</p>
      </div>
    </div>

    <!-- INTRO + FILTROS -->
    <div class="container intro">
      <h2>
        Aventuras <br />
        <em>Extraordinarias</em>
      </h2>

      <p class="lead">
        Explora los destinos más impresionantes con nuestros tours cuidadosamente diseñados para brindarte
        experiencias auténticas.
      </p>

      <div class="filters">
        <div class="search">
          <Search :size="18" />
          <input v-model="q" type="text" placeholder="Buscar tours..." />
        </div>

        <div class="tabs">
          <button
            v-for="x in tabs"
            :key="x.key"
            type="button"
            :class="['tab', { active: tab === x.key }]"
            @click="tab = x.key"
          >
            {{ x.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- LISTA -->
    <div class="container list">
      <article
        v-for="(t, i) in list"
        :key="t.id"
        :class="['row', { reverse: i % 2 === 1 }]"
      >
        <div class="photo">
          <img :src="t.image" alt="" />
        </div>

        <div class="info">
          <h3>{{ t.title }}</h3>
          <p class="desc">{{ t.excerpt }}</p>

          <div class="meta">
            <span class="meta-item">
              <Clock :size="16" />
              <span>{{ t.days }} día{{ t.days > 1 ? "s" : "" }}</span>
            </span>

            <span class="dot">•</span>

            <span class="price">
              <span class="value">{{ money(t.priceNumber) }}</span>
              <span class="per">por persona</span>
            </span>
          </div>

          <div class="actions">
            <button class="primary" type="button" @click="reserve(t)">
              RESERVAR <ArrowRight :size="18" />
            </button>

            <button class="secondary" type="button" @click="details(t)">
              VER DETALLES
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* Página */
.tours-page {
  background: #fff;
}

/* HERO */
.hero {
  position: relative;
  min-height: 78vh;
  padding-top: 90px; /* deja espacio al header fixed */
  display: grid;
  align-items: end;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=70");
  background-size: cover;
  background-position: center;
  transform: scale(1.03);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(1000px 600px at 30% 80%, rgba(0,0,0,0.45), rgba(0,0,0,0.15));
}

.hero-inner {
  position: relative;
  z-index: 2;
  width: min(1200px, 92%);
  margin: 0 auto;
  padding: 0 0 46px;
  color: #fff;
}

.hero-kicker {
  letter-spacing: 0.28em;
  font-weight: 700;
  font-size: 0.75rem;
  opacity: 0.9;
}

.hero-inner h1 {
  margin: 14px 0 10px;
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  font-weight: 500;
  letter-spacing: -0.01em;
}

.hero-inner p {
  margin: 0;
  opacity: 0.9;
}

/* CONTENEDOR */
.container {
  width: min(1200px, 92%);
  margin: 0 auto;
}

/* INTRO */
.intro {
  padding: 56px 0 22px;
  text-align: center;
}

.intro h2 {
  margin: 0;
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  font-weight: 500;
  line-height: 1.05;
}

.intro h2 em {
  font-style: italic;
  font-weight: 500;
}

.lead {
  margin: 18px auto 0;
  max-width: 720px;
  color: #555;
  line-height: 1.7;
}

/* FILTROS */
.filters {
  margin: 34px auto 0;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 20px;
  align-items: center;
}

.search {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e2e2e2;
  padding: 14px 14px;
  background: #fff;
}

.search input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.95rem;
}

.tabs {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.tab {
  border: 1px solid #dadada;
  background: #fff;
  padding: 12px 18px;
  font-weight: 800;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  cursor: pointer;
  color: #222;
}

.tab.active {
  background: #111;
  border-color: #111;
  color: #fff;
}

/* LISTA */
.list {
  padding: 40px 0 70px;
}

.row {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 40px;
  align-items: center;
  padding: 38px 0;
  border-top: 1px solid #eee;
}

.row.reverse {
  grid-template-columns: 0.85fr 1.15fr;
}

.row.reverse .photo {
  order: 2;
}

.photo {
  height: 360px;
  overflow: hidden;
  background: #f3f3f3;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info h3 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 500;
  line-height: 1.08;
}

.desc {
  margin: 14px 0 18px;
  color: #555;
  line-height: 1.7;
  max-width: 520px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #666;
  margin-bottom: 18px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.dot {
  opacity: 0.6;
}

.price {
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
}

.value {
  font-size: 2rem;
  font-weight: 500;
  color: #111;
}

.per {
  font-size: 0.95rem;
  color: #666;
}

.actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.primary {
  border: none;
  background: #111;
  color: #fff;
  padding: 14px 20px;
  font-weight: 900;
  letter-spacing: 0.14em;
  font-size: 0.78rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.secondary {
  border: 1px solid #d8d8d8;
  background: #fff;
  color: #111;
  padding: 14px 22px;
  font-weight: 900;
  letter-spacing: 0.14em;
  font-size: 0.78rem;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 980px) {
  .filters {
    grid-template-columns: 1fr;
    justify-items: center;
  }
  .tabs {
    justify-content: center;
  }

  .row,
  .row.reverse {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .row.reverse .photo {
    order: 0;
  }
  .photo {
    height: 320px;
  }
  .info h3 {
    font-size: 1.9rem;
  }
}
</style>
