const dbServices = require("./mongo.util");

const validateDates = (startDate, endDate) => {
  if (startDate === undefined || endDate === undefined) return true;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
};

const createTask = async (request, response) => {
  try {
    const email = request.user.email;
    const taskData = request.body.taskData;
    if (!(await dbServices.checkProjectExists(taskData.projectId)))
      return response.json({
        message: "Error: Project doesn't exist!",
      });
    if (!validateDates(taskData.startDate, taskData.endDate))
      return response.json({
        message: "Invalid dates: the startDate is bigger than the endDate",
      });
    if (!(await dbServices.checkUserExists(email)))
      return response.json({
        message: "Error: The user doesn't exist!",
      });

    const newTask = await dbServices.createTask(email, taskData);

    return response.json(newTask);
  } catch (error) {
    console.error(error);
  }
};

const findAllTasksByProject = async (request, response) => {
  try {
    const email = request.user.email;
    const projectId = request.query.projectId;

    const project = await dbServices.checkProjectExists(projectId);
    if (project === null)
      return response.json({
        message: "the project you are trying to add a task doesn't exist!",
      });

    if (!dbServices.checkUserIsProjectOwner(email, project))
      return response.json({
        message: "Error: User is not the owner of this project!",
      });
    const tasks = await dbServices.findTaskByProject(projectId);

    return response.json(tasks);
  } catch (error) {
    console.error(error);
  }
};

const updateTaskById = async (request, response) => {
  const email = request.user.email;
  const id = request.params.taskId;
  const taskData = {
    isFinished: request.body.isFinished,
  };

  if (!validateDates(taskData.startDate, taskData.endDate))
    return response.json({
      message: "Invalid dates: the startDate is bigger than the endDate",
    });

  const updatedTask = await dbServices.updateTaskById(id, taskData);

  if (!updatedTask)
    return response.json({
      message: "Error: Task doesn't exist!",
    });

  return response.json(updatedTask);
};

const deleteTaskById = async (request, response) => {
  try {
    const taskId = request.params.taskId;
    const res = await dbServices.deleteTaskById(taskId);

    return response.json(res);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createTask,
  findAllTasksByProject,
  updateTaskById,
  deleteTaskById,
};
