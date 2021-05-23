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
const userId = "609c944f822c8247b0e89f37";

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
      taskList: [],
    };
  },
  async created() {
    try {
      const tasks = await api.getData(userId);

      for (const task of tasks) {
        this.taskList.push({
          id: task.id,
          name: task.name,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async addTask(task) {
      try {
        const res = await api.addTaskAPI(userId, task);
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
        await api.deleteTaskAPI(userId, taskId);
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
  },
};
</script>

<style></style>
