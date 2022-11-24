import axios from "axios";

const baseUrl = "http://localhost:3001";

export const routes = {
  user: {
    create: "/api/user/",
    login: "/api/user/login",
  },
  project: {
    create: "/api/project/",
    getAll: "/api/project/",
    delete: "/api/project/",
    update: "/api/project/",
  },
  task: {
    getAll: "/api/task/",
    create: "/api/task/",
    update: "/api/task/",
    delete: "/api/task/",
  },
};

const URL = (route) => `${baseUrl}${route}`;

export const requests = {
  apiGet: (route, params = {}, configOptions = {}) => {
    return axios.get(URL(route), configOptions, params).then((response) => {
      return response.data;
    });
  },

  apiPost: (route, body, configOptions = {}) => {
    return axios
      .post(URL(route), body, configOptions)
      .then((response) => response.data);
  },

  apiPut: (route, body = {}, configOptions = {}) => {
    return axios
      .put(URL(route), body, configOptions)
      .then((response) => response.data);
  },

  apiDelete: (route, params = {}, configOptions = {}) => {
    return axios
      .delete(URL(route), params, configOptions)
      .then((response) => response.data);
  },
};
