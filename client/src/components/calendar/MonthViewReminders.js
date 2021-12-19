import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import PillImg from "../../assets/Pill icon.png";
import AppointmentImg from "../../assets/appointment icon.png";
import ServiceImg from "../../assets/service icon.png";
import { setReminderStatus } from "../../components/home/homeService";
import { useDispatch, useSelector } from "react-redux";
import { getDateTime, getTime } from "../../helpers/dateFormator";
import { toastify } from "../../actions/userActions";
import { setCalendarUpdateAction } from "../../actions/reminderActions";

function MonthViewReminders() {
  const [search, setSearch] = useState("");
  const calendarReminders = useSelector(
    (state) => state.reminder.calendarReminders
  );

  const dispatch = useDispatch();

  const setReminderStatusHandler = async (metaId, status) => {
    const res = await setReminderStatus(metaId, status);
    if (res.status === 200) {
      const tempReminders = calendarReminders.map((reminder) => {
        if (reminder.metaId === metaId) {
          reminder.status = status;
        }
        return reminder;
      });
      dispatch(setCalendarUpdateAction(tempReminders));
      toastify("success", `Reminder status has been updated to "${status}"`);
    }
  };
  const searchFor = (_reminder, _search) => {
    return (
      _reminder.name.toLowerCase().includes(_search) ||
      _reminder.location.toLowerCase().includes(_search) ||
      _reminder.comments.toLowerCase().includes(_search) ||
      getDateTime(_reminder.date).toLowerCase().includes(_search)
    );
  };
  return (
    <div className="timeline">
      <div className="reminders pb-4">
        <div className="reminder-title">
          <h4>Reminders</h4>
        </div>
        {calendarReminders &&
          calendarReminders
            .filter((reminder) => searchFor(reminder, search))
            .map((reminder, index) => (
              <div
                key={reminder.metaId}
                className={index === 0 ? "reminder-div" : "reminder-div mt-20"}
              >
                <div className="row justify-content-between">
                  <div className="col-md-6">
                    <div className="d-flex">
                      <img
                        src={
                          reminder.reminderType === "medication"
                            ? PillImg
                            : reminder.reminderType === "appointment"
                            ? AppointmentImg
                            : ServiceImg
                        }
                        height={
                          reminder.reminderType === "appointment" ? 30 : 25
                        }
                        alt="Pill Img"
                      />
                      <h4 className="med-name">{reminder.name}</h4>
                    </div>
                    <div className="text-start">
                      <span className="med-frequency">
                        {reminder.location === ""
                          ? reminder.groupName
                          : reminder.location}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 text-end">
                    <span className="med-time">
                      <FontAwesomeIcon icon={faBell} /> &nbsp;&nbsp;{" "}
                      {getTime(reminder.date)}
                    </span>
                  </div>
                </div>
                <div className="med-text">
                  <span>{reminder.comments}</span>
                </div>
                <div className="med-border"></div>
                <div className="row actions-btns align-items-center">
                  <div className="col-md-9">
                    <div className="d-flex flex-wrap">
                      <button
                        onClick={() =>
                          setReminderStatusHandler(reminder.metaId, "Taken")
                        }
                        style={{ marginLeft: "5px" }}
                        className={
                          reminder.status === "Taken"
                            ? "btn btn-sm button-taken"
                            : "btn btn-sm btn-transparent text-success"
                        }
                      >
                        Completed
                      </button>
                      <button
                        onClick={() =>
                          setReminderStatusHandler(reminder.metaId, "Missed")
                        }
                        style={{ marginLeft: "5px" }}
                        className={
                          reminder.status === "Missed"
                            ? "btn btn-sm button-missed"
                            : "btn btn-sm btn-transparent text-danger"
                        }
                      >
                        Missed
                      </button>
                      <button
                        onClick={() =>
                          setReminderStatusHandler(reminder.metaId, "Forgot")
                        }
                        style={{ marginLeft: "5px" }}
                        className={
                          reminder.status === "Forgot"
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
                        {getDateTime(reminder.date)}
                      </span>
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        {calendarReminders.length === 0 ? (
          <span className="text-dark">No reminder created yet</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MonthViewReminders;
