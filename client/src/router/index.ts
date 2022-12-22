import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AppView from "@/views/AppView.vue";
import MyListsView from "@/views/MyListsView.vue";
import SharedListsView from "@/views/SharedListsView.vue";
import MyGiftsViewVue from "@/views/MyGiftsView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SettingsView from "@/views/SettingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Accueil",
      component: HomeView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app",
      name: "Dashboard",
      component: AppView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/lists",
      name: "Mes listes",
      component: MyListsView,
      meta: {
        isHeaderLink: true,
      },
    },
    {
      path: "/app/shared",
      name: "Listes partagées avec moi",
      component: SharedListsView,
      meta: {
        isHeaderLink: true,
      },
    },
    {
      path: "/app/gifts",
      name: "Mes cadeaux",
      component: MyGiftsViewVue,
      meta: {
        isHeaderLink: true,
      },
    },
    {
      path: "/app/profile",
      name: "Mon compte",
      component: ProfileView,
      meta: {
        isDropdownLink: true,
      },
    },
    {
      path: "/app/settings",
      name: "Paramètres",
      component: SettingsView,
      meta: {
        isDropdownLink: true,
      },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;