import type { Task } from "../Interfaces/task.js";

const apiUrl = "https://668d06cd099db4c579f16a16.mockapi.io/tasks";

export const apiRequest = async (methodName: "GET" | "POST" | "PUT" | "DELETE", task?: Task): Promise<Task | Task[]> => {
  const taskIdQuery = task?.id ? `/${task.id}` : "";
  const url = apiUrl + taskIdQuery;
  const options: RequestInit = {
    method: methodName,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (methodName === "PUT" || methodName === "POST") {
    options.body = JSON.stringify({
      description: task?.description,
      status: task?.status
    });
  }

  const response: Response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as Task | Task[];
};
