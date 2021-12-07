export const getDateTime = (date) => {
  const dateObj = new Date(date);

  let year = dateObj.getFullYear();

  let month = (1 + dateObj.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = dateObj.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return `${month}/${day}/${year} at ${formatAMPM(dateObj)}`;
};

export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const getTime = (date) => {
  const dateObj = new Date(date);
  return `${formatAMPM(dateObj)}`;
};

export const monthName = (index) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[index];
};

export const currentMonthRange = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return `${monthName(date.getMonth()).substring(0,3)}. ${firstDay.getDay()}, ${firstDay.getFullYear()} - ${monthName(date.getMonth()).substring(0,3)}. ${lastDay.getDay()}, ${lastDay.getFullYear()}`
};

export const currentDay = () => {
  const date = new Date();
  return `${monthName(date.getMonth()).substring(0,3)}. ${date.getDay()}, ${date.getFullYear()}`
};

export const currentWeek = () => {
  let week = new Array();
  // Starting Monday not Sunday
  let current = new Date();
  current.setDate(current.getDate() - current.getDay());
  for (var i = 0; i < 7; i++) {
    week.push({ date: new Date(current), day: dayName(new Date(current)) });
    current.setDate(current.getDate() + 1);
  }

  return week;
};

export const dayName = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date(date);
  return days[d.getDay()];
};