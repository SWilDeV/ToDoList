<template>
  <div>
    <h1>{{ msg }}</h1>
    <new-task @task-added="addTask($event)" />
    <h2>Mes Taches:</h2>
    <div class="container">
      <div class="card mb-4 shadow-sm">
        <div class="card-body">
          <task-item
            v-for="task in taskList"
            :key="task.id"
            :task-name="task.name"
            :task-id="task.id"
            @task-deleted="deleteTask($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api";
import TaskItem from "./TaskItem.vue";
import NewTask from "./NewTask.vue";
import Vue from "vue";
const api = new Api();

export default {
  name: "ToDoList",
  components: {
    TaskItem,
    NewTask,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      user: String,
      taskList: [],
    };
  },
  async created() {
    try {
      await this.init();
      await this.getTasks();
      
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async addTask(task) {
      try {
        const res = await api.addTaskAPI(this.user, task);
        this.taskList.push({
          id: res.id,
          name: res.name,
        });
      } catch (e) {
        console.error(e);
      }
    },
    async deleteTask(taskId) {
      try {
        await api.deleteTaskAPI(this.user, taskId);
        const index = this.taskList.findIndex(
          (deletedTask) => deletedTask.id === taskId
        );
        if (index >= 0) {
          Vue.delete(this.taskList, index);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async init() {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          user = await api.createUserAPI();
          localStorage.setItem("user", JSON.stringify(user));
        }
        this.user = user.id;
      } catch (e) {
        console.log(e);
      }
    },
    async getTasks() {
      const tasks = await api.getTasksAPI(this.user);
      for (const task of tasks) {
        this.taskList.push({
          id: task.id,
          name: task.name,
        });
      }
    },
  },
};
</script>

<style></style>
