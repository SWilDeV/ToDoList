<template>
  <div class="col">
    <div class="card mb-4 shadow-sm ">
      <div class="card-body">
        <div class="">
          <h3 class="d-inline">{{ taskName }}</h3>
          <button
            type="button"
            class="mx-5 btn-danger btn-sm float-right"
            @click="deleteTask"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    taskId: String,
    taskName: String,
  },
  methods: {
    deleteTask() {
      try {
        const taskId = this.taskId;
        this.$emit("task-deleted", taskId);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style></style>
