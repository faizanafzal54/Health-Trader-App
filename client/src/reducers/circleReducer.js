const defaultState = {
  users: [],
};

const circleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SetCircleUsers":
      return {
        ...state,
        users: action.payload,
      };
    case "PushCircleUsers":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default circleReducer;
