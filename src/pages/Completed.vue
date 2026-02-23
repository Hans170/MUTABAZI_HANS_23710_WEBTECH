<template>
  <div class="tasks-page">
    <h1>Completed Tasks</h1>
    <p>Here's a list of tasks you have completed.</p>

    <div class="task-grid">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { store } from "../store";
import TaskCard from "../components/TaskCard.vue";

const filteredTasks = computed(() =>
  store.tasks.filter(
    t => t.user === store.user?.username && t.status === "Done"
  )
);
</script>

<style scoped>
.tasks-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>