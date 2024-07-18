import { apiRequest } from './apiManagement.js';
export const checkDuplicateDescription = async (description, taskId) => {
  const tasks = await apiRequest('GET');
  return tasks.some((task) => {
    if (task.id !== taskId) return task.description.replace(/\s+/g, '').toLowerCase() === description.replace(/\s+/g, '').toLowerCase();
  });
};

export const sortTasksAlphabetically = (tasks) => {
  return tasks.sort((a, b) => a.description.toLowerCase().localeCompare(b.description.toLowerCase()));
};
