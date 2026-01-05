import { createI18n } from "vue-i18n";

const messages = {
  es: {
    nav: {
      tours: "Tours",
      transportes: "Transportes",
      visitar: "Visitar",
      eventos: "Eventos",
      nosotros: "Nosotros",
      reservaciones: "Reservaciones",
      login: "Login",
      idioma: "Idioma",
    },
    hero: {
      title1: "Explora los",
      title2: "Mejores Destinos",
      desc1: "Descubre experiencias únicas en los lugares",
      desc2: "más hermosos del mundo",
      btn1: "Planifica tu viaje",
      btn2: "Compra ahora",
    },
  },

  en: {
    nav: {
      tours: "Tours",
      transportes: "Transport",
      visitar: "Visit",
      eventos: "Events",
      nosotros: "About",
      reservaciones: "Bookings",
      login: "Login",
      idioma: "Language",
    },
    hero: {
      title1: "Explore the",
      title2: "Best Destinations",
      desc1: "Discover unique experiences in the",
      desc2: "most beautiful places in the world",
      btn1: "Plan your trip",
      btn2: "Buy now",
    },
  },

  fr: {
    nav: {
      tours: "Tours",
      transportes: "Transports",
      visitar: "Visiter",
      eventos: "Événements",
      nosotros: "À propos",
      reservaciones: "Réservations",
      login: "Connexion",
      idioma: "Langue",
    },
    hero: {
      title1: "Explorez les",
      title2: "Meilleures Destinations",
      desc1: "Découvrez des expériences uniques dans les",
      desc2: "plus beaux endroits du monde",
      btn1: "Planifier votre voyage",
      btn2: "Acheter maintenant",
    },
  },
};

const saved = localStorage.getItem("locale") || "es";

export const i18n = createI18n({
  legacy: false,
  locale: saved,
  fallbackLocale: "es",
  messages,
});
