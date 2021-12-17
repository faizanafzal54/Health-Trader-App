import { getCalendarReminders } from "../components/reminders/reminderService";
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

export const pushCalendarReminderAction = (reminder) => (dispatch) => {
  let _reminders = Store.getState().reminder.reminders;
  _reminders.push(reminder);
  dispatch({
    type: "PushCalendarReminders",
    payload: {
      reminders: _reminders,
    },
  });
};

export const setCalendarRemindersAction =
  (userId, yearAndMonth) => async (dispatch) => {
    const res = await getCalendarReminders(userId, yearAndMonth);
    if (res.status === 200) {
      dispatch({
        type: "SetCalendarReminders",
        payload: {
          reminders: res.data.data.reminders,
        },
      });
    }
  };
