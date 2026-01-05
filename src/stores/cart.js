import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    isOpen: false,
  }),

  getters: {
    count: (s) => s.items.reduce((acc, it) => acc + (it.qty || 1), 0),
    subtotal: (s) => s.items.reduce((acc, it) => acc + (it.priceNumber || 0) * (it.qty || 1), 0),
    total: (s) => s.items.reduce((acc, it) => acc + (it.priceNumber || 0) * (it.qty || 1), 0),
  },

  actions: {
    open() {
      this.isOpen = true;
      document.documentElement.style.overflow = "hidden";
    },
    close() {
      this.isOpen = false;
      document.documentElement.style.overflow = "";
    },
    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    add(item) {
      // Si ya existe, suma qty
      const found = this.items.find((x) => x.id === item.id || x.title === item.title);
      if (found) {
        found.qty = (found.qty || 1) + 1;
        return;
      }

      this.items.push({
        id: item.id || item.title,
        title: item.title,
        type: item.type || "Tour",
        dateText: item.dateText || "", // opcional
        price: item.price || `$${(item.priceNumber || 0).toFixed(2)}`,
        priceNumber: item.priceNumber || 0,
        image: item.image || "",
        qty: 1,
      });
    },

    remove(id) {
      this.items = this.items.filter((x) => x.id !== id);
    },

    clear() {
      this.items = [];
    },
  },
});
