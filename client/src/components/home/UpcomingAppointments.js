import { faExpandArrowsAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function UpcomingAppointments() {
  return (
    <div className="upcoming-appointments">
      <div className="title">
        <div className="d-flex justify-content-between">
          <div>
            <h4>Upcoming Appointments</h4>
          </div>
          <div>
            <div className="d-flex">
              <FontAwesomeIcon className="me-20" icon={faPlus} />
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-bottom"></div>
      <div className="follow-up-card">
        <div className="d-flex justify-content-between">
          <h5>Follow up from Appendectomy</h5>
          <button className="btn in-for-btn">In for days</button>
        </div>
        <div className="border-down"></div>
        <div className="text text-start">
          <p>
            <span className="text-green">Description: </span>Meeting to follow
            up on my recent surgery. Remember to ask for a new prescription.
          </p>
          <p>
            <span className="text-green">Date: </span>Wednesday, August 29th,
            2021 at 3:30 PM
          </p>
          <p>
            <span className="text-green">Meeting with: </span>Dr. Johnson
          </p>
          <p>
            <span className="text-green">Location: </span>1120 Wellstar Way,
            Holly Springs, GA 30114
          </p>
          <button className="btn btn-link btn-sm p-0">
            View in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpcomingAppointments;
