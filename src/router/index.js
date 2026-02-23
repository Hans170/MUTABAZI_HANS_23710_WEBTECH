import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";

// Dashboard layout and children
import DashboardLayout from "../layouts/DashboardLayout.vue";
import Dashboard from "../pages/Dashboard.vue";
import Todo from "../pages/Todo.vue";
import InProgress from "../pages/InProgress.vue";
import Completed from "../pages/Completed.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },

  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: Dashboard },            // /dashboard
      { path: "todo", component: Todo },           // /dashboard/todo
      { path: "in-progress", component: InProgress }, // /dashboard/in-progress
      { path: "completed", component: Completed },   // /dashboard/completed
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.user) {
    next("/login");
  } else {
    next();
  }
});

export default router;