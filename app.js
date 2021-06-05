const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const Users = require("./repositories/users").default;
const Tasks = require("./repositories/tasks").default;
const { default: task } = require("./models/task");

const port = process.env.PORT || 5000;
//  const MONGODB_URI = "mongodb://localhost:27017/ToDoList";
// const dbUrl = "mongodb://localhost:27017/ToDoList";

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
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
app.post("/:userId/tasks", async (req, res, next) => {
  const { userId } = req.params;
  const { name } = req.body;

  const user = await Users.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  if (!user || name.trim() === "") {
    return res.status(400).send("Please enter a task name");
  }
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
app.put("/:userId/tasks/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;
  const { name } = req.body;

  const user = await Users.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const task = await Tasks.getTaskById(taskId, userId);
  if (!task) {
    return res.status(404).send("task not found");
  }
  if (!name || name.trim() === "") {
    return res.status(400).send("task name is required");
  }
  const newTask = await Tasks.updateById(taskId, userId, name);
  res.status(200).json(newTask.toDTO());
});

//DELETE/userID/taskID
app.delete("/:userId/tasks/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;

  const user = await Users.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const task = await Tasks.getTaskById(taskId, userId);
  if (!task) {
    return res.status(404).send("task not found");
  }

  await Tasks.deleteById(taskId, userId);
  return res.status(204).send(null);
});

app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
