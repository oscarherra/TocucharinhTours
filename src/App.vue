<template>
  <Header />
  <RouterView />
    <CartDrawer />
</template>

<script setup>
import Header from "./components/Header.vue";
import CartDrawer from "./components/CartDrawer.vue";
</script>
