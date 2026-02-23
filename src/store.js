import { reactive, watch } from "vue";

export const store = reactive({
  user: JSON.parse(localStorage.getItem("user")) || null,
  users: JSON.parse(localStorage.getItem("users")) || [],
  tasks: JSON.parse(localStorage.getItem("tasks")) || []
});

watch(
  () => store.tasks,
  (val) => localStorage.setItem("tasks", JSON.stringify(val)),
  { deep: true }
);

watch(
  () => store.user,
  (val) => localStorage.setItem("user", JSON.stringify(val))
);

export function login(username, password) {
  const found = store.users.find(
    u => u.username === username && u.password === password
  );
  if (found) {
    store.user = found;
    return true;
  }
  return false;
}

export function signup(username, email, password) {
  if (store.users.find(u => u.username === username)) return false;
  store.users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(store.users));
  return true;
}

export function logout() {
  store.user = null;
}

export function addTask(task) {
  store.tasks.push(task);
}

export function updateTaskStatus(id, status) {
  const task = store.tasks.find(t => t.id === id);
  if (task) task.status = status;
}