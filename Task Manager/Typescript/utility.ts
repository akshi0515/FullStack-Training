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
  return tasks.sort((taskOne: Task, taskTwo: Task): number => {
    const descriptionOne = taskOne.description?.toLowerCase() ?? "";
    const descriptionTwo = taskTwo.description?.toLowerCase() ?? "";
    return descriptionOne.localeCompare(descriptionTwo);
  });
};
