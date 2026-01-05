<script setup>
import ToursSection from "@/components/ToursSection.vue";
import TestimonialsSection from "@/components/TestimonialsSection.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="overlay"></div>

    <div class="hero-content">
      <h1>
        {{ t("hero.title1") }} <br />
        {{ t("hero.title2") }}
      </h1>

      <p>
        {{ t("hero.desc1") }} <br />
        {{ t("hero.desc2") }}
      </p>

      <div class="buttons">
        <button class="primary">{{ t("hero.btn1") }}</button>
        <button class="secondary">{{ t("hero.btn2") }}</button>
      </div>
    </div>
  </section>

  <ToursSection />
  <TestimonialsSection />
</template>



<style scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 100svh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Fondo */
.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=70");
  background-size: cover;
  background-position: center;
  transform: scale(1.03);
  z-index: 0;
}

/* Oscurece para que el texto se lea bien */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8%;
  color: #fff;
}

.hero h1 {
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 18px;
}

.hero p {
  max-width: 520px;
  line-height: 1.6;
  margin-bottom: 26px;
  opacity: 0.95;
}

.buttons button {
  margin-right: 15px;
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 0.95rem;
  cursor: pointer;
}

.primary {
  background: #000;
  color: #fff;
  border: none;
}

.secondary {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
}
</style>
