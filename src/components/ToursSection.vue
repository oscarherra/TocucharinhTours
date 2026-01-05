<template>
  <section class="tours" id="tours">
    <div class="wrap">
      <header class="head">
        <div>
          <h2>Nuestros</h2>
          <p class="subtitle">Tours Selectos.</p>
        </div>

        <p class="desc">
          Cada Tour es el resultado de nuestras aventuras y dedicación, combinando cultura,
          naturaleza e innovación para ofrecer experiencias inolvidables.
        </p>

        <a class="cta" href="#">EXPLORAR TOURS</a>
      </header>
    </div>

    <div class="grid">
      <article class="card" v-for="t in tours" :key="t.title">
        <div class="img" :style="{ backgroundImage: `url(${t.image})` }"></div>
        <div class="shade"></div>

        <div class="content">
          <h3>{{ t.title }}</h3>
          <p>{{ t.excerpt }}</p>
          <div class="price">{{ t.price }}</div>

          <div class="actions">
            <!-- ✅ ESTE es el cambio: button + click -->
            <button class="link" @click="addToCart(t)">Reservar</button>
            <a href="#">Ver Detalles</a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from "../stores/cart"; // si usas @/stores/cart, cambia esta línea

const cart = useCartStore();

const addToCart = (t) => {
  cart.add({
    title: t.title,
    price: t.price,
    priceNumber: t.priceNumber,
  });
};

const tours = [
  {
    title: "Ascenso al Volcán Ricón de la Vieja",
    excerpt: "Vive una experiencia inolvidable ascendiendo un volcán impresionante.",
    price: "$100.00",
    priceNumber: 100,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=70",
  },
  {
    title: "Tour Cañón del Colca 2 Días",
    excerpt: "Disfruta una aventura entre miradores y paisajes épicos del Colca.",
    price: "$150.00",
    priceNumber: 150,
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=70",
  },
  {
    title: "Tour Machu Picchu Full Day",
    excerpt: "Descubre Machu Picchu en un tour completo de un día. Incluye...",
    price: "$260.00",
    priceNumber: 260,
    image:
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1400&q=70",
  },
  {
    title: "Montaña de 7 Colores (Vinicunca)",
    excerpt: "Explora la impresionante Montaña de 7 Colores, uno de los atractivos...",
    price: "$100.00",
    priceNumber: 100,
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=70",
  },
];
</script>

<style scoped>
/* Sección */
.tours {
  background: #fff;
  padding: 110px 0 0;
}

.wrap {
  width: min(1200px, 92%);
  margin: 0 auto;
}

.head {
  padding: 10px 0 40px;
  max-width: 900px;
}

.head h2 {
  font-size: clamp(3rem, 6vw, 4.2rem);
  line-height: 1;
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0b0b0b;
}

.subtitle {
  margin: 10px 0 0;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-style: italic;
  color: #2b2b2b;
}

.desc {
  margin: 28px 0 18px;
  color: #303030;
  line-height: 1.7;
  max-width: 760px;
}

.cta {
  display: inline-block;
  font-weight: 700;
  letter-spacing: 0.04em;
  font-size: 0.85rem;
  color: #0b0b0b;
  text-decoration: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 6px;
}

/* Grid full width como referencia */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 0 8px 8px;
}

.card {
  position: relative;
  height: 78vh;
  min-height: 520px;
  overflow: hidden;
  border-radius: 0;
}

.img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
  transition: transform 0.7s ease;
}

.shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.72) 0%,
    rgba(0, 0, 0, 0.35) 35%,
    rgba(0, 0, 0, 0) 65%
  );
}

.card:hover .img {
  transform: scale(1.08);
}

.content {
  position: absolute;
  inset: auto 0 0 0;
  padding: 22px 22px 18px;
  color: #fff;
}

.content h3 {
  margin: 0 0 10px;
  font-size: 1.9rem;
  line-height: 1.1;
  font-weight: 800;
}

.content p {
  margin: 0 0 14px;
  max-width: 90%;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
}

.price {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 10px;
}

/* ✅ Tus links + botón con mismo estilo */
.actions a,
.link {
  margin-right: 18px;
  color: rgba(255, 255, 255, 0.92);
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  padding-bottom: 3px;
  font-size: 0.95rem;
  background: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .card {
    height: 60vh;
    min-height: 460px;
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0 10px 10px;
  }
  .card {
    height: 65vh;
    min-height: 520px;
  }
  .content h3 {
    font-size: 1.7rem;
  }
  .price {
    font-size: 1.8rem;
  }
}
</style>
