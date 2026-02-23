<template>
  <div class="dashboard-page">
    <!-- Header -->
    <div class="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p>Here's a summary of your tasks for this week.</p>
      </div>

      <button class="create-btn" @click="showModal = true">
        + Create Task
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Today</h3>
        <p>{{ todayCount }}</p>
      </div>
      <div class="stat-card">
        <h3>Upcoming</h3>
        <p>{{ upcomingCount }}</p>
      </div>
      <div class="stat-card">
        <h3>Overdue</h3>
        <p class="overdue">{{ overdueCount }}</p>
      </div>
      <div class="stat-card">
        <h3>Completion</h3>
        <p>{{ completionRate }}%</p>
      </div>
    </div>

    <!-- Task Cards Grid -->
    <div class="task-grid">
      <TaskCard
        v-for="task in userTasks"
        :key="task.id"
        :task="task"
      />
    </div>

    <CreateTaskModal :show="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { store } from "../store";
import TaskCard from "../components/TaskCard.vue";
import CreateTaskModal from "../components/CreateTaskModal.vue";

const showModal = ref(false);

const userTasks = computed(() =>
  store.tasks.filter(t => t.user === store.user?.username)
);

const today = new Date().toISOString().split("T")[0];

const todayCount = computed(() =>
  userTasks.value.filter(t => t.dueDate === today).length
);

const upcomingCount = computed(() =>
  userTasks.value.filter(t => new Date(t.dueDate) > new Date() && t.status !== "Done").length
);

const overdueCount = computed(() =>
  userTasks.value.filter(t => new Date(t.dueDate) < new Date() && t.status !== "Done").length
);

const completionRate = computed(() => {
  if (!userTasks.value.length) return 0;
  const done = userTasks.value.filter(t => t.status === "Done").length;
  return Math.round((done / userTasks.value.length) * 100);
});
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.create-btn {
  background: #111827;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.stats-grid {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  flex: 1;
  text-align: center;
  border: 1px solid #e5e7eb;
}

.stat-card .overdue {
  color: #ef4444;
  font-weight: 600;
}

.task-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>