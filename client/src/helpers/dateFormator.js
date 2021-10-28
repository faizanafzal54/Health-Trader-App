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
