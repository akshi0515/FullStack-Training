import { fetchTasks } from "./apiManagement.js";
export const checkDuplicateDescription = async (description, taskId) => {
  const tasks = await fetchTasks();
  return tasks.some(
    (task) =>
      task.description.replace(/\s+/g, "").toLowerCase() ===
        description.replace(/\s+/g, "").toLowerCase() && task.id !== taskId
  );
};
