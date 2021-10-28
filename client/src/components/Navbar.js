import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCalendarAlt,
  faHeartbeat,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "../assets/Home icon.png";
import MessageIcon from "../assets/Message icon.png";
import MedIcon from "../assets/Meds icon.png";

function Navbar() {
  const toggleHandler = () => {
    const output = document.getElementById("navLinksContent");
    if (output) {
      if (window.getComputedStyle(output).display === "none") {
        output.style.display = "block";
      } else {
        output.style.display = "none";
      }
    }
  };

  return (
    <div className="home-nav">
      <nav className="navbar navbar-expand-lg mx-auto">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-target="#navLinksContent"
            onClick={toggleHandler}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="collapse navbar-collapse" id="navLinksContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/home">
                  <img src={HomeIcon} alt="Home icon" />
                  <span>Home</span>
                </NavLink>
                <span className="border-right"></span>
              </li>
              <li className="nav-item">
                <NavLink to="/c">
                  <FontAwesomeIcon icon={faCalendarAlt} /> <span>Calendar</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <span className="border-right"></span>
                <NavLink to="/m">
                  <img src={MedIcon} alt="Medical icon" />{" "}
                  <span>Medications</span>
                </NavLink>
              </li>
              <li>
                <span className="border-right"></span>
                <NavLink to="/h">
                  <FontAwesomeIcon icon={faHeartbeat} />{" "}
                  <span>Health Report</span>
                </NavLink>
              </li>
              <li>
                <span className="border-right"></span>
                <NavLink to="/h">
                  <img src={MessageIcon} alt="Msg icon" /> <span>Message</span>
                </NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <button className="new-reminder-btn btn">
                New Reminder&nbsp; <FontAwesomeIcon icon={faPlus} />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
