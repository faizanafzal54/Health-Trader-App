import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEllipsisV,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import PillImg from "../../../assets/Pill icon.png";
import AppointmentImg from "../../../assets/appointment icon.png";
import ServiceImg from "../../../assets/service icon.png";
import { getReminders, setReminderStatus } from "../homeService";
import { useSelector } from "react-redux";
import { getDateTime, getTime } from "../../../helpers/dateFormator";
import { toastify } from "../../../actions/userActions";

function Timeline() {
  const [reminders, setReminders] = useState([]);
  const [search, setSearch] = useState('');
  const userState = useSelector((state) => state.user.user);

  useEffect(() => {
    getRemindersHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRemindersHandler = async () => {
    const res = await getReminders(userState._id);
    if (res.status === 200) {
      setReminders(res.data.data.reminders);
    }
  };
  const setReminderStatusHandler = async (reminderId, status) => {
    const res = await setReminderStatus(reminderId, status);
    if (res.status === 200) {
      const newReminders = reminders.map((reminder) => {
        if (reminder._id === reminderId) {
          reminder.status = status;
        }
        return reminder;
      });
      toastify("success", `Reminder status has been updated to "${status}"`);
      setReminders(newReminders);
    }
  };
  const searchFor = (_reminder,_search)=>{
    return _reminder.name.toLowerCase().includes(_search) ||
     _reminder.location.toLowerCase().includes(_search) ||
     _reminder.comments.toLowerCase().includes(_search) 
  }
  return (
    <div className="timeline module-headers">
      <div className="card">
        <div className="d-flex justify-content-between">
          <h5>Your Timeline</h5>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <div className="d-flex search-actions">
          <div className="search">
            <FormControl>
              <InputLabel
                className="text-white"
                htmlFor="standard-adornment-search"
              >
                Search Reminders
              </InputLabel>
              <Input
                onChange={e=>setSearch(e.target.value)}
                color="secondary"
                id="standard-adornment-search"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <FontAwesomeIcon className="text-white" icon={faSearch} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="category">
            <TextField
              className="text-white ms-4"
              id="standard-select-currency"
              select
              label="Select"
              variant="standard"
            >
              <MenuItem>Category</MenuItem>
            </TextField>
          </div>
        </div>
        <div className="reminders pb-4">
          <div className="reminder-title">
            <h4>Reminders</h4>
          </div>
          {reminders.filter(reminder=>searchFor(reminder, search)).map((reminder) => (
            <div key={reminder._id} className="reminder-div">
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
                      height={reminder.reminderType === 'appointment' ? 30:25}
                      alt="Pill Img"
                    />
                    <h4 className="med-name">{reminder.name}</h4>
                  </div>
                  <div className="text-start">
                    <span className="med-frequency">{reminder.location}</span>
                  </div>
                </div>
                <div className="col-md-6 text-end">
                  <span className="med-time">
                    <FontAwesomeIcon icon={faBell} /> &nbsp;&nbsp;{" "}
                    {getTime(reminder.startDateTime)}
                  </span>
                </div>
              </div>
              <div className="med-text">
                <span>{reminder.comments}</span>
              </div>
              <div className="med-border"></div>
              <div className="row actions-btns align-items-center">
                <div className="col-md-8">
                  <div className="d-flex flex-wrap">
                    <button
                      onClick={() =>
                        setReminderStatusHandler(reminder._id, "Taken")
                      }
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
                        setReminderStatusHandler(reminder._id, "Missed")
                      }
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
                        setReminderStatusHandler(reminder._id, "Forgot")
                      }
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
                <div className="col-md-4">
                  <div className="d-flex created-date-div justify-content-end">
                    <span className="created-date me-4">
                      {getDateTime(reminder.startDateTime)}
                    </span>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {reminders.length === 0 ? <span className='text-dark'>No reminder created yet</span>:""}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
