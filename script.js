/*function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  // Ajouter un bouton pour supprimer la tâche
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.onclick = function () {
    taskList.removeChild(taskItem);
  };

  // Ajouter un event pour marquer comme complété
  taskItem.onclick = function () {
    taskItem.classList.toggle("completed");
  };

  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  taskInput.value = ""; // Réinitialiser le champ de saisie
}
*/
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("task-list");

  tasks.forEach((task) => {
    createTaskElement(task.text, task.createdAt, task.dueDate, task.completed);
  });
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll("#task-list li")).map(
    (taskItem) => ({
      text: taskItem.querySelector(".task-text").textContent,
      createdAt: taskItem.dataset.createdAt,
      dueDate: taskItem.dataset.dueDate,
      completed: taskItem.classList.contains("completed"),
    })
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(
  taskText,
  createdAt = new Date().toLocaleString(),
  dueDate = "",
  completed = false
) {
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");
  taskItem.dataset.createdAt = createdAt;
  taskItem.dataset.dueDate = dueDate;

  const taskTextElement = document.createElement("span");
  taskTextElement.classList.add("task-text");
  taskTextElement.textContent = taskText;

  const createdDateElement = document.createElement("span");
  createdDateElement.classList.add("task-date");
  createdDateElement.textContent = `Ajouté: ${createdAt}`;

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.value = dueDate;
  dueDateInput.onchange = function () {
    taskItem.dataset.dueDate = dueDateInput.value;
    saveTasks();
  };

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.onclick = function () {
    taskList.removeChild(taskItem);
    saveTasks();
  };

  taskItem.onclick = function () {
    taskItem.classList.toggle("completed");
    saveTasks();
  };

  if (completed) {
    taskItem.classList.add("completed");
  }

  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(createdDateElement);
  taskItem.appendChild(dueDateInput);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  createTaskElement(taskText);
  saveTasks();
  taskInput.value = "";
}

document.addEventListener("DOMContentLoaded", loadTasks);
