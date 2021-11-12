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

function CreateReminder() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const reminderState = useSelector((state) => state.reminder);
  const dispatch = useDispatch();

  useEffect(() => {
    setModalOpen(reminderState.isReminderOpen);
  }, [reminderState.isReminderOpen]);

  const closeModalHandler = () => {
    setModalOpen(false);
    dispatch({ type: "CloseModal" });
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
                <div className="select-type-button">
                  <a href={() => false}>
                    <div id="music" className="d-flex">
                      <div>
                        <img src={MedicationIcon} alt="Med Icon" />{" "}
                      </div>
                      <div className="button-text">
                        <div>
                          <h5>Medication</h5>
                        </div>
                        <div>
                          <p>Add prescriptions, supplements, etc. </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="select-type-button selected-type ">
                  <a href={() => false}>
                    <div id="music" className="d-flex">
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
                <div className="select-type-button">
                  <a href={() => false}>
                    <div id="music" className="d-flex">
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
                      selected={null}
                      //   onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
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
                  <div className="d-flex justify-content-between">
                    <a href={() => false}>
                      <div className="reminder-frequency frequency-selected">
                        <div>
                          <FontAwesomeIcon icon={faCalendarDay} />
                        </div>
                        <div>
                          <span>Daily</span>
                        </div>
                      </div>
                    </a>
                    <a href={() => false}>
                      <div className="reminder-frequency">
                        <div>
                          <FontAwesomeIcon icon={faCalendarWeek} />
                        </div>
                        <div>
                          <span>Weekly</span>
                        </div>
                      </div>
                    </a>
                    <a href={() => false}>
                      <div className="reminder-frequency">
                        <div>
                          <FontAwesomeIcon icon={faCalendar} />
                        </div>
                        <div>
                          <span>Monthly</span>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="row daily">
                    <div className="col-md-5">
                      <div className="app-field-div mt-10">
                        <label htmlFor="location">Repeat Every</label>
                        <select className="form-select">
                          <option>4 days</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="app-field-div mt-10">
                        <label htmlFor="location">Duration</label>
                        <select className="form-select">
                          <option>Forever</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="weekly">
                    <div className="d-flex flex-wrap">
                      <div class="day-circle">Mon</div>
                      <div class="day-circle">Tue</div>
                      <div class="day-circle day-selected">Wed</div>
                    </div>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="app-field-div mt-10">
                          <label htmlFor="location">Repeat Every</label>
                          <select className="form-select">
                            <option>4 days</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="app-field-div mt-10">
                          <label htmlFor="location">Duration</label>
                          <select className="form-select">
                            <option>Until</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row monthly">
                    <div className="col-md-5">
                      <div className="app-field-div mt-10">
                        <label htmlFor="location">Repeat Every</label>
                        <select className="form-select">
                          <option>4 months</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="app-field-div mt-10">
                        <label htmlFor="location">Duration</label>
                        <select className="form-select">
                          <option>Forever</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="app-field-div mt-10">
                        <label htmlFor="location">Repeat by</label>
                        <select className="form-select">
                          <option>Day of month</option>
                        </select>
                      </div>
                    </div>
                  </div>
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
                    <label htmlFor="activityName">Service/Activity Name</label>
                    <input
                      id="activityName"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="app-field-div mt-10">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      className="form-control"
                      placeholder="Location"
                    />
                  </div>
                  <div className="app-field-div mt-10">
                    <label htmlFor="otherComments">Other comments</label>
                    <textarea
                      id="otherComments"
                      className="form-control"
                      placeholder="Other details to include"
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-create-reminder">
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
