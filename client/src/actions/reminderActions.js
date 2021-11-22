import { Store } from "../store";

export const pushReminderAction = (reminder) => (dispatch) => {
  let _reminders = Store.getState().reminder.reminders;
  _reminders.push(reminder);
  dispatch({
    type: "PushReminders",
    payload: {
      reminders: _reminders,
    },
  });
};

export const setReminderAction = (reminders) => (dispatch) => {
  dispatch({
    type: "SetReminders",
    payload: {
      reminders,
    },
  });
};
