<template>
  <div class="tasks-page">
    <div class="page-header">
      <div>
        <h1>In Progress Tasks</h1>
        <p>Here's a list of your tasks for this week.</p>
      </div>

      <button class="create-btn" @click="showModal = true">+ Create Task</button>
    </div>

    <div class="task-grid">
      <TaskCard
        v-for="task in filteredTasks"
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

const filteredTasks = computed(() =>
  store.tasks.filter(t => {
    if (t.user !== store.user?.username) return false;
    if (t.status === "Done") return false;

    const diff = (new Date(t.dueDate) - new Date()) / (1000 * 60 * 60 * 24);
    return !(t.priority === "High" && diff <= 2); // exclude urgent To Do tasks
  })
);
</script>

<style scoped>
.page-header {
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
.task-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>