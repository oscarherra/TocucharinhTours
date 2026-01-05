<template>
  <section id="opiniones" class="testimonials">
    <div class="wrap">
      <div class="top">
        <h2>LO QUE DICEN NUESTROS CLIENTES</h2>

        <div class="nav">
          <button class="arrow" @click="prev" aria-label="Anterior">‹</button>
          <button class="arrow" @click="next" aria-label="Siguiente">›</button>
        </div>
      </div>
    </div>

    <div class="slider">
      <div class="track" :style="{ transform: `translateX(-${page * 100}%)` }">
        <div v-for="(chunk, i) in pages" :key="i" class="page">
          <article v-for="t in chunk" :key="t.name" class="card">
            <div class="bg" :style="{ backgroundImage: `url(${t.image})` }"></div>
            <div class="overlay"></div>

            <div class="content">
              <div class="stars" aria-label="Calificación">
                <span v-for="n in 5" :key="n">★</span>
              </div>

              <h3>{{ t.name }}</h3>
              <div class="meta">{{ t.meta }}</div>

              <p>{{ t.text }}</p>

              <button class="more" @click="openModal(t)">LEER MÁS</button>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Modal simple -->
    <div v-if="modal" class="modal" @click="modal = null">
      <div class="modal-card" @click.stop>
        <div class="modal-head">
          <div>
            <div class="modal-title">{{ modal.name }}</div>
            <div class="modal-meta">{{ modal.meta }}</div>
          </div>
          <button class="x" @click="modal = null" aria-label="Cerrar">✕</button>
        </div>
        <p class="modal-text">{{ modal.fullText || modal.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

const testimonials = [
  {
    name: "María García",
    meta: "TOUR PRIVADO – 2023",
    text:
      "El tour fue increíble. El transporte desde el hotel fue muy cómodo y puntual. Los guías conocen cada rincón...",
    fullText:
      "El tour fue increíble. El transporte desde el hotel fue muy cómodo y puntual. Los guías conocen cada rincón y hacen que la experiencia sea auténtica. Volveríamos sin dudarlo.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=70",
  },
  {
    name: "Carlos Rodríguez",
    meta: "TOUR EN GRUPO – 2024",
    text:
      "Reservamos el transporte con recogida en el aeropuerto y fue impecable. Las camionetas son modernas y confortables...",
    fullText:
      "Reservamos el transporte con recogida en el aeropuerto y fue impecable. Las camionetas son modernas y confortables. El recorrido fue súper ordenado y el chofer muy atento.",
    image:
      "https://images.unsplash.com/photo-1520975958225-45c1f3d17c1b?auto=format&fit=crop&w=1400&q=70",
  },
  {
    name: "Ana y Pedro Martínez",
    meta: "MIEMBROS DEL CLUB DESDE 2021",
    text:
      "Ser miembros del club nos ha dado acceso a eventos exclusivos y catas privadas. El servicio es de primera...",
    fullText:
      "Ser miembros del club nos ha dado acceso a eventos exclusivos y catas privadas. El servicio es de primera y el equipo siempre está pendiente. Recomendadísimo.",
    image:
      "https://images.unsplash.com/photo-1520975682031-ae5dbd12f9f4?auto=format&fit=crop&w=1400&q=70",
  },
  {
    name: "Luis Fernández",
    meta: "TOUR PREMIUM – 2024",
    text:
      "Contraté el tour premium con transporte VIP. Desde que nos recogieron hasta que nos dejaron en el hotel, todo fue perfecto...",
    fullText:
      "Contraté el tour premium con transporte VIP. Desde que nos recogieron hasta que nos dejaron en el hotel, todo fue perfecto. La comodidad del vehículo hizo el viaje aún mejor.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=70",
  },
  // Si querés más, duplicá o agregá aquí
];

const page = ref(0);
const modal = ref(null);

// 4 por página como la referencia
const pages = computed(() => {
  const perPage = 4;
  const out = [];
  for (let i = 0; i < testimonials.length; i += perPage) {
    out.push(testimonials.slice(i, i + perPage));
  }
  return out;
});

const next = () => {
  page.value = (page.value + 1) % pages.value.length;
};

const prev = () => {
  page.value = (page.value - 1 + pages.value.length) % pages.value.length;
};

const openModal = (t) => {
  modal.value = t;
};
</script>

<style scoped>
.testimonials {
  background: #fff;
  padding: 70px 0 30px;
}

.wrap {
  width: min(1200px, 92%);
  margin: 0 auto;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 26px;
}

.top h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2.6vw, 2.4rem);
  letter-spacing: 0.02em;
  font-weight: 900;
  color: #0b0b0b;
}

.nav {
  display: flex;
  gap: 10px;
}

.arrow {
  width: 46px;
  height: 46px;
  border-radius: 0;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: #fff;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
  display: grid;
  place-items: center;
}

.arrow:hover {
  background: #f3f3f3;
}

/* Slider */
.slider {
  overflow: hidden;
}

.track {
  display: flex;
  transition: transform 0.45s ease;
}

.page {
  width: 100%;
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  padding: 0 3.8%;
}

/* Card */
.card {
  position: relative;
  height: 440px;
  overflow: hidden;
  background: #111;
}

.bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.35) 45%,
    rgba(0, 0, 0, 0.12) 100%
  );
}

.content {
  position: absolute;
  inset: 0;
  padding: 18px 18px 18px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.stars {
  position: absolute;
  top: 18px;
  left: 18px;
  font-size: 18px;
}

.stars span {
  color: #f4c430; /* oro */
  margin-right: 2px;
}

.content h3 {
  margin: 0 0 6px;
  font-size: 1.9rem;
  line-height: 1.05;
  font-weight: 900;
}

.meta {
  font-size: 0.85rem;
  letter-spacing: 0.16em;
  opacity: 0.85;
  margin-bottom: 12px;
}

.content p {
  margin: 0 0 18px;
  font-style: italic;
  line-height: 1.55;
  opacity: 0.92;

  /* recorte tipo referencia */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.more {
  align-self: flex-start;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.7);
  color: #fff;
  padding: 10px 16px;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
}

.more:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 9999;
}

.modal-card {
  width: min(720px, 96%);
  background: #fff;
  border-radius: 18px;
  padding: 16px 18px 18px;
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
}

.modal-title {
  font-weight: 900;
  font-size: 1.3rem;
  color: #111;
}

.modal-meta {
  color: #555;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
}

.modal-text {
  margin: 0;
  color: #222;
  line-height: 1.7;
}

.x {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
}

/* Responsive */
@media (max-width: 1100px) {
  .page {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 4%;
  }
  .card {
    height: 420px;
  }
}

@media (max-width: 640px) {
  .top {
    flex-direction: column;
    align-items: flex-start;
  }
  .page {
    grid-template-columns: 1fr;
    padding: 0 5%;
  }
  .card {
    height: 460px;
  }
}
</style>
