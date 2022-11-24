const { Router } = require("express");

const projectServices = require("../services/project.service");
const authorize = require("../middleware/authorize");

const projectRouter = Router();

projectRouter.post("/", authorize(), projectServices.createProject);
projectRouter.get("/", authorize(), projectServices.findAllProjectsByUserId);
projectRouter.put(
  "/:projectId",
  authorize(),
  projectServices.updateProjectById
);
projectRouter.delete(
  "/:projectId",
  authorize(),
  projectServices.deleteProjectById
);

module.exports = projectRouter;
