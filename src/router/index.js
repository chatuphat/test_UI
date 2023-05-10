import { createRouter, createWebHistory } from "vue-router";
import show_users from "../views/show_users.vue";
import add_user from "../views/add_users.vue";
import edit_user from "../views/edit_users.vue";
import show_doctorslot from "../views/show_doctorslot.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: show_users,
    },
    {
      path: "/add_user",
      component: add_user,
    },
    {
      path: "/edit_user/:id",
      component: edit_user,
    },
    {
      path: "/show_doctorslot",
      component: show_doctorslot,
    },
  ],
});

export default router;
