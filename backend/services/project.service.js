const dbServices = require("./mongo.util");

const validateDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
};

const createProject = async (request, response) => {
  try {
    const {
      email,
      projectData: { name, startDate, endDate },
    } = request.body;
    if (!validateDates(startDate, endDate))
      return response.json({
        message: "Invalid: startDate is bigger than the endDate",
      });

    if (!(await dbServices.checkUserExists(email)))
      return response.json({
        message: "No data found!",
      });

    const newProject = await dbServices.createProject(email, {
      name,
      startDate,
      endDate,
    });
    return response.json(newProject);
  } catch (error) {
    console.error(error);
  }
};

const findAllProjectsByUserId = async (request, response) => {
  const email = request.user.email;

  if (!(await dbServices.checkUserExists(email)))
    return response.json({
      message: "Error: the user you are trying to add a project doesn't exist!",
    });

  const projects = await dbServices.findAllProjectsByUserId(email);
  return response.json(projects);
};

const updateProjectById = async (request, response) => {
  const id = request.params.projectId;
  const email = request.user.email;
  const {
    projectData: { name, startDate, endDate, isFinished },
  } = request.body;

  if (!validateDates(startDate, endDate))
    return response.json({
      message: "invalid dates: the startDate is bigger than the finishDate",
    });

  const updatedProject = await dbServices.updateProjectById(email, id, {
    name,
    startDate,
    endDate,
    isFinished,
  });

  if (!updatedProject)
    return response.json({
      message: "the project doesn't exist!",
    });

  return response.json(updatedProject);
};

const deleteProjectById = async (request, response) => {
  const email = request.user.email;
  const projectId = request.params.projectId;

  const res = await dbServices.deleteProjectById(email, projectId);

  return response.json(res);
};

module.exports = {
  createProject,
  findAllProjectsByUserId,
  deleteProjectById,
  updateProjectById,
};
