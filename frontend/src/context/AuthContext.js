import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user:
    localStorage.getItem("user") &&
    localStorage.getItem("user") !== "undefined" &&
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        projects: state.projects,
        tasks: state.tasks,
        activeProject: state.activeProject,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
