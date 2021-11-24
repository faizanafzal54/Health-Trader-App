import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Modal, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteUser, editUser } from "./homeService";
import { toastify } from "../../actions/userActions";

function CircleView(props) {
  const [isViewModalOpen, setModalOpen] = useState(false);

  const [inviteState, setInviteState] = useState({
    firstName: "",
    lastName: "",
    circle: "",
    notes: "",
    phone: "",
    email: "",
  });
  const [_id, set_id] = useState(null);
  const [connectionId, setConnectionId] = useState(null);
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

  const userState = useSelector((state) => state.user.user);

  const inviteStateHandler = (e) => {
    setInviteState({
      ...inviteState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    debugger
    if (props.user !== null) {
      setModalOpen(true);
      set_id(props.user?.friendId._id)
      setConnectionId(props.user?._id)
      setInviteState({
        firstName: props.user?.friendId.firstName,
        lastName: props.user?.friendId.lastName,
        circle: props.user?.connectionType,
        notes: props.user?.friendId.notes,
        phone: props.user?.friendId.phone,
        email: props.user?.friendId.email,
      });
      setIsTextNotify(
        props.user?.friendId?.notifications.textNotifications.isEnable
      );
      setIsTextReceiveEvery(
        props.user?.friendId?.notifications.textNotifications.isReceiveEvery
      );
      setTextDailyReport({
        isEnable:
          props.user?.friendId?.notifications.textNotifications.daily.isEnable,
        time: new Date(
          props.user?.friendId?.notifications.textNotifications.daily.time
        ),
      });
      setTextWeeklyReport({
        isEnable:
          props.user?.friendId?.notifications.textNotifications.weekly.isEnable,
        time: new Date(
          props.user?.friendId?.notifications.textNotifications.weekly.time
        ),
      });
      //
      setIsEmailNotify(
        props.user?.friendId?.notifications.emailNotifications.isEnable
      );
      setIsEmailtReceiveEvery(
        props.user?.friendId?.notifications.emailNotifications.isReceiveEvery
      );
      setEmailDailyReport({
        isEnable:
          props.user?.friendId?.notifications.emailNotifications.daily.isEnable,
        time: new Date(
          props.user?.friendId?.notifications.emailNotifications.daily.time
        ),
      });
      setEmailWeeklyReport({
        isEnable:
          props.user?.friendId?.notifications.emailNotifications.weekly
            .isEnable,
        time: new Date(
          props.user?.friendId?.notifications.emailNotifications.weekly.time
        ),
      });
    }
  }, [props]);

  const deleteHandler =async ()=>{
    try {
      const res = await deleteUser(_id,connectionId)
      if(res.status === 204){
        toastify('error',"User has been deleted")
        setModalOpen(false);
        props.deleteFriend(connectionId)
        props.setUserNull();
      }
    } catch (err) {
      
    }
  }

  const editHandler = async()=>{
    try {
      const res = await editUser({
        ...inviteState,
        userId:_id,
        ownerId: userState._id,
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
      })
      if(res.status === 200){
        toastify('success',"changes has been saved")
        setModalOpen(false);
        let newUserObj = {
          ...res.data.data.mycircle,
          friendId:res.data.data.user

        }
        props.updateFriends(newUserObj)
        props.setUserNull();
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal
      className="m-4 overflow-auto"
      open={isViewModalOpen}
      onClose={() => {
        setModalOpen(false);
        props.setUserNull();
      }}
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
            <h5>Member - {inviteState.firstName} </h5>
            <button
              onClick={() => {
                setModalOpen(false);
                props.setUserNull();
              }}
              className="btn"
            >
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
                  {props.mode === "view" ? (
                    ""
                  ) : (
                    <div>
                      <button className="mt-7">
                        Upload <FontAwesomeIcon icon={faUpload} />{" "}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-4">
                    <div
                      className={
                        props.mode === "view"
                          ? "app-field-disable app-field-div"
                          : "app-field-div"
                      }
                    >
                      <label>
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        disabled={props.mode === "view"}
                        value={inviteState.firstName}
                        onChange={(e) => inviteStateHandler(e)}
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className={
                        props.mode === "view"
                          ? "app-field-disable app-field-div"
                          : "app-field-div"
                      }
                    >
                      <label>
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        disabled={props.mode === "view"}
                        value={inviteState.lastName}
                        onChange={(e) => inviteStateHandler(e)}
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className={
                        props.mode === "view"
                          ? "app-field-disable app-field-div"
                          : "app-field-div"
                      }
                    >
                      <label>
                        Circle <span className="text-danger">*</span>
                      </label>
                      <select
                        disabled={props.mode === "view"}
                        value={inviteState.circle}
                        onChange={(e) => inviteStateHandler(e)}
                        name="circle"
                        className="form-select"
                        placeholder=""
                      >
                        <option disabled value="">
                          Select circle type
                        </option>
                        <option value="Family">Family</option>
                        <option value="Friend">Friend</option>
                        <option value="Provider">Provider</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 mt-13">
                    <div
                      className={
                        props.mode === "view"
                          ? "app-field-disable app-field-div"
                          : "app-field-div"
                      }
                    >
                      <label>Notes</label>
                      <textarea
                        disabled={props.mode === "view"}
                        value={inviteState.notes}
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
                <div
                  className={
                    props.mode === "view"
                      ? "app-field-disable app-field-div"
                      : "app-field-div"
                  }
                >
                  <label>
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    disabled={props.mode === "view"}
                    value={inviteState.phone}
                    onChange={(e) => inviteStateHandler(e)}
                    name="phone"
                    className="form-control"
                    placeholder="(000) - 000 - 0000"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div
                  className={
                    props.mode === "view"
                      ? "app-field-disable app-field-div"
                      : "app-field-div"
                  }
                >
                  <label>
                    Contact's Email<span className="text-danger">*</span>
                  </label>
                  <input
                    disabled={props.mode === "view"}
                    onChange={(e) => inviteStateHandler(e)}
                    value={inviteState.email}
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
                    {props.mode === "view" ? (
                      ""
                    ) : (
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isTextNotify}
                        onChange={(e) => setIsTextNotify(e.target.checked)}
                      />
                    )}
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
                      {props.mode === "view" ? (
                        ""
                      ) : (
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isTextReceiveEvery}
                          onChange={(e) =>
                            setIsTextReceiveEvery(e.target.checked)
                          }
                        />
                      )}
                      {props.mode === "view" && !isTextReceiveEvery ? (
                        ""
                      ) : (
                        <label
                          className="form-check-label text-muted"
                          htmlFor="flexCheckDefault"
                        >
                          Receive every notification
                        </label>
                      )}
                    </div>
                    <div className="form-check">
                      {props.mode === "view" ? (
                        ""
                      ) : (
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={textDailyReport.isEnable}
                          onChange={(e) =>
                            setTextDailyReport({
                              isEnable: e.target.checked,
                              time: textDailyReport.time,
                            })
                          }
                        />
                      )}
                      {props.mode === "view" && !textDailyReport.isEnable ? (
                        ""
                      ) : (
                        <label
                          className="form-check-label text-muted"
                          htmlFor="flexCheckDefault"
                        >
                          Daily report
                        </label>
                      )}

                      {textDailyReport.isEnable ? (
                        <>
                          <div
                            className={
                              props.mode === "view"
                                ? "app-field-disable app-field-div"
                                : "app-field-div"
                            }
                          >
                            <label htmlFor="text-daily-time">Report time</label>
                            <DatePicker
                              disabled={props.mode === "view"}
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
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-check mb-0">
                      {props.mode === "view" ? (
                        ""
                      ) : (
                        <>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={textWeeklyReport.isEnable}
                            onChange={(e) =>
                              setTextWeeklyReport({
                                isEnable: e.target.checked,
                                time: textWeeklyReport.time,
                              })
                            }
                          />
                        </>
                      )}
                      {props.mode === "view" && !textWeeklyReport.isEnable ? (
                        ""
                      ) : (
                        <label
                          className="form-check-label text-muted"
                          htmlFor="flexCheckDefault"
                        >
                          Weekly report
                        </label>
                      )}
                      {textWeeklyReport.isEnable ? (
                        <>
                          <div
                            className={
                              props.mode === "view"
                                ? "app-field-disable app-field-div"
                                : "app-field-div"
                            }
                          >
                            <label htmlFor="text-week-time">Report time</label>
                            <DatePicker
                              disabled={props.mode === "view"}
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
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="d-flex actions mt-20">
                  {props.mode === "view" ? (
                    <>
                      <button
                        onClick={() => props.setMode("edit")}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button onClick={deleteHandler} className="delete-button ml-30">Delete</button>
                    </>
                  ) : (
                    <>
                      <button onClick={()=>{
                        setModalOpen(false);
                        props.setUserNull();
                      }} className="cancel-button">Cancel</button>
                      <button onClick={editHandler} className="save-button ml-30">Save</button>
                    </>
                  )}
                </div>
              </div>
              <div className="col-md-6 mt-13">
                <button>
                  <div className="form-check mb-0">
                    {props.mode === "view" ? (
                      ""
                    ) : (
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isEmailNotify}
                        onChange={(e) => setIsEmailNotify(e.target.checked)}
                      />
                    )}
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
                      {props.mode === "view" ? (
                        ""
                      ) : (
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isEmailtReceiveEvery}
                          onChange={(e) =>
                            setIsEmailtReceiveEvery(e.target.checked)
                          }
                        />
                      )}
                     {props.mode === 'view' && !isEmailtReceiveEvery ? "" :  <label
                        className="form-check-label text-muted"
                        htmlFor="flexCheckDefault"
                      >
                        Receive every notification
                      </label>}
                    </div>
                    <div className="form-check">
                      {props.mode === "view" ? (
                        ""
                      ) : (
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={emailDailyReport.isEnable}
                          onChange={(e) =>
                            setEmailDailyReport({
                              isEnable: e.target.checked,
                              time: emailDailyReport.time,
                            })
                          }
                        />
                      )}
                      {props.mode === 'view' && !emailDailyReport.isEnable ? "" : <label
                        className="form-check-label text-muted"
                        htmlFor="flexCheckDefault"
                      >
                        Daily report
                      </label>}
                      
                      {emailDailyReport.isEnable ? (
                        <div
                          className={
                            props.mode === "view"
                              ? "app-field-disable app-field-div"
                              : "app-field-div"
                          }
                        >
                          <label htmlFor="email-daily-time">Report time</label>
                          <DatePicker
                            disabled={props.mode === "view"}
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
                      {props.mode === "view" ? (
                        ""
                      ) : (
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={emailWeeklyReport.isEnable}
                          onChange={(e) =>
                            setEmailWeeklyReport({
                              isEnable: e.target.checked,
                              time: emailWeeklyReport.time,
                            })
                          }
                        />
                      )}
                      {props.mode === 'view' && !emailWeeklyReport.isEnable ? "" : <label
                        className="form-check-label text-muted"
                        htmlFor="flexCheckDefault"
                      >
                        Weekly report
                      </label>}
                     
                      {emailWeeklyReport.isEnable ? (
                        <div
                          className={
                            props.mode === "view"
                              ? "app-field-disable app-field-div"
                              : "app-field-div"
                          }
                        >
                          <label htmlFor="email-week-time">Report time</label>
                          <DatePicker
                            disabled={props.mode === "view"}
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
  );
}

export default CircleView;
