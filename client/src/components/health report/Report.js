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

function Report() {
  const [search, setSearch] = useState("");
  return (
    <div className="medications module-headers">
      <div className="card">
        <div className="d-flex justify-content-between">
          <h5>Your Health Reports</h5>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <div className="d-flex search-actions justify-content-between align-items-center pb-0">
          <div className="d-flex flex-wrap pb-2">
            <div className="search">
              <FormControl>
                <InputLabel className="text-white" htmlFor="seachMedications">
                  Search Report
                </InputLabel>
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  color="secondary"
                  id="seachMedications"
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
                id="categories"
                select
                label="Categories"
                variant="standard"
              >
                <MenuItem value="All">All</MenuItem>
              </TextField>
            </div>
            <div className="category">
              <TextField
                className="text-white ms-4"
                id="categories"
                select
                label="Categories"
                variant="standard"
              >
                <MenuItem value="All">All</MenuItem>
              </TextField>
            </div>
          </div>
          <div></div>
        </div>
        <div className="report">
          <div className="header-text">
            <h5>Personal Information</h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Name</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  readOnly
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">DOB</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Gender</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Phone</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Email</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row pt-20">
            <div className="col-md-3">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Ethnicity</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  readOnly
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Language</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Martial Status</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Mailing Address</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row pt-20">
            <div className="col-md-3">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Emergency Contact Name</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  readOnly
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">EC Role</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">EC Contact#</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Guardian Name</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  readOnly
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Guardian Contact#</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6 pt-20">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">EC Mail Address</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6 pt-20">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">G Mail Address</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="header-text pt-20">
                <h5>Care Team</h5>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">Primary Care Physician</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      readOnly
                      name="email"
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">PCP Location</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      name="email"
                      readOnly
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-10">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">PCP Phone Number</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      readOnly
                      name="email"
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-8 pt-10">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">PCP Email</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      name="email"
                      readOnly
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-12 pt-10">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">PCP Address</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      name="email"
                      readOnly
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="header-text pt-20">
                <h5>Insurance Plan</h5>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">Health Insurance Provider</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      readOnly
                      name="email"
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">Provider Website</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      name="email"
                      readOnly
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-10">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">Provider Phone Number</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      readOnly
                      name="email"
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-10">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">Member ID</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      name="email"
                      readOnly
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-10">
                  <div className="app-field-div app-field-disable">
                    <label htmlFor="email">Group Name</label>
                    <input
                      // onChange={(e) => inviteStateHandler(e)}
                      name="email"
                      readOnly
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-text pt-20">
            <h5>General Health</h5>
          </div>
          <div className="row">
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Height</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  readOnly
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Weight</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">BMI</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Resting Heart Rate</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="app-field-div app-field-disable">
                <label htmlFor="email">Blood Pressure</label>
                <input
                  // onChange={(e) => inviteStateHandler(e)}
                  name="email"
                  readOnly
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
