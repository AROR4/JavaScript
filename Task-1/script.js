const STORAGE_KEY = "todos-tasks";

const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const todoList = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");
const emptyState = document.getElementById("empty-state");
const clearCompletedButton = document.getElementById("clear-completed");

let tasks = loadTasks();

renderTasks();

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (!taskText) {
    return;
  }

  tasks.unshift({
    id: Date.now(),
    text: taskText,
    completed: false
  });

  saveTasks();
  renderTasks();
  todoForm.reset();
  taskInput.focus();
});

todoList.addEventListener("click", (event) => {
  const toggle = event.target.closest(".todo-check");
  const removeButton = event.target.closest(".delete-btn");

  if (toggle) {
    const id = toggle.getAttribute("value");
    tasks = tasks.map((task) =>
      String(task.id) === id ? { ...task, completed: toggle.checked } : task
    );
    saveTasks();
    renderTasks();
  }

  if (removeButton) {
    const id = removeButton.getAttribute("value");
    tasks = tasks.filter((task) => String(task.id) !== id);
    saveTasks();
    renderTasks();
  }
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

function renderTasks() {
  todoList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `todo-item${task.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-check";
    checkbox.checked = task.completed;
    checkbox.value = String(task.id);

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.value = String(task.id);
    deleteButton.textContent = "Delete";

    item.append(checkbox, text, deleteButton);
    todoList.appendChild(item);
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  taskCount.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"} • ${completedCount} completed`;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem(STORAGE_KEY);

  if (!storedTasks) {
    return [];
  }

  try {
    const parsedTasks = JSON.parse(storedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch {
    return [];
  }
}
