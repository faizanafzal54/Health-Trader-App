const defaultState = {
  isAuthenticated: false,
  user: {
    _id: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
    image: "",
  },
  token: "",
  refreshToken: "",
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    case "Logout":
      return {
        ...state,
        isAuthenticated: false,
        user: {
          _id: "",
          name: "",
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          phone: "",
          image: "",
        },
        token: "",
        refreshToken: "",
      };
    case "RefreshToken":
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    case "UpdateProfilePicture":
      return {
        ...state,
        user: action.payload.user,
      };
    case "UpdateUser":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
