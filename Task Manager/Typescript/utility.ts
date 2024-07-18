import { apiRequest } from "./apiManagement.js";
import type { Task } from "../Interfaces/task.js";

export const checkDuplicateDescription = async (description: string, taskId?: string): Promise<boolean> => {
  const tasks: Task[] = (await apiRequest("GET")) as Task[];
  return tasks.some((task: Task): boolean => {
    if (task.id !== taskId) {
      return task.description?.replace(/\s+/g, "").toLowerCase() === description.replace(/\s+/g, "").toLowerCase();
    }
    return false;
  });
};

export const sortTasksAlphabetically = (tasks: Task[]): Task[] => {
  return tasks.sort((a: Task, b: Task): number => {
    const descriptionA = a.description?.toLowerCase() ?? "";
    const descriptionB = b.description?.toLowerCase() ?? "";
    return descriptionA.localeCompare(descriptionB);
  });
};
