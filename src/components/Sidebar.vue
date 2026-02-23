<template>
  <div class="sidebar">
    <h2 class="brand">Task-Buddy</h2>

    <router-link to="/dashboard" active-class="active">Dashboard</router-link>
    <router-link to="/todo" active-class="active">To Do</router-link>
    <router-link to="/in-progress" active-class="active">In Progress</router-link>
    <router-link to="/completed" active-class="active">Completed</router-link>

    <div class="account">
      <p class="account-label">ACCOUNT</p>

      <div class="user">
        <div class="avatar">
          {{ store.user?.username?.charAt(0).toUpperCase() }}
        </div>
        <span>{{ store.user?.username }}</span>
      </div>

      <span class="logout" @click="handleLogout">Log out</span>
    </div>
  </div>
</template>

<script setup>
import { store, logout } from "../store";
import { useRouter } from "vue-router";

const router = useRouter();

function handleLogout() {
  logout();
  router.push("/");
}
</script>