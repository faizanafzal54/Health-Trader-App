const defaultState = {
  isReminderOpen: false,
  reminders: [],
  calendarReminders: [],
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
    case "PushReminders":
      return {
        ...state,
        reminders: action.payload.reminders,
      };
    case "SetReminders":
      return {
        ...state,
        reminders: action.payload.reminders,
      };
    case "PushCalendarReminders":
      return {
        ...state,
        calendarReminders: action.payload.reminders,
      };
    case "SetCalendarReminders":
      return {
        ...state,
        calendarReminders: action.payload.reminders,
      };
    default:
      return state;
  }
};

export default reminderReducer;
