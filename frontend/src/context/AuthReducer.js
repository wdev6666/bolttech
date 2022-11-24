const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "REGISTRATION_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "PROJECT_LISTING":
      return {
        user: action.payload.user,
        projects: action.payload.response,
        isFetching: false,
        error: false,
      };

    case "ACTIVE_PROJECT":
      return {
        ...state,
        activeProject: action.payload,
        error: false,
      };

    case "TASK_LISTING":
      return {
        tasks: action.payload,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
