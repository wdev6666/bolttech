const { Router } = require("express");
const authorize = require("../middleware/authorize");

const taskServices = require("../services/task.service");

const taskRouter = Router();

taskRouter.post("/", authorize(), taskServices.createTask);
taskRouter.get("/", authorize(), taskServices.findAllTasksByProject);
taskRouter.put("/:taskId", authorize(), taskServices.updateTaskById);
taskRouter.delete("/:taskId", authorize(), taskServices.deleteTaskById);

module.exports = taskRouter;
