import { apiRequest } from "./apiManagement.js";
import { checkDuplicateDescription, sortTasksAlphabetically } from "./utility.js";
import type { Task } from "../Interfaces/task.js";

document.addEventListener("DOMContentLoaded", async (): Promise<void> => {
  const form = document.getElementById("task-form") as HTMLFormElement;
  const filterSelect = document.getElementById("filter-select") as HTMLSelectElement;
  const input = document.getElementById("task-input") as HTMLInputElement;
  const ul = document.getElementById("task-list") as HTMLUListElement;
  let selectedFilter = filterSelect.value;
  const displayData = (data: Task[]): void => {
    ul.innerHTML = "";
    const listItems = data.map((task: Task): HTMLLIElement => {
      const li = document.createElement("li");
      li.dataset.taskId = task.id;
      const status = task.status ? "Complete" : "InComplete";
      const statusButtonClass = task.status ? "completeButton" : "inCompleteButton";
      const statusIcon = task.status ? "fa-solid fa-check" : "fa-regular fa-circle";
      const taskDescriptionClass = task.status ? "completedTask" : "inCompleteTask";
      li.innerHTML = `
                  <div class="task">
                    <div class="task-description">
                      <p class="title">Task:</p>
                      <p class="${taskDescriptionClass}">${task.description}</p>
                    </div>
                    <div class="task-status">
                      <p class="title">Status:</p>
                      <p class="${status}">${status}</p>
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
    listItems.forEach((li: HTMLLIElement): HTMLLIElement => ul.appendChild(li));
    addEventListeners();
  };

  const addEventListeners = (): void => {
    const editButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".edit");
    const statusButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".completeButton, .inCompleteButton");
    const deleteButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".delete");

    editButtons.forEach((button: HTMLButtonElement): void => {
      button.addEventListener("click", handleEdit);
    });

    statusButtons.forEach((button: HTMLButtonElement): void => {
      button.addEventListener("click", handleStatusToggle);
    });

    deleteButtons.forEach((button: HTMLButtonElement): void => {
      button.addEventListener("click", handleDelete);
    });
  };

  const handleStatusToggle = (event: MouseEvent): void => {
    const button = event.currentTarget as HTMLButtonElement;
    const taskElement = button.closest(".task") as HTMLElement;
    const taskLi = taskElement.closest("li") as HTMLLIElement;
    const descriptionElement = taskElement.querySelector(".task-description p:last-child") as HTMLParagraphElement;
    const taskId = taskLi.dataset.taskId;
    const description = descriptionElement.textContent as string;

    if (button.classList.contains("inCompleteButton")) {
      apiRequest("PUT", { id: taskId, status: true, description: description })
        .then(async (): Promise<void> => {
          await renderData(selectedFilter);
        })
        .catch((): void => {
          alert("Failed to update task status. Please try again.");
        });
    }
  };

  const handleEdit = (event: MouseEvent): void => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.disabled) return;

    const taskElement = button.closest(".task") as HTMLElement;
    const descriptionElement = taskElement.querySelector(".task-description p:last-child") as HTMLParagraphElement;
    const statusElement = taskElement.querySelector(".task-status p:last-child") as HTMLParagraphElement;
    const taskLi = taskElement.closest("li") as HTMLLIElement;
    const taskId = taskLi.dataset.taskId;
    const currentStatus: boolean = statusElement.classList.contains("complete");
    if (currentStatus) return;

    const input = document.createElement("input");
    input.type = "text";
    input.value = descriptionElement.textContent || "";
    input.className = "edit-input";

    descriptionElement.replaceWith(input);
    input.focus();

    const updateDescription = async (): Promise<void> => {
      const newDescription = input.value.trim();

      if (!newDescription || newDescription === descriptionElement.textContent) {
        input.replaceWith(descriptionElement);
        return;
      }

      try {
        const isDuplicate: boolean = await checkDuplicateDescription(newDescription, taskId);
        if (isDuplicate) {
          throw new Error("A task with this description already exists. Please enter a unique task.");
        }
        await apiRequest("PUT", {
          id: taskId,
          status: currentStatus,
          description: newDescription,
        });
        await renderData(selectedFilter);
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to update task description. Please try again.");
        input.replaceWith(descriptionElement);
      }
    };

    input.addEventListener("keypress", (e: KeyboardEvent): void => {
      if (e.key === "Enter") {
        e.preventDefault();
        input.blur();
      }
    });

    input.addEventListener("blur", updateDescription);
  };

  const handleDelete = async (event: MouseEvent): Promise<void> => {
    const button = event.currentTarget as HTMLButtonElement;
    const taskLi = button.closest("li") as HTMLLIElement;
    const taskId = taskLi.dataset.taskId;
    await apiRequest("DELETE", { id: taskId });
    await renderData(selectedFilter);
  };

  const renderData = async (filter: string = "all"): Promise<void> => {
    try {
      const data = (await apiRequest("GET")) as Task[];
      const filteredData = filterTasks(data, filter);
      const sortedData = sortTasksAlphabetically(filteredData);
      displayData(sortedData);
    } catch (error) {
      ul.innerHTML = "<p>Error loading data. Please try again later.</p>";
    }
  };

  const filterTasks = (tasks: Task[], filter: string): Task[] => {
    switch (filter) {
    case "incomplete":
      return tasks.filter((task: Task): boolean => !task.status);
    case "completed":
      return tasks.filter((task: Task): boolean => !!task.status);
    default:
      return tasks;
    }
  };

  const handleFilterChange = async (): Promise<void> => {
    selectedFilter = filterSelect.value;
    await renderData(selectedFilter);
  };

  const addNewTask = async (event: Event): Promise<void> => {
    event.preventDefault();
    const description = input.value.trim();

    if (description) {
      try {
        const isDuplicate: boolean = await checkDuplicateDescription(description);
        if (isDuplicate) {
          throw new Error("A task with this description already exists. Please enter a unique task.");
        }
        await apiRequest("POST", { status: false, description: description });
        input.value = "";
        await renderData(selectedFilter);
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to add new task. Please try again.");
      }
    }
  };

  await renderData("GET");
  filterSelect.addEventListener("change", handleFilterChange);
  form.addEventListener("submit", addNewTask);
});
