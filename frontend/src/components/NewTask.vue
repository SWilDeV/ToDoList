<template>
  <div>
    <input v-model="newTask" placeholder="nouvelle tache" />
    <button type="button" class="btn btn-success btn-sm" @click="addTask()">
      OK
    </button>
  </div>
</template>

<script>
export default {
  name: "NewTask",
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    addTask() {
      const task = this.newTask;
      this.$emit("task-added", task);
      this.newTask = "";
    },
  },
};
</script>

<style></style>
