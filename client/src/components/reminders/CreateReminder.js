import { Modal, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MedicationIcon from "../../assets/reminder-medication-icon.png";
import AppointmentIcon from "../../assets/reminder-appointment-icon.png";
import ServiceIcon from "../../assets/reminder-service-icon.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCalendarWeek,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { createReminder } from "./reminderService";
import { toastify } from "../../actions/userActions";
import { pushReminderAction } from "../../actions/reminderActions";

function CreateReminder() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reminderType, setReminderType] = useState("medication");
  const [isRepeating, setIsRepeating] = useState(false);
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [reminderFrequency, setReminderFrequency] = useState("daily");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [repeatEvery, setRepeatEvery] = useState("");
  const [duration, setDuration] = useState("");
  const [terminationDate, setTerminationDate] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState("");

  const reminderState = useSelector((state) => state.reminder);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setModalOpen(reminderState.isReminderOpen);
  }, [reminderState.isReminderOpen]);

  const closeModalHandler = () => {
    setModalOpen(false);
    dispatch({ type: "CloseModal" });
  };

  const createReminderHandler = async () => {
    try {
      const res = await createReminder({
        userId: userState.user?._id,
        reminderType,
        startDateTime,
        isRepeating,
        reminderFrequency,
        dayOfWeek,
        repeatEvery,
        duration,
        terminationDate,
        name,
        location,
        comments,
      });
      console.log(res.data.data.reminder);
      dispatch(pushReminderAction(res.data.data.reminder));
      toastify("success", "Reminder has been created successfully");
      closeModalHandler();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        className="m-4 overflow-auto"
        open={isModalOpen}
        onClose={closeModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "background.paper",
            maxWidth: "1083px",
            margin: "0 auto",
            borderRadius: "8px",
            boxShadow: (theme) => theme.shadows[5],
          }}
        >
          <div className="create-reminder-modal">
            <div className="title-div d-flex justify-content-between">
              <h5>Create a Reminder</h5>
              <button onClick={closeModalHandler} className="btn">
                X
              </button>
            </div>
            <div className="row form-div">
              <div className="col-md-4 text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="number-circle">1</div>
                  <div className="text">Reminder Type</div>
                </div>
                <div className="description">
                  <span>Select a type of reminder to create.</span>
                </div>
                <div
                  className={
                    reminderType === "medication"
                      ? "select-type-button selected-type"
                      : "select-type-button"
                  }
                >
                  <a
                    onClick={() => setReminderType("medication")}
                    href={() => false}
                  >
                    <div id="onclick-div" className="d-flex">
                      <div>
                        <img src={MedicationIcon} alt="Med Icon" />{" "}
                      </div>
                      <div className="button-text">
                        <div>
                          <h5>Medicatiom Group</h5>
                        </div>
                        <div>
                          <p>Add reminders of your med group </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className={
                    reminderType === "service"
                      ? "select-type-button selected-type"
                      : "select-type-button"
                  }
                >
                  <a
                    onClick={() => setReminderType("service")}
                    href={() => false}
                  >
                    <div id="onclick-div" className="d-flex">
                      <div>
                        <img src={ServiceIcon} alt="Med Icon" />{" "}
                      </div>
                      <div className="button-text">
                        <div>
                          <h5>Service/Activity</h5>
                        </div>
                        <div>
                          <p>Add therapy, workouts, massages, etc. </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className={
                    reminderType === "appointment"
                      ? "select-type-button selected-type"
                      : "select-type-button"
                  }
                >
                  <a
                    onClick={() => setReminderType("appointment")}
                    href={() => false}
                  >
                    <div id="onclick-div" className="d-flex">
                      <div>
                        <img src={AppointmentIcon} alt="Med Icon" />{" "}
                      </div>
                      <div className="button-text">
                        <div>
                          <h5>Appointment</h5>
                        </div>
                        <div>
                          <p>Add checkups, procedures, etc. </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="number-circle">2</div>
                  <div className="text">Scheduling</div>
                </div>
                <div className="description">
                  <span>Select the date and time of your reminder.</span>
                </div>
                <div className="schedule">
                  <div className="app-field-div mt-20">
                    <label htmlFor="activityName">Start Date and time</label>
                    <DatePicker
                      className="form-control date-time-picker"
                      placeholderText="MM/DD/YYYY -- HH:MM"
                      selected={startDateTime}
                      onChange={(date) => setStartDateTime(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>

                  <div className="repeat-check">
                    <Checkbox
                      onChange={(e) => setIsRepeating(e.target.checked)}
                      value={isRepeating}
                      className="ps-0"
                      color="success"
                    />
                    <label>Repeating Reminder</label>
                  </div>
                  {isRepeating ? (
                    <>
                      {" "}
                      <div className="d-flex justify-content-between">
                        <a
                          onClick={() => setReminderFrequency("daily")}
                          href={() => false}
                        >
                          <div
                            className={
                              reminderFrequency === "daily"
                                ? "reminder-frequency frequency-selected"
                                : "reminder-frequency"
                            }
                          >
                            <div>
                              <FontAwesomeIcon icon={faCalendarDay} />
                            </div>
                            <div>
                              <span>Daily</span>
                            </div>
                          </div>
                        </a>
                        <a
                          onClick={() => setReminderFrequency("weekly")}
                          href={() => false}
                        >
                          <div
                            className={
                              reminderFrequency === "weekly"
                                ? "reminder-frequency frequency-selected"
                                : "reminder-frequency"
                            }
                          >
                            <div>
                              <FontAwesomeIcon icon={faCalendarWeek} />
                            </div>
                            <div>
                              <span>Weekly</span>
                            </div>
                          </div>
                        </a>
                        <a
                          onClick={() => setReminderFrequency("monthly")}
                          href={() => false}
                        >
                          <div
                            className={
                              reminderFrequency === "monthly"
                                ? "reminder-frequency frequency-selected"
                                : "reminder-frequency"
                            }
                          >
                            <div>
                              <FontAwesomeIcon icon={faCalendar} />
                            </div>
                            <div>
                              <span>Monthly</span>
                            </div>
                          </div>
                        </a>
                      </div>
                      {reminderFrequency === "daily" ? (
                        <div className="row daily">
                          <div className="col-md-5">
                            <div className="app-field-div mt-10">
                              <label htmlFor="location">Repeat Every</label>
                              <select
                                onChange={(e) => setRepeatEvery(e.target.value)}
                                value={repeatEvery}
                                className="form-select"
                              >
                                <option value="1">1 day</option>
                                <option value="2">2 days</option>
                                <option value="3">3 days</option>
                                <option value="4">4 days</option>
                                <option value="5">5 days</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-7">
                            <div className="app-field-div mt-10">
                              <label htmlFor="location">Duration</label>
                              <select
                                onChange={(e) => setDuration(e.target.value)}
                                value={duration}
                                className="form-select"
                              >
                                <option value="once">Once</option>
                                <option value="forever">Forever</option>
                                <option value="uptill">Up till</option>
                              </select>
                            </div>
                          </div>
                          {duration === "uptill" ? (
                            <div class="col-md-12">
                              <div className="app-field-div mt-10">
                                <label htmlFor="terminationDate">
                                  Termination date
                                </label>
                                <DatePicker
                                  className="form-control date-time-picker"
                                  placeholderText="MM/DD/YYYY"
                                  selected={terminationDate}
                                  id="terminationDate"
                                  onChange={(date) => setTerminationDate(date)}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : reminderFrequency === "weekly" ? (
                        <div className="weekly">
                          <div className="d-flex flex-wrap justify-content-around mt-10">
                            <div
                              onClick={() => setDayOfWeek("Mon")}
                              className={
                                dayOfWeek === "Mon"
                                  ? "day-selected day-circle"
                                  : "day-circle"
                              }
                            >
                              Mon
                            </div>
                            <div
                              onClick={() => setDayOfWeek("Tue")}
                              className={
                                dayOfWeek === "Tue"
                                  ? "day-selected day-circle"
                                  : "day-circle"
                              }
                            >
                              Tue
                            </div>
                            <div
                              onClick={() => setDayOfWeek("Wed")}
                              className={
                                dayOfWeek === "Wed"
                                  ? "day-selected day-circle"
                                  : "day-circle"
                              }
                            >
                              Wed
                            </div>
                            <div
                              onClick={() => setDayOfWeek("Thu")}
                              className={
                                dayOfWeek === "Thu"
                                  ? "day-selected day-circle"
                                  : "day-circle"
                              }
                            >
                              Thu
                            </div>
                            <div
                              onClick={() => setDayOfWeek("Fri")}
                              className={
                                dayOfWeek === "Fri"
                                  ? "day-selected day-circle"
                                  : "day-circle"
                              }
                            >
                              Fri
                            </div>
                            <div
                              onClick={() => setDayOfWeek("Sat")}
                              className={
                                dayOfWeek === "Sat"
                                  ? "day-selected day-circle"
                                  : "day-circle"
                              }
                            >
                              Sat
                            </div>
                            <div
                              onClick={() => setDayOfWeek("Sun")}
                              className={
                                dayOfWeek === "Sun"
                                  ? "day-selected day-circle"
                                  : "day-circle"
                              }
                            >
                              Sun
                            </div>
                          </div>
                          <div className="row daily">
                            <div className="col-md-5">
                              <div className="app-field-div mt-10">
                                <label htmlFor="location">Repeat Every</label>
                                <select
                                  onChange={(e) =>
                                    setRepeatEvery(e.target.value)
                                  }
                                  value={repeatEvery}
                                  className="form-select"
                                >
                                  <option value="1">1 week</option>
                                  <option value="2">2 weeks</option>
                                  <option value="3">3 weeks</option>
                                  <option value="4">4 weeks</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <div className="app-field-div mt-10">
                                <label htmlFor="location">Duration</label>
                                <select
                                  onChange={(e) => setDuration(e.target.value)}
                                  value={duration}
                                  className="form-select"
                                >
                                  <option value="once">Once</option>
                                  <option value="forever">Forever</option>
                                  <option value="uptill">Up till</option>
                                </select>
                              </div>
                            </div>
                            {duration === "uptill" ? (
                              <div class="col-md-12">
                                <div className="app-field-div mt-10">
                                  <label htmlFor="terminationDate">
                                    Termination date
                                  </label>
                                  <DatePicker
                                    className="form-control date-time-picker"
                                    placeholderText="MM/DD/YYYY"
                                    selected={terminationDate}
                                    id="terminationDate"
                                    onChange={(date) =>
                                      setTerminationDate(date)
                                    }
                                  />
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ) : reminderFrequency === "monthly" ? (
                        <div className="row monthly">
                          <div className="col-md-5">
                            <div className="app-field-div mt-10">
                              <label htmlFor="location">Repeat Every</label>
                              <select
                                onChange={(e) => setRepeatEvery(e.target.value)}
                                value={repeatEvery}
                                className="form-select"
                              >
                                <option value="1">1 month</option>
                                <option value="2">2 months</option>
                                <option value="3">3 months</option>
                                <option value="4">4 months</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-7">
                            <div className="app-field-div mt-10">
                              <label htmlFor="location">Duration</label>
                              <select
                                onChange={(e) => setDuration(e.target.value)}
                                value={duration}
                                className="form-select"
                              >
                                <option value="once">Once</option>
                                <option value="forever">Forever</option>
                                <option value="uptill">Up till</option>
                              </select>
                            </div>
                          </div>
                          {duration === "uptill" ? (
                            <div class="col-md-12">
                              <div className="app-field-div mt-10">
                                <label htmlFor="terminationDate">
                                  Termination date
                                </label>
                                <DatePicker
                                  className="form-control date-time-picker"
                                  placeholderText="MM/DD/YYYY"
                                  selected={terminationDate}
                                  id="terminationDate"
                                  onChange={(date) => setTerminationDate(date)}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="col-md-12">
                            <div className="app-field-div mt-10">
                              <label htmlFor="location">Repeat by</label>
                              <select className="form-select">
                                <option>Day of month</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="number-circle">3</div>
                  <div className="text">Details</div>
                </div>
                <div className="description">
                  <span>Add further information.</span>
                </div>
                <div className="details-fields">
                  <div className="app-field-div mt-20">
                    <label htmlFor="activityName">{reminderType} Name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      id="activityName"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="app-field-div mt-10">
                    <label htmlFor="location">Location</label>
                    <input
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                      id="location"
                      className="form-control"
                      placeholder="Location"
                    />
                  </div>
                  <div className="app-field-div mt-10">
                    <label htmlFor="otherComments">Other comments</label>
                    <textarea
                      onChange={(e) => setComments(e.target.value)}
                      value={comments}
                      id="otherComments"
                      className="form-control"
                      placeholder="Other details to include"
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={createReminderHandler}
                      className="btn btn-create-reminder"
                    >
                      Create Reminder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateReminder;
