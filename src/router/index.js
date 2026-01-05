import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ToursView from "../views/ToursView.vue";
import TourDetailView from "../views/TourDetailView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tours",
      name: "tours",
      component: ToursView,
    },
    {
      path: "/tours/:id",
      name: "tour-detail",
      component: TourDetailView,
      props: true,
    },
  ],
});

export default router;
