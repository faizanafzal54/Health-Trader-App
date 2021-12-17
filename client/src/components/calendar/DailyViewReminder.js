import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDateTime, getTime, hoursInAMPM } from "../../helpers/dateFormator";
import PillImg from "../../assets/Pill icon.png";
import AppointmentImg from "../../assets/appointment icon.png";
import ServiceImg from "../../assets/service icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function DailyViewReminder({ ampmList, date }) {
  const calendarReminders = useSelector(
    (state) => state.reminder.calendarReminders
  );
  const [todayReminder, settodayReminder] = useState(null);

  useEffect(() => {
    const foundReminder = calendarReminders.find((reminder) => {
      return (
        new Date(reminder.date).getFullYear() === date.getFullYear() &&
        new Date(reminder.date).getMonth() === date.getMonth() &&
        new Date(reminder.date).getDate() === date.getDate()
      );
    });
    settodayReminder(foundReminder);
  }, [calendarReminders]);

  const setReminderStatusHandler = () => {};

  return (
    <div className="row day-calendar gx-0">
      <div className="col-md-6">
        <div className="title">
          <h4>AM HOURS</h4>
        </div>
        <div className="am-pm">
          {ampmList.map((ap) => (
            <div
              key={`am${ap.toString()}`}
              className="d-flex align-items-center justify-content-between"
            >
              <div>
                <span>{ap} AM </span>
              </div>
              <div>
                {hoursInAMPM(new Date(todayReminder?.date)) === `${ap} AM` ? (
                  <div className="daily-view">
                    <div className="reminders">
                      <div className="reminder-div">
                        <div className="row justify-content-between">
                          <div className="col-md-6">
                            <div className="d-flex">
                              <img
                                src={
                                  todayReminder?.reminderType === "medication"
                                    ? PillImg
                                    : todayReminder?.reminderType ===
                                      "appointment"
                                    ? AppointmentImg
                                    : ServiceImg
                                }
                                height={
                                  todayReminder?.reminderType === "appointment"
                                    ? 30
                                    : 25
                                }
                                alt="Pill Img"
                              />
                              <h4 className="med-name">
                                {todayReminder?.name}
                              </h4>
                            </div>
                            <div className="text-start">
                              <span className="med-frequency">
                                {todayReminder?.location === ""
                                  ? todayReminder?.groupName
                                  : todayReminder?.location}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6 text-end">
                            <span className="med-time">
                              <FontAwesomeIcon icon={faBell} /> &nbsp;&nbsp;{" "}
                              {getTime(todayReminder?.date)}
                            </span>
                          </div>
                        </div>
                        <div className="med-text">
                          <span>{todayReminder?.comments}</span>
                        </div>
                        <div className="med-border"></div>
                        <div className="row actions-btns align-items-center">
                          <div className="col-md-9">
                            <div className="d-flex flex-wrap">
                              <button
                                onClick={() =>
                                  setReminderStatusHandler(
                                    todayReminder?.metaId,
                                    "Taken"
                                  )
                                }
                                style={{ marginLeft: "5px" }}
                                className={
                                  todayReminder?.status === "Taken"
                                    ? "btn btn-sm button-taken"
                                    : "btn btn-sm btn-transparent text-success"
                                }
                              >
                                Completed
                              </button>
                              <button
                                onClick={() =>
                                  setReminderStatusHandler(
                                    todayReminder?.metaId,
                                    "Missed"
                                  )
                                }
                                style={{ marginLeft: "5px" }}
                                className={
                                  todayReminder?.status === "Missed"
                                    ? "btn btn-sm button-missed"
                                    : "btn btn-sm btn-transparent text-danger"
                                }
                              >
                                Missed
                              </button>
                              <button
                                onClick={() =>
                                  setReminderStatusHandler(
                                    todayReminder?.metaId,
                                    "Forgot"
                                  )
                                }
                                style={{ marginLeft: "5px" }}
                                className={
                                  todayReminder?.status === "Forgot"
                                    ? "btn btn-sm button-forgot"
                                    : "btn btn-sm btn-transparent text-warning"
                                }
                              >
                                Don't Remember
                              </button>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="d-flex created-date-div justify-content-end">
                              <span className="created-date me-4">
                                {getDateTime(todayReminder?.date)}
                              </span>
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-down"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-md-6">
        <div className="title">
          <h4>PM HOURS</h4>
        </div>
        <div className="am-pm">
          {ampmList.map((ap) => (
            <div
              key={`pm${ap.toString()}`}
              className="d-flex align-items-center justify-content-between"
            >
              <div>
                <span>{ap} PM </span>
              </div>
              <div>
                {hoursInAMPM(new Date(todayReminder?.date)) === `${ap} PM` ? (
                  <div className="daily-view">
                    <div className="reminders">
                      <div className="reminder-div">
                        <div className="row justify-content-between">
                          <div className="col-md-6">
                            <div className="d-flex">
                              <img
                                src={
                                  todayReminder?.reminderType === "medication"
                                    ? PillImg
                                    : todayReminder?.reminderType ===
                                      "appointment"
                                    ? AppointmentImg
                                    : ServiceImg
                                }
                                height={
                                  todayReminder?.reminderType === "appointment"
                                    ? 30
                                    : 25
                                }
                                alt="Pill Img"
                              />
                              <h4 className="med-name">
                                {todayReminder?.name}
                              </h4>
                            </div>
                            <div className="text-start">
                              <span className="med-frequency">
                                {todayReminder?.location === ""
                                  ? todayReminder?.groupName
                                  : todayReminder?.location}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6 text-end">
                            <span className="med-time">
                              <FontAwesomeIcon icon={faBell} /> &nbsp;&nbsp;{" "}
                              {getTime(todayReminder?.date)}
                            </span>
                          </div>
                        </div>
                        <div className="med-text">
                          <span>{todayReminder?.comments}</span>
                        </div>
                        <div className="med-border"></div>
                        <div className="row actions-btns align-items-center">
                          <div className="col-md-9">
                            <div className="d-flex flex-wrap">
                              <button
                                onClick={() =>
                                  setReminderStatusHandler(
                                    todayReminder?.metaId,
                                    "Taken"
                                  )
                                }
                                style={{ marginLeft: "5px" }}
                                className={
                                  todayReminder?.status === "Taken"
                                    ? "btn btn-sm button-taken"
                                    : "btn btn-sm btn-transparent text-success"
                                }
                              >
                                Completed
                              </button>
                              <button
                                onClick={() =>
                                  setReminderStatusHandler(
                                    todayReminder?.metaId,
                                    "Missed"
                                  )
                                }
                                style={{ marginLeft: "5px" }}
                                className={
                                  todayReminder?.status === "Missed"
                                    ? "btn btn-sm button-missed"
                                    : "btn btn-sm btn-transparent text-danger"
                                }
                              >
                                Missed
                              </button>
                              <button
                                onClick={() =>
                                  setReminderStatusHandler(
                                    todayReminder?.metaId,
                                    "Forgot"
                                  )
                                }
                                style={{ marginLeft: "5px" }}
                                className={
                                  todayReminder?.status === "Forgot"
                                    ? "btn btn-sm button-forgot"
                                    : "btn btn-sm btn-transparent text-warning"
                                }
                              >
                                Don't Remember
                              </button>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="d-flex created-date-div justify-content-end">
                              <span className="created-date me-4">
                                {getDateTime(todayReminder?.date)}
                              </span>
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-down"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DailyViewReminder;
