export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const RegistrationSuccess = (user) => ({
  type: "REGISTATION_SUCCESS",
  payload: user,
});

export const RegistrationFailure = (error) => ({
  type: "REGISTATION_FAILURE",
  payload: error,
});

export const ProjectListing = (projects) => ({
  type: "PROJECT_LISTING",
  payload: projects,
});

export const activeProject = (activeProject) => ({
  type: "ACTIVE_PROJECT",
  payload: activeProject,
});

export const TaskListing = (tasks) => ({
  type: "TASK_LISTING",
  payload: tasks,
});
