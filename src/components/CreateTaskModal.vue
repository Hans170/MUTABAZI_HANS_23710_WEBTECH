<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>Create New Task</h2>
      <p>Add a new task to your list.</p>

      <input v-model="title" placeholder="Title" />
      <textarea v-model="description" placeholder="Description"></textarea>

      <div class="row">
        <select v-model="priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input type="date" v-model="dueDate" />
      </div>

      <div class="actions">
        <button class="cancel-btn" @click="$emit('close')">Cancel</button>
        <button class="create-btn" @click="createTask">Create Task</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store, addTask } from "../store";

defineProps(["show"]);
const emit = defineEmits(["close"]);

const title = ref("");
const description = ref("");
const priority = ref("Medium");
const dueDate = ref("");

function createTask() {
  if (!title.value || !description.value || !dueDate.value) return;

  addTask({
    id: Date.now(),
    user: store.user.username,
    title: title.value,
    description: description.value,
    priority: priority.value,
    dueDate: dueDate.value,
    status: "To Do"
  });

  // Reset fields
  title.value = "";
  description.value = "";
  priority.value = "Medium";
  dueDate.value = "";

  emit("close");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: white;
  padding: 32px;
  border-radius: 12px;
  width: 480px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.modal p {
  font-size: 14px;
  color: #374151;
}

.modal input,
.modal textarea,
.modal select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
}

.modal textarea {
  min-height: 80px;
  resize: vertical;
}

.row {
  display: flex;
  gap: 16px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.create-btn {
  background: #111827;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.create-btn:hover {
  background: #1f2937;
}

.cancel-btn {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  color: #111827;
}

.cancel-btn:hover {
  background: #f9fafb;
}
</style>