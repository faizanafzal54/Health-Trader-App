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
import React, { useState } from "react";
// import { useSelector } from "react-redux";
import MedIcon from "../../assets/Pill icon.png";
import BadgeIcon from "../../assets/badge.png";
import BellIcon from "../../assets/Bell icon.png";

function Medications() {
  const [search, setSearch] = useState("");
  // const userState = useSelector((state) => state.user.user);

  return (
    <div className="medications module-headers">
      <div className="card">
        <div className="d-flex justify-content-between">
          <h5>Medications</h5>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <div className="d-flex search-actions">
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
              label="Groups"
              variant="standard"
            >
              <MenuItem>Category</MenuItem>
            </TextField>
          </div>
        </div>
        <div className="grid">
          <div className="row">
            <div className="col-md-4 name">
              <div className="d-flex flex-wrap">
                <div>
                  <img src={MedIcon} alt="med icon" />{" "}
                </div>
                <div>
                  <div>
                    <h5>Multi-Vitamin Injection (MVI) capsule</h5>
                  </div>
                  <div>
                    <h6 className="group-name">Morning Vitamins</h6>
                  </div>
                </div>
              </div>
              <div>
                <p>400 mg, 1/day (pill). Every morning after food.</p>
              </div>
            </div>
            <div className="col-md-4 group">
              <div className="d-flex align-items-center flex-wrap">
                <img className="badge-img" src={BadgeIcon} alt="Badge icon" />
                <h5>Group & Circles</h5>
              </div>
              <div>
                <p>
                  Assigned to the group Morning Vitamins with circle(s) Primary
                  Care.
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
          <div className="row">
            <div className="col-md-4 name">
              <div className="d-flex flex-wrap">
                <div>
                  <img src={MedIcon} alt="med icon" />{" "}
                </div>
                <div>
                  <div>
                    <h5>Multi-Vitamin</h5>
                  </div>
                  <div>
                    <h6 className="group-name">Group name</h6>
                  </div>
                </div>
              </div>
              <div>
                <p>[Dose, Rate (Type)]. [Instructions]</p>
              </div>
            </div>
            <div className="col-md-4 group">
              <div className="d-flex align-items-center flex-wrap">
                <img className="badge-img" src={BadgeIcon} alt="Badge icon" />
                <h5>Group & Circles</h5>
              </div>
              <div>
                <p>
                  Assigned to the group Morning Vitamins with circle(s) Primary
                  Care.
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
        </div>
      </div>
    </div>
  );
}

export default Medications;
