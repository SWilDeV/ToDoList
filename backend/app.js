const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Users = require("./repositories/users").default;
const Tasks = require("./repositories/tasks").default;
const { default: task } = require("./models/task");

const port = 5000;
const MONGODB_URI = "mongodb://localhost:27017/ToDoList";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }),
  express.json()
);

//POST/user
app.post("/users", async (req, res) => {
  //creer utilisateur
  const user = await Users.createUser();
  res.status(201).json(user.toDTO());
});

//POST/userId/tasks/
app.post("/:userId/task", async (req, res, next) => {
  const { userId } = req.params;
  const { name } = req.body;

  const user = await Users.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  if (!user || name.trim() === "") {
    return res.status(400).send("Please enter a task name");
  }
  console.log("user found");
  const task = await Tasks.createTask(user._id, name);
  res.status(201).json(task.toDTO());
});

//GET/userID/tasks

app.get("/:userId/tasks", async (req, res) => {
  const { userId } = req.params;

  const user = await Users.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const tasks = await Tasks.getTaskbyUser(user.id);
  res.status(200).json(tasks.map((task) => task.toDTO()));
});

//GET/userID/tasks/taskID
app.get("/:userId/tasks/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;
  const user = await Users.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const task = await Tasks.getTaskById(taskId, userId);
  if (!task) {
    return res.status(404).send("task not found");
  }
  return res.status(200).json(task.toDTO());
});

//PUT/userID/tasks/taskID

//DELETE/userID/taskID

app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
