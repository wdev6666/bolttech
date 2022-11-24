import { requests, routes } from "./axios";

export const createUser = async (body) =>
  await requests.apiPost(routes.user.create, body);

export const login = async (body) =>
  await requests.apiPost(routes.user.login, body);

export const createProject = async (body, options) =>
  await requests.apiPost(routes.project.create, body, options);

export const updateProject = async (body, options) => {
  return await requests.apiPut(
    routes.project.update + body.projectData.projectId,
    body,
    options
  );
};

export const deleteProject = async (body, options) =>
  await requests.apiDelete(routes.project.delete + body, options);

export const getAllProjects = async (options) => {
  return await requests.apiGet(routes.project.getAll, {}, options);
};

export const createTask = async (body, options) => {
  return await requests.apiPost(routes.task.create, body, options);
};

export const updateTask = async (body, options) => {
  return await requests.apiPut(routes.task.update + body.id, body, options);
};

export const deleteTask = async (body, options) =>
  await requests.apiDelete(routes.task.delete + body, options);

export const getAllTasks = async (projectId, options) => {
  return await requests.apiGet(
    routes.task.getAll,
    { projectId: projectId },
    options
  );
};
