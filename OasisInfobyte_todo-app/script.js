// Initialize arrays to store tasks
let tasks = [];
let completedTasks = [];
// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, id: Date.now(), completed: false });
    renderTasks();
    taskInput.value = "";
  }
}
// Function to render tasks
function renderTasks() {
  const pendingTaskList = document.getElementById("pendingTaskList");
  const completedTaskList = document.getElementById("completedTaskList");
  // Clear previous tasks
  pendingTaskList.innerHTML = "";
  completedTaskList.innerHTML = "";
  // Render pending tasks
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("task-checkbox");
    checkbox.addEventListener("change", function () {
      task.completed = this.checked;
      if (task.completed) {
        completedTasks.push(task);
        tasks = tasks.filter((item) => item.id !== task.id);
      } else {
        tasks.push(task);
        completedTasks = completedTasks.filter((item) => item.id !== task.id);
      }
      renderTasks();
    });
    li.appendChild(checkbox);
    const taskText = document.createElement("span");
    taskText.classList.add("task-name");
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add("completed");
    }
    li.appendChild(taskText);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", function () {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        renderTasks();
      }
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter((item) => item.id !== task.id);
      renderTasks();
    });
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    pendingTaskList.appendChild(li);
  });
  // Render completed tasks
  completedTasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deletes-button");
    deleteButton.addEventListener("click", function () {
      completedTasks = completedTasks.filter((item) => item.id !== task.id);
      renderTasks();
    });
    li.appendChild(deleteButton);
    completedTaskList.appendChild(li);
  });
}
// Initial rendering of tasks
renderTasks();
