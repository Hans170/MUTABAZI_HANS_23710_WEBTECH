<template>
  <div>
    <Navbar />

    <!-- HERO -->
    <section class="hero">
      <h1>Manage tasks with clarity</h1>
      <p>
        A simple, accessible, and open-source task manager
        for students and educators.
      </p>

      <div class="hero-buttons">
        <router-link to="/login" class="primary-btn">
          Get Started
        </router-link>

        <a href="#about" class="secondary-btn">
          Learn More
        </a>
      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="features-section">
      <div class="section-header">
        <h2>Powerful Features</h2>
        <p>Everything you need to stay organized and productive.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <h3>Task Management</h3>
          <p>Create, update and organize tasks efficiently.</p>
        </div>

        <div class="feature-card">
          <h3>Priority Levels</h3>
          <p>Mark tasks as Low, Medium or High priority.</p>
        </div>

        <div class="feature-card">
          <h3>Status Tracking</h3>
          <p>Move tasks between To Do, In Progress and Done.</p>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="about-section">
      <div class="about-content">
        <h2>About Task-Buddy</h2>
        <p>
          Task-Buddy is a modern task management platform built
          using Vue 3 and Vite. It demonstrates clean UI design,
          structured state management and smooth navigation.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>