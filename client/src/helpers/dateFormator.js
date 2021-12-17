export const getDateTime = (date) => {
  const dateObj = new Date(date);

  let year = dateObj.getFullYear();

  let month = (1 + dateObj.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = dateObj.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return `${month}/${day}/${year} at ${formatAMPM(dateObj)}`;
};

export const hoursInAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let strTime = hours + " " + ampm;
  return strTime;
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

export const currentMonthRange = (_year, _currentMonth) => {
  const date = new Date(_year, _currentMonth);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return `${monthName(date.getMonth()).substring(
    0,
    3
  )}. ${firstDay.getDate()}, ${firstDay.getFullYear()} - ${monthName(
    date.getMonth()
  ).substring(0, 3)}. ${lastDay.getDate()}, ${lastDay.getFullYear()}`;
};

export const currentDay = (year, month, date) => {
  console.log();
  return `${monthName(month).substring(0, 3)}. ${date}, ${year}`;
};

export const currentWeek = (year, month, date) => {
  let week = new Array();
  // Starting Monday not Sunday
  let current = new Date(year, month, date);
  current.setDate(current.getDate());
  current.setDate(current.getDate() - current.getDay());
  for (var i = 0; i < 7; i++) {
    week.push({ date: new Date(current), day: dayName(new Date(current)) });
    current.setDate(current.getDate() + 1);
  }

  return week;
};
export const currentWeekText = (year, month, date) => {
  // Starting Monday not Sunday
  let current = new Date(year, month, date);

  current.setDate(current.getDate());
  current.setDate(current.getDate() - current.getDay());
  console.log(current);

  let first = new Date(current);
  let last = new Date(current);
  last.setDate(current.getDate() + 6);

  return `${monthName(first.getMonth()).substring(
    0,
    3
  )}. ${first.getDate()}- ${monthName(last.getMonth()).substring(
    0,
    3
  )}. ${last.getDate()}, ${last.getFullYear()}`;
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