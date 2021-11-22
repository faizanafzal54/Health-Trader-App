const defaultState = {
  isReminderOpen: false,
  reminders: [],
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
    case "SetReminders":
      return {
        ...state,
        reminders: [...state.reminders, ...action.payload.reminders],
      };
    default:
      return state;
  }
};

export default reminderReducer;
