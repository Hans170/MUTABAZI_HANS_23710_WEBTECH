<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Login</h2>

      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />

      <p v-if="error" class="error">{{ error }}</p>

      <button @click="loginUser">Sign In</button>

      <p class="switch">
        Don't have an account?
        <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../store";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

function loginUser() {
  error.value = "";

  if (!username.value || !password.value) {
    error.value = "All fields are required.";
    return;
  }

  const user = store.users.find(
    u => u.username === username.value && u.password === password.value
  );

  if (!user) {
    error.value = "Invalid username or password.";
    return;
  }

  // ✅ FIX: Set the logged-in user
  store.user = user;

  router.push("/dashboard");
}
</script>