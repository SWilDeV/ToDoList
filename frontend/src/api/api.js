export default class Api {
  constructor() {
    this.baseURL = `/`;
    //  this.baseURL = `https://peaceful-dusk-66565.herokuapp.com`;

    // this.baseURL = `http://localhost:5000`;
  }

  registerUser = (user) => {
    this.user = user;
  };

  createUserAPI = async () => {
    const response = await fetch(`${this.baseURL}/users`, {
      method: "POST",
    });
    return response.json();
  };

  getTasksAPI = async (userId) => {
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
