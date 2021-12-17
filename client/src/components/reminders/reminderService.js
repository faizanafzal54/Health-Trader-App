import request from "../../configs/request";

export const createReminder = async (data)=>{
    return request.post(`/reminders/create`,data);
}

export const getCalendarReminders = async (userId, yearAndMonth) => {
  const year = yearAndMonth[0];
  const month = yearAndMonth[1];
  return request.get(
    `/reminders/calendarReminders?userId=${userId}&year=${year}&month=${month}`
  );
};