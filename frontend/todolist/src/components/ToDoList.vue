<template>
  <div>
    <h1>Super ToDo List</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
import Api from "@/api/api";
const api = new Api();
export default {
  name: "ToDoList",
  props: {
    msg: String,
  },
  data() {
    return {
      taskList: [],
    };
  },
  async created() {
    try {
      const tasks = await api.getData('609c944f822c8247b0e89f37');
      
      for (const task of tasks) {
        this.taskList.push({
          id: task.id,
          name: task.name,
        });
      }
      console.log(this.taskList);
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style></style>
