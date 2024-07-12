import {
  fetchTasks,
  postTask,
  deleteTask,
  updateTask,
} from "./apiManagement.js";

import { checkDuplicateDescription } from "./validation.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("task-form");
  const filterSelect = document.getElementById("filter-select");
  const input = document.getElementById("task-input");
  const ul = document.getElementById("task-list");

  const displayData = (data) => {
    ul.innerHTML = "";
    const listItems = data.map((task) => {
      const li = document.createElement("li");
      li.dataset.taskId = task.id;
      let statusClass = task.status ? "Complete" : "InComplete";
      let statusButtonClass = task.status ? "completed" : "mark-complete";
      let statusIcon = task.status
        ? "fa-solid fa-check"
        : "fa-regular fa-circle";
      li.innerHTML = `
                <div class="task">
                  <div class="task-description">
                    <p class="title">Task:</p>
                    <p>${task.description}</p>
                  </div>
                  <div class="task-status">
                    <p class="title">Status:</p>
                    <p class="${statusClass.toLowerCase()}">${statusClass}</p>
                  </div>
                  <button class="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button class="${statusButtonClass}">
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
    const statusButtons = document.querySelectorAll(
      ".mark-complete, .completed"
    );
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

  const handleStatusToggle = async (event) => {
    const button = event.currentTarget;
    const taskElement = button.closest(".task");
    const taskLi = taskElement.closest("li");
    const descriptionElement = taskElement.querySelector(
      ".task-description p:last-child"
    );
    const taskId = taskLi.dataset.taskId;
    const description = descriptionElement.textContent;
    let newStatus;
    if (button.classList.contains("mark-complete")) {
      newStatus = true;
    } else {
      newStatus = false;
    }
    try {
      await updateTask(taskId, newStatus, description);
    } catch (error) {
      alert("Failed to update task status. Please try again.");
    }
    const selectedFilter = filterSelect.value;
    await renderData(selectedFilter);
  };

  const handleEdit = (event) => {
    const button = event.currentTarget;
    const taskElement = button.closest(".task");
    const descriptionElement = taskElement.querySelector(
      ".task-description p:last-child"
    );
    const statusElement = taskElement.querySelector(
      ".task-status p:last-child"
    );
    const taskLi = taskElement.closest("li");
    const taskId = taskLi.dataset.taskId;
    const currentStatus = statusElement.classList.contains("complete");

    const input = document.createElement("input");
    input.type = "text";
    input.value = descriptionElement.textContent;
    input.className = "edit-input";

    descriptionElement.replaceWith(input);
    input.focus();

    const updateDescription = async () => {
      const newDescription = input.value.trim();
      if (newDescription && newDescription !== descriptionElement.textContent) {
        try {
          if (await checkDuplicateDescription(newDescription, taskId)) {
            alert(
              "A task with this description already exists. Please enter a unique task."
            );
            input.replaceWith(descriptionElement);
            return;
          }

          await updateTask(taskId, currentStatus, newDescription);
          const newParagraph = document.createElement("p");
          newParagraph.textContent = newDescription;
          input.replaceWith(newParagraph);
        } catch (error) {
          alert("Failed to update task description. Please try again.");
          input.replaceWith(descriptionElement);
        }
      } else {
        input.replaceWith(descriptionElement);
      }
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
    await deleteTask(taskId);
    renderData();
  };

  const renderData = async (filter = "all") => {
    try {
      const data = await fetchTasks();
      const filteredData = filterTasks(data, filter);
      displayData(filteredData);
    } catch (error) {
      ul.innerHTML = "<p>Error loading data. Please try again later.</p>";
    }
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
    const selectedFilter = filterSelect.value;
    await renderData(selectedFilter);
  };

  const addNewTask = async (event) => {
    event.preventDefault();
    const description = input.value.trim();
    if (description) {
      try {
        const success = await postTask(description);
        if (success) {
          input.value = "";
          const selectedFilter = filterSelect.value;
          await renderData(selectedFilter);
        }
      } catch (error) {
        alert("Failed to add new task. Please try again.");
      }
    }
  };

  await renderData();
  filterSelect.addEventListener("change", handleFilterChange);
  form.addEventListener("submit", addNewTask);
});
