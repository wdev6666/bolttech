const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user == null) return undefined;

    return user;
  } catch (err) {
    throw Error("Error: While searching the user in mongoDB");
  }
};

const checkUserExists = async (email) => findUserByEmail(email);

const createUser = async (email, name, password) => {
  try {
    const findUser = await findUserByEmail(email);
    if (findUser) return { message: "User already exists" };
    const newUser = await User({ email, name, password }).save();
    return newUser;
  } catch (err) {
    throw Error("Error: While saving into db");
  }
};

const createProject = async (email, projectData) => {
  try {
    const project = await Project({ email, ...projectData }).save();
    return project;
  } catch (error) {
    console.error(error);
  }
};

const findAllProjectsByUserId = async (email) => {
  try {
    const projects = await Project.find({ email });
    return projects;
  } catch (err) {
    throw Error("Error: No projects available with given email");
  }
};

const updateProjectById = async (email, _id, projectData) => {
  try {
    const updatedProject = { ...projectData, email };
    await Project.findOneAndUpdate({ _id }, updatedProject);

    return updatedProject;
  } catch (err) {
    console.error(err);
  }
};

const deleteProjectById = async (email, _id) => {
  try {
    const project = await Project.findOne({ _id });

    if (project === null) return { message: "Project not found" };

    if (!checkUserIsProjectOwner(email, project))
      return { message: "The user is not tagged to the project!" };

    const response = await Project.deleteOne({ _id });

    if (response.deletedCount === 0) return { message: "No projects" };

    return { message: "Project Deleted!" };
  } catch (error) {
    console.error(error);
  }
};

const findOneProjectsById = async (_id) => {
  const project = await Project.findOne({ _id });

  if (project === null) return undefined;

  return project;
};

// Task functions
const createTask = async (email, taskData) => {
  try {
    const task = await Task({ email, ...taskData }).save();

    return task;
  } catch (error) {
    console.error(error);
  }
};

const checkUserIsProjectOwner = (email, project) => project.email === email;

const checkProjectExists = async (_id) => await findOneProjectsById(_id);

const findTaskByProject = async (projectId) => {
  try {
    const tasks = await Task.find({ projectId });

    return tasks;
  } catch (error) {
    console.error(error);
  }
};

const updateTaskById = async (_id, taskData) => {
  try {
    const task = await Task.findOneAndUpdate({ _id }, taskData);

    if (task === null) return undefined;

    return taskData;
  } catch (error) {
    console.error(error);
  }
};

const deleteTaskById = async (_id) => {
  try {
    const task = await Task.findOne({ _id });

    if (task === null) return { message: "Task not found" };

    const response = await Task.deleteOne({ _id });

    if (response.deletedCount === 0)
      return { message: "error finding your task for delation" };

    return { message: "task deleted successfully" };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  checkUserExists,
  createUser,
  findUserByEmail,
  createProject,
  findAllProjectsByUserId,
  updateProjectById,
  deleteProjectById,
  findOneProjectsById,
  updateTaskById,
  deleteTaskById,
  findTaskByProject,
  createTask,
  checkProjectExists,
  checkUserIsProjectOwner,
};
