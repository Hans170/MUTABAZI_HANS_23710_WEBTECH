<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Create Account</h2>

      <input v-model="username" placeholder="Username" />
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />

      <p v-if="error" class="error">{{ error }}</p>

      <button @click="register">Sign Up</button>

      <p class="switch">
        Already have an account?
        <router-link to="/login">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../store";
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();

function register() {
  error.value = "";

  const usernameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = "All fields are required.";
    return;
  }

  if (!usernameRegex.test(username.value)) {
    error.value = "Username must contain letters only (no numbers).";
    return;
  }

  if (!emailRegex.test(email.value)) {
    error.value = "Enter a valid email address.";
    return;
  }

  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  const exists = store.users.find(u => u.username === username.value);
  if (exists) {
    error.value = "Username already exists.";
    return;
  }

  // ✅ Add new user and persist to localStorage
  store.users.push({
    username: username.value,
    email: email.value,
    password: password.value
  });
  localStorage.setItem("users", JSON.stringify(store.users));

  router.push("/login");
}
</script>