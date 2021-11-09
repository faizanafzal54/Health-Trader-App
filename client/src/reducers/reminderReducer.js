const defaultState = {
  isReminderOpen: false,
};

const reminderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OpenModal":
      return {
        ...state,
        isReminderOpen: true,
      };
    case "CloseModal":
      return {
        ...state,
        isReminderOpen: false,
      };
    default:
      return state;
  }
};

export default reminderReducer;
