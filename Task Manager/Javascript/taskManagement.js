import { apiRequest } from "./apiManagement.js";

import { checkDuplicateDescription, sortTasksAlphabetically } from "./utility.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("task-form");
  const filterSelect = document.getElementById("filter-select");
  const input = document.getElementById("task-input");
  const ul = document.getElementById("task-list");
  let selectedFilter = filterSelect.value;

  const displayData = (data) => {
    ul.innerHTML = "";
    const listItems = data.map((task) => {
      const li = document.createElement("li");
      li.dataset.taskId = task.id;
      const statusClass = task.status ? "Complete" : "InComplete";
      const statusButtonClass = task.status ? "completed" : "mark-complete";
      const statusIcon = task.status ? "fa-solid fa-check" : "fa-regular fa-circle";
      li.innerHTML = `
                <div class="task">
                  <div class="task-description">
                    <p class="title">Task:</p>
                    <p class="${task.status ? "completed-task" : "incomplete-task"}">${task.description}</p>
                  </div>
                  <div class="task-status">
                    <p class="title">Status:</p>
                    <p class="${statusClass.toLowerCase()}">${statusClass}</p>
                  </div>
                  <button class="edit" ${task.status ? "disabled" : ""}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button class="${statusButtonClass}" ${task.status ? "disabled" : ""}>
                    <i class="${statusIcon}"></i>
                  </button>
                  <button class="delete">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              `;
      return li;
    });
    listItems.forEach((li) => ul.appendChild(li));
    addEventListeners();
  };

  const addEventListeners = () => {
    const editButtons = document.querySelectorAll(".edit");
    const statusButtons = document.querySelectorAll(".mark-complete, .completed");
    const deleteButtons = document.querySelectorAll(".delete");

    editButtons.forEach((button) => {
      button.addEventListener("click", handleEdit);
    });

    statusButtons.forEach((button) => {
      button.addEventListener("click", handleStatusToggle);
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", handleDelete);
    });
  };

  const handleStatusToggle = (event) => {
    const button = event.currentTarget;
    const taskElement = button.closest(".task");
    const taskLi = taskElement.closest("li");
    const descriptionElement = taskElement.querySelector(".task-description p:last-child");
    const taskId = taskLi.dataset.taskId;
    const description = descriptionElement.textContent;

    if (button.classList.contains("mark-complete")) {
      apiRequest("PUT", taskId, true, description)
        .then(async () => {
          await renderData(selectedFilter);
        })
        .catch(() => {
          alert("Failed to update task status. Please try again.");
        });
    }
  };

  const handleEdit = (event) => {
    const button = event.currentTarget;
    if (button.disabled) return;

    const taskElement = button.closest(".task");
    const descriptionElement = taskElement.querySelector(".task-description p:last-child");
    const statusElement = taskElement.querySelector(".task-status p:last-child");
    const taskLi = taskElement.closest("li");
    const taskId = taskLi.dataset.taskId;
    const currentStatus = statusElement.classList.contains("complete");
    if (currentStatus) return;

    const input = document.createElement("input");
    input.type = "text";
    input.value = descriptionElement.textContent;
    input.className = "edit-input";

    descriptionElement.replaceWith(input);
    input.focus();

    const updateDescription = async () => {
      const newDescription = input.value.trim();

      if (!newDescription || newDescription === descriptionElement.textContent) {
        return input.replaceWith(descriptionElement);
      }

      checkDuplicateDescription(newDescription, taskId)
        .then(async (isDuplicate) => {
          if (isDuplicate) {
            throw new Error("A task with this description already exists. Please enter a unique task.");
          }
          await apiRequest("PUT", taskId, currentStatus, newDescription);
          await renderData(selectedFilter);
        })
        .catch((error) => {
          alert(error.message || "Failed to update task description. Please try again.");
          input.replaceWith(descriptionElement);
        });
    };

    input.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        input.blur();
      }
    });

    input.addEventListener("blur", updateDescription);
  };

  const handleDelete = async (event) => {
    const button = event.currentTarget;
    const taskLi = button.closest("li");
    const taskId = taskLi.dataset.taskId;
    await apiRequest("DELETE", taskId);
    renderData(selectedFilter);
  };

  const renderData = async (filter = "all") => {
    apiRequest("GET")
      .then((data) => filterTasks(data, filter))
      .then((data) => sortTasksAlphabetically(data))
      .then((filteredData) => displayData(filteredData))
      .catch(() => {
        ul.innerHTML = "<p>Error loading data. Please try again later.</p>";
      });
  };

  const filterTasks = (tasks, filter) => {
    switch (filter) {
    case "incomplete":
      return tasks.filter((task) => !task.status);
    case "completed":
      return tasks.filter((task) => task.status);
    default:
      return tasks;
    }
  };

  const handleFilterChange = async () => {
    selectedFilter = filterSelect.value;
    await renderData(selectedFilter);
  };

  const addNewTask = async (event) => {
    event.preventDefault();
    const description = input.value.trim();

    if (description) {
      checkDuplicateDescription(description)
        .then(async (isDuplicate) => {
          if (isDuplicate) {
            throw new Error("A task with this description already exists. Please enter a unique task.");
          }
          await apiRequest("POST", null, false, description);
          input.value = "";
          await renderData(selectedFilter);
        })
        .catch((error) => {
          alert(error.message || "Failed to add new task. Please try again.");
        });
    }
  };

  await renderData("GET");
  filterSelect.addEventListener("change", handleFilterChange);
  form.addEventListener("submit", addNewTask);
});
