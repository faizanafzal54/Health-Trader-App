export const setReminderAction = (reminders) => (dispatch) => {
  dispatch({
    type: "SetReminders",
    payload: {
      reminders,
    },
  });
};
