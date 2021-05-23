export default class Api {
  constructor() {
    this.baseURL = `http://localhost:5000`;
  }

  getData = async (userId) => {
    const response = await fetch(`${this.baseURL}/${userId}/tasks`, {
      method: "GET",
    });
    const responseJSON = response.json();
    return responseJSON;
  };

  addTaskAPI = async (userId, task) => {
    const response = await fetch(`${this.baseURL}/${userId}/tasks`, {
      method: "POST",
      body: JSON.stringify({
        name: task,
      }),
      headers: { "Content-type": "application/json" },
    });
    const responseJSON = response.json();
    return responseJSON;
  };

  deleteTaskAPI = async (userId, taskId) => {
    await fetch(`${this.baseURL}/${userId}/tasks/${taskId}`, {
      method: "DELETE",
    });
  };
}
