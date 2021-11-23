import {
  faEllipsisV,
  faExpandArrowsAlt,
  faPlus,
  faSearch,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Modal,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getmycircle, inviteUser } from "./homeService";
import { useSelector } from "react-redux";
import { toastify } from "../../actions/userActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CircleView from "./CircleView";

function MyCircle() {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState(""); //view || edit
  const [inviteState, setInviteState] = useState({
    firstName: "",
    lastName: "",
    circle: "",
    notes: "",
    phone: "",
    email: "",
  });
  const [isTextNotify, setIsTextNotify] = useState(false);
  const [isTextReceiveEvery, setIsTextReceiveEvery] = useState(false);
  const [textDailyReport, setTextDailyReport] = useState({
    isEnable: false,
    time: null,
  });
  const [textWeeklyReport, setTextWeeklyReport] = useState({
    isEnable: false,
    time: null,
  });

  const [isEmailNotify, setIsEmailNotify] = useState(false);
  const [isEmailtReceiveEvery, setIsEmailtReceiveEvery] = useState(false);
  const [emailDailyReport, setEmailDailyReport] = useState({
    isEnable: false,
    time: null,
  });
  const [emailWeeklyReport, setEmailWeeklyReport] = useState({
    isEnable: false,
    time: null,
  });
  const [user, setUser] = useState(null);

  const userState = useSelector((state) => state.user.user);

  const inviteStateHandler = (e) => {
    setInviteState({
      ...inviteState,
      [e.target.name]: e.target.value,
    });
  };

  const inviteHandler = async () => {
    if (
      inviteState.firstName.length === 0 ||
      inviteState.lastName.length === 0 ||
      inviteState.email.length === 0 ||
      inviteState.circle === "" ||
      inviteState.phone === ""
    ) {
      return false;
    }
    try {
      const res = await inviteUser({
        ...inviteState,
        userId: userState._id,
        notifications: {
          textNotifications: {
            isEnable: isTextNotify,
            isReceiveEvery: isTextReceiveEvery,
            daily: {
              isEnable: textDailyReport.isEnable,
              time: textDailyReport.time,
            },
            weekly: {
              isEnable: textWeeklyReport.isEnable,
              time: textWeeklyReport.time,
            },
          },
          emailNotifications: {
            isEnable: isEmailNotify,
            isReceiveEvery: isEmailtReceiveEvery,
            daily: {
              isEnable: emailDailyReport.isEnable,
              time: emailDailyReport.time,
            },
            weekly: {
              isEnable: emailWeeklyReport.isEnable,
              time: emailWeeklyReport.time,
            },
          },
        },
      });
      if (res.status === 201) {
        toastify("success", "User has been added to my circle");
        setModalOpen(false);
        let newFriends = [
          ...friends,
          {
            _id: res.data.data.newCircle._id,
            connectionType: res.data.data.newCircle.connectionType,
            createdAt: res.data.data.newCircle.createdAt,
            status: res.data.data.newCircle.status,
            friendId: res.data.data.newUser,
          },
        ];
        setFriends(newFriends);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyCircleHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMyCircleHandler = async () => {
    const res = await getmycircle(userState._id);
    if (res.status === 200) {
      setFriends(res.data.data.mycircle);
    }
  };
  return (
    <>
      <div className="my-circle">
        <div className="title">
          <div className="d-flex justify-content-between">
            <div>
              <h4>My Circle</h4>
            </div>
            <div>
              <div className="d-flex">
                <FontAwesomeIcon
                  onClick={() => setModalOpen(true)}
                  className="me-20"
                  icon={faPlus}
                />
                <FontAwesomeIcon icon={faExpandArrowsAlt} />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex search-actions">
          <div className="search">
            <FormControl>
              <InputLabel
                className="text-white"
                htmlFor="standard-adornment-password"
              >
                Search Friends
              </InputLabel>
              <Input
                color="secondary"
                id="standard-adornment-password"
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
              label="All Groups"
              variant="standard"
            >
              <MenuItem>All Groups</MenuItem>
            </TextField>
          </div>
        </div>
        <div className="friends-list">
          {friends.map((friend) => (
            <div key={friend._id} className="d-flex friend-div">
              <div className="avatar-div">
                <Avatar className="friend-avatar">H</Avatar>
              </div>
              <div className="name-div">
                <div className="d-flex justify-content-between">
                  <div className="text-start">
                    <div>
                      <span
                        onClick={() => {
                          setUser(friend);
                          setMode("view");
                        }}
                        className="name"
                      >
                        {friend.friendId.firstName} {friend.friendId.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="relation">{friend.connectionType}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        className="m-4 overflow-auto"
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "background.paper",
            maxWidth: "719px",
            margin: "0 auto",
            boxShadow: (theme) => theme.shadows[5],
          }}
        >
          <div className="modal-new-person">
            <div className="title-div align-items-center d-flex justify-content-between">
              <h5>Add a new member</h5>
              <button onClick={() => setModalOpen(false)} className="btn">
                X
              </button>
            </div>

            <div className="form-grid">
              <div className="basic-info">
                <h5>Basic Information</h5>
              </div>
              <div className="row fields">
                <div className="col-md-3">
                  <div className="profile-picture-upload basic-info text-center">
                    <div>
                      <Avatar className="picture mt-7 mx-auto"></Avatar>
                    </div>
                    <div>
                      <button className="mt-7">
                        Upload <FontAwesomeIcon icon={faUpload} />{" "}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="app-field-div">
                        <label>
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          onChange={(e) => inviteStateHandler(e)}
                          name="firstName"
                          className="form-control"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="app-field-div">
                        <label>
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                          onChange={(e) => inviteStateHandler(e)}
                          name="lastName"
                          className="form-control"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="app-field-div">
                        <label>
                          Circle <span className="text-danger">*</span>
                        </label>
                        <select
                          onChange={(e) => inviteStateHandler(e)}
                          name="circle"
                          value={inviteState.circle}
                          className="form-select"
                          placeholder=""
                        >
                          <option disabled value="">
                            Select circle type
                          </option>
                          <option value="Family">Family</option>
                          <option value="Friends">Friends</option>
                          <option value="Providers">Providers</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12 mt-13">
                      <div className="app-field-div">
                        <label>Notes</label>
                        <textarea
                          onChange={(e) => inviteStateHandler(e)}
                          name="notes"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basic-info mt-20">
                <h5>Contact Information</h5>
              </div>
              <div className="row fields gx-0">
                <div className="col-md-4">
                  <div className="app-field-div">
                    <label>
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={(e) => inviteStateHandler(e)}
                      name="phone"
                      className="form-control"
                      placeholder="(000) - 000 - 0000"
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="app-field-div">
                    <label>
                      Contact's Email<span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={(e) => inviteStateHandler(e)}
                      name="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
              <div className="basic-info mt-20">
                <h5>Notification Settings</h5>
              </div>
              <div className="row notification-settings">
                <div className="col-md-6 mt-13">
                  <button>
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={isTextNotify}
                        onChange={(e) => setIsTextNotify(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Receive Text Notifications
                      </label>
                    </div>
                  </button>
                  {isTextNotify ? (
                    <div className="mt-05 notification-checkbox">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={isTextReceiveEvery}
                          onChange={(e) =>
                            setIsTextReceiveEvery(e.target.checked)
                          }
                        />
                        <label
                          className="form-check-label text-muted"
                          htmlFor="flexCheckDefault"
                        >
                          Receive every notification
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={textDailyReport.isEnable}
                          onChange={(e) =>
                            setTextDailyReport({
                              isEnable: e.target.checked,
                              time: textDailyReport.time,
                            })
                          }
                        />
                        <label
                          className="form-check-label text-muted"
                          htmlFor="flexCheckDefault"
                        >
                          Daily report
                        </label>
                        {textDailyReport.isEnable ? (
                          <div className="app-field-div">
                            <label htmlFor="text-daily-time">Report time</label>
                            <DatePicker
                              id="text-daily-time"
                              selected={textDailyReport.time}
                              onChange={(date) =>
                                setTextDailyReport({
                                  isEnable: true,
                                  time: date,
                                })
                              }
                              showTimeSelect
                              className="form-control"
                              showTimeSelectOnly
                              placeholderText="Select time"
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={textWeeklyReport.isEnable}
                          onChange={(e) =>
                            setTextWeeklyReport({
                              isEnable: e.target.checked,
                              time: textWeeklyReport.time,
                            })
                          }
                        />
                        <label
                          className="form-check-label text-muted"
                          htmlFor="flexCheckDefault"
                        >
                          Weekly report
                        </label>
                        {textWeeklyReport.isEnable ? (
                          <div className="app-field-div">
                            <label htmlFor="text-week-time">Report time</label>
                            <DatePicker
                              id="text-week-time"
                              selected={textWeeklyReport.time}
                              onChange={(date) =>
                                setTextWeeklyReport({
                                  isEnable: true,
                                  time: date,
                                })
                              }
                              showTimeSelect
                              placeholderText="Select time"
                              className="form-control"
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="d-flex actions mt-20">
                    <button className="cancel-button">Cancel</button>
                    <button
                      disabled={
                        inviteState.firstName.length === 0 ||
                        inviteState.lastName.length === 0 ||
                        inviteState.email.length === 0 ||
                        inviteState.circle === "" ||
                        inviteState.phone === ""
                      }
                      onClick={() => inviteHandler()}
                      className="save-button ml-30"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="col-md-6 mt-13">
                  <button>
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={isEmailNotify}
                        onChange={(e) => setIsEmailNotify(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Receive Email Notifications
                      </label>
                    </div>
                  </button>
                  {isEmailNotify ? (
                    <div className="mt-05 notification-checkbox">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={isEmailtReceiveEvery}
                          onChange={(e) =>
                            setIsEmailtReceiveEvery(e.target.checked)
                          }
                        />
                        <label
                          className="form-check-label text-muted"
                          htmlFor="flexCheckDefault"
                        >
                          Receive every notification
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={emailDailyReport.isEnable}
                          onChange={(date) =>
                            setEmailDailyReport({
                              isEnable: true,
                              time: emailDailyReport.time,
                            })
                          }
                        />
                        <label
                          className="form-check-label text-muted"
                          htmlFor="flexCheckDefault"
                        >
                          Daily report
                        </label>
                        {emailDailyReport.isEnable ? (
                          <div className="app-field-div">
                            <label htmlFor="email-daily-time">
                              Report time
                            </label>
                            <DatePicker
                              id="email-daily-time"
                              selected={emailDailyReport.time}
                              onChange={(date) =>
                                setEmailDailyReport({
                                  isEnable: true,
                                  time: date,
                                })
                              }
                              showTimeSelect
                              placeholderText="Select time"
                              className="form-control"
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={emailWeeklyReport.isEnable}
                          onChange={(e) =>
                            setEmailWeeklyReport({
                              isEnable: e.target.checked,
                              date: emailWeeklyReport.time,
                            })
                          }
                        />
                        <label
                          className="form-check-label text-muted"
                          htmlFor="flexCheckDefault"
                        >
                          Weekly report
                        </label>
                        {emailWeeklyReport.isEnable ? (
                          <div className="app-field-div">
                            <label htmlFor="email-week-time">Report time</label>
                            <DatePicker
                              id="email-week-time"
                              selected={emailWeeklyReport.time}
                              onChange={(date) =>
                                setEmailWeeklyReport({
                                  isEnable: true,
                                  time: date,
                                })
                              }
                              showTimeSelect
                              placeholderText="Select time"
                              className="form-control"
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {user !== null ? (
        <CircleView user={user} setMode={(mode)=>setMode(mode)} setUserNull={() => setUser(null)} mode={mode} />
      ) : (
        ""
      )}
    </>
  );
}

export default MyCircle;
