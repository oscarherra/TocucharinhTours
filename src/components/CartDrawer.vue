<template>
  <div v-if="cart.isOpen" class="cart-overlay" @click="cart.close()">
    <aside class="cart-drawer" @click.stop>
      <header class="cart-head">
        <h3>Carrito de Compras</h3>
        <button class="icon-btn" @click="cart.close()" aria-label="Cerrar">
          <X :size="18" />
        </button>
      </header>

      <div class="cart-body">
        <div v-if="cart.items.length === 0" class="empty">
          <p>Tu carrito está vacío.</p>
        </div>

        <div v-else class="list">
          <article v-for="it in cart.items" :key="it.id" class="item">
            <img v-if="it.image" class="thumb" :src="it.image" alt="" />
            <div v-else class="thumb ph"></div>

            <div class="info">
              <div class="topline">
                <div class="title">{{ it.title }}</div>
                <button class="icon-btn mini" @click="cart.remove(it.id)" aria-label="Eliminar">
                  <Trash2 :size="16" />
                </button>
              </div>

              <div class="meta">{{ it.type }}</div>

              <div v-if="it.dateText" class="date">
                <CalendarDays :size="14" />
                <span>{{ it.dateText }}</span>
              </div>

              <div class="prices">
                <div class="unit">{{ formatMoney(it.priceNumber) }}</div>
                <div class="line">{{ formatMoney(it.priceNumber * (it.qty || 1)) }}</div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <footer class="cart-foot" v-if="cart.items.length > 0">
        <div class="totals">
          <div class="row">
            <span>Subtotal</span>
            <span>{{ formatMoney(cart.subtotal) }}</span>
          </div>
          <div class="row total">
            <span>Total</span>
            <span>{{ formatMoney(cart.total) }}</span>
          </div>
        </div>

        <button class="pay">Proceder al Pago</button>
        <button class="clear" @click="cart.clear()">Vaciar Carrito</button>
      </footer>
    </aside>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { X, Trash2, CalendarDays } from "lucide-vue-next";

const cart = useCartStore();

const formatMoney = (n) => {
  const num = Number(n || 0);
  return `$${num.toFixed(2)}`;
};
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
}

.cart-drawer {
  width: min(430px, 92vw);
  height: 100vh;
  background: #fff;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.22s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(16px);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.cart-head {
  padding: 18px 18px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}

.cart-head h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.icon-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #111;
}

.icon-btn svg {
  color: currentColor;
}

.icon-btn.mini {
  width: 34px;
  height: 34px;
  border-radius: 10px;
}

.icon-btn.mini:hover {
  background: #f3f3f3;
}

.cart-body {
  padding: 16px 18px;
  overflow: auto;
  flex: 1;
}

.empty {
  padding: 30px 6px;
  color: #444;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.item {
  border: 1px solid #ececec;
  border-radius: 14px;
  padding: 12px;
  display: grid;
  grid-template-columns: 74px 1fr;
  gap: 12px;
}

.thumb {
  width: 74px;
  height: 74px;
  border-radius: 10px;
  object-fit: cover;
}

.thumb.ph {
  background: #f2f2f2;
}

.info {
  min-width: 0;
}

.topline {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: start;
}

.title {
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta {
  color: #666;
  font-size: 0.9rem;
  margin-top: 4px;
}

.date {
  display: flex;
  gap: 8px;
  align-items: center;
  color: #666;
  margin-top: 8px;
  font-size: 0.9rem;
}

.prices {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: 800;
}

.unit {
  color: #111;
}

.line {
  color: #111;
}

.cart-foot {
  border-top: 1px solid #eee;
  padding: 14px 18px 18px;
}

.totals {
  margin-bottom: 12px;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: #555;
}

.row.total {
  font-size: 1.15rem;
  font-weight: 900;
  color: #111;
}

.pay {
  width: 100%;
  border: none;
  background: #111;
  color: #fff;
  padding: 13px 14px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  margin-bottom: 10px;
}

.clear {
  width: 100%;
  border: 1px solid #d8d8d8;
  background: #fff;
  color: #111;
  padding: 12px 14px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
}
</style>
