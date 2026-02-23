<template>
  <div
    class="task-card"
    :class="{ overdue: isOverdue, completed: task.status === 'Done' }"
  >
    <!-- Priority Badge -->
    <div class="priority" :class="task.priority.toLowerCase()">{{ task.priority }}</div>

    <!-- Title & Description -->
    <h3 class="title">{{ task.title }}</h3>
    <p class="description">{{ task.description }}</p>

    <!-- Meta Row -->
    <div class="meta-row">
      <span class="due-date">Due {{ formattedDate }}</span>

      <select v-model="status" @change="updateStatus">
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { store, updateTaskStatus } from "../store";

const props = defineProps({
  task: { type: Object, required: true },
});

const status = ref(props.task.status);

watch(status, (val) => updateTaskStatus(props.task.id, val));

const isOverdue = new Date(props.task.dueDate) < new Date() && props.task.status !== "Done";
const formattedDate = new Date(props.task.dueDate).toLocaleDateString();
function updateStatus() {
  updateTaskStatus(props.task.id, status.value);
}
</script>

<style scoped>
.task-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-card.overdue {
  border-color: #fca5a5;
}

.task-card.completed {
  opacity: 0.85;
}

.priority {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  width: fit-content;
}

.priority.high {
  background: #fee2e2;
  color: #dc2626;
}

.priority.medium {
  background: #fef3c7;
  color: #d97706;
}

.priority.low {
  background: #d1fae5;
  color: #047857;
}

.title {
  font-weight: 600;
  font-size: 16px;
  margin: 0;
}

.description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #6b7280;
}

select {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  cursor: pointer;
}
</style>