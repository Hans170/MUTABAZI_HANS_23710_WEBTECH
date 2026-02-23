<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="logo">Task-Buddy</h2>

      <nav class="nav-links">
        <router-link
          to="/dashboard"
          :class="{ active: isActive('/dashboard') }"
          >Dashboard</router-link
        >
        <router-link
          to="/dashboard/todo"
          :class="{ active: isActive('/dashboard/todo') }"
          >To Do</router-link
        >
        <router-link
          to="/dashboard/in-progress"
          :class="{ active: isActive('/dashboard/in-progress') }"
          >In Progress</router-link
        >
        <router-link
          to="/dashboard/completed"
          :class="{ active: isActive('/dashboard/completed') }"
          >Completed</router-link
        >
      </nav>

      <hr />

      <div class="account">
        <p>ACCOUNT</p>
        <div class="user-info">
          <div class="avatar">{{ store.user?.username[0]?.toUpperCase() }}</div>
          <strong>{{ store.user?.username }}</strong>
        </div>
        <button @click="handleLogout" class="logout-btn">Log out</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { store, logout } from "../store";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function handleLogout() {
  logout();
  router.push("/login");
}

function isActive(path) {
  return route.path === path || route.path.startsWith(path + "/");
}
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #ffffff;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #fafafa;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 40px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nav-links a {
  text-decoration: none;
  color: #111827;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
}

.nav-links a.active {
  background: #f3f4f6;
  font-weight: 600;
}

hr {
  margin: 24px 0;
  border: 0.5px solid #e5e7eb;
}

.account .user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}

.avatar {
  background: #111827;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.logout-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-weight: 500;
  padding: 6px 0;
}

.content {
  flex: 1;
  padding: 32px;
}
</style>