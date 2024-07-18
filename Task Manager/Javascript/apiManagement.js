const apiUrl = 'https://668d06cd099db4c579f16a16.mockapi.io/tasks';
console.log(apiUrl);
export const apiRequest = async (methodName = 'GET', taskId = null, newStatus = null, newDescription = null) => {
  try {
    const taskIdQuery = taskId ? `/${taskId}` : '';
    const response = await fetch(apiUrl + taskIdQuery, {
      method: `${methodName}`,
      headers: {
        'Content-Type': 'application/json',
      },
      ...((methodName === 'PUT' || methodName === 'POST') && {
        body: JSON.stringify({
          description: newDescription,
          status: newStatus,
        }),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
