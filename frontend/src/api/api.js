export default class Api {
  constructor() {
    this.baseURL = `https://peaceful-dusk-66565.herokuapp.com`;

    //this.baseURL = `http://localhost:${process.env.PORT}`;
  }

  registerUser = (user) => {
    this.user = user;
  };

  createUserAPI = async () => {
    const response = await fetch(`${this.baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  getTasksAPI = async (userId) => {
    const response = await fetch(`${this.baseURL}/${userId}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
