import { faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import MedIcon from "../../assets/Pill icon.png";
import BadgeIcon from "../../assets/badge.png";
import BellIcon from "../../assets/Bell icon.png";
import CreateMedication from "./CreateMedication";
import { useDispatch, useSelector } from "react-redux";
import {
  createMedicationModalAction,
  getMedicationsAction,
} from "../../actions/medicationAction";

function Medications() {
  const [search, setSearch] = useState("");
  const userState = useSelector((state) => state.user);
  const medicationState = useSelector((state) => state.medication);
  const dispatch = useDispatch();

  useEffect(() => {
    getMedicationsHandler();
  }, []);

  const getMedicationsHandler = () => {
    dispatch(getMedicationsAction(userState.user._id));
  };

  const modalHander = (boolean) => {
    dispatch(createMedicationModalAction(boolean));
  };

  return (
    <div className="medications module-headers">
      <div className="card">
        <div className="d-flex justify-content-between">
          <h5>Medications</h5>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <div className="d-flex search-actions justify-content-between align-items-center pb-0">
          <div className="d-flex flex-wrap pb-2">
            <div className="search">
              <FormControl>
                <InputLabel
                  className="text-white"
                  htmlFor="standard-adornment-search"
                >
                  Search Medications
                </InputLabel>
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  color="secondary"
                  id="standard-adornment-search"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <FontAwesomeIcon
                          className="text-white"
                          icon={faSearch}
                        />
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
                label="Groups"
                variant="standard"
              >
                <MenuItem>Category</MenuItem>
              </TextField>
            </div>
          </div>
          <div>
            <button
              onClick={() => modalHander(true)}
              className="btn add-medication-btn"
            >
              Add New Medication
            </button>
          </div>
        </div>
        <div className="grid">
          {medicationState.medications.map((med) => (
            <div key={med._id} className="row">
              <div className="col-md-4 name">
                <div className="d-flex flex-wrap">
                  <div>
                    <img src={MedIcon} alt="med icon" />{" "}
                  </div>
                  <div>
                    <div>
                      <h5>{med.name}</h5>
                    </div>
                    <div>
                      <h6 className="group-name">Morning Vitamins</h6>
                    </div>
                  </div>
                </div>
                <div>
                  <p>
                    {med.dose}.{med.rate}
                  </p>
                </div>
              </div>
              <div className="col-md-4 group">
                <div className="d-flex align-items-center flex-wrap">
                  <img className="badge-img" src={BadgeIcon} alt="Badge icon" />
                  <h5>Group & Circles</h5>
                </div>
                <div>
                  <p>
                    Assigned to the group Morning Vitamins with circle(s)
                    Primary Care.
                  </p>
                </div>
                <div className="d-flex align-items-center flex-wrap">
                  <img className="bell" src={BellIcon} alt="Bell icon" />
                  <h5>Reminder</h5>
                </div>
                <div>
                  <p>Email and text daily at 9:00 AM until 12/31/2022.</p>
                </div>
              </div>
              <div className="col-md-4 details">
                <div className="d-flex flex-wrap justify-content-between">
                  {" "}
                  <h5>Prescription Details</h5>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </div>
                <label className="mt-10">
                  <span>Prescribed on:</span> Tuesday,8/13/2021
                </label>
                <label>
                  <span>Ordered By:</span> Dr: John Dawlish
                </label>
                <label>
                  <span>Details:</span> 400mg, 1/day (pill)
                </label>
                <label>
                  <span>Instructions:</span> Every morning after food
                </label>
                <label>
                  <span>Refils:</span> Yes
                </label>
              </div>
            </div>
          ))}
          {medicationState.medications.length === 0
            ? "No medication added yet"
            : ""}
        </div>
      </div>
      <CreateMedication modalHander={modalHander} />
    </div>
  );
}

export default Medications;
