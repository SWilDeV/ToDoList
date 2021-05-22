export default class Api {
    constructor() {
      this.baseURL = `http://localhost:5000`;
    }
  
    getData = async (userId) => {
      const response = await fetch(
        `${this.baseURL}/${userId}/tasks`,
        {
          method: "GET",
        }
      );
      const responseJSON = response.json();
      return responseJSON;
    };
  }