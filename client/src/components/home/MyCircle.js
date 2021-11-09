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

function MyCircle() {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [inviteState, setInviteState] = useState({
    firstName: "",
    lastName: "",
    circle: "",
    notes: "",
    phone: "",
    email: "",
  });
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
      const res = await inviteUser({ ...inviteState, userId: userState._id });
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
                      <span className="name">
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
            <div className="title">
              <h5>New Person</h5>
            </div>
            <div className="basic-info">
              <h5>Basic Information</h5>
            </div>
            <div className="row fields">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  <div className="col-md-12 mt-13">
                    <label>
                      Circle <span className="text-danger">*</span>
                    </label>
                    <div>
                      <label className="text-muted">
                        Your circles are significant groups of people
                      </label>
                    </div>
                    <select
                      onChange={(e) => inviteStateHandler(e)}
                      name="circle"
                      className="form-select"
                      placeholder=""
                    >
                      <option value=""></option>
                      <option value="Family">Family</option>
                    </select>
                  </div>
                  <div className="col-md-12 mt-13">
                    <label>Notes</label>
                    <textarea
                      onChange={(e) => inviteStateHandler(e)}
                      name="notes"
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="profile-picture-upload basic-info text-center">
                  <h5>Profile Picture</h5>
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
            </div>
            <div className="basic-info mt-50">
              <h5>Contact Information</h5>
            </div>
            <div className="fields row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-12 mt-13">
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
              <div className="col-md-4"></div>
            </div>
            <div className="basic-info mt-50">
              <h5>Notification Settings</h5>
            </div>
            <div className="row notification-settings">
              <div className="col-md-6 mt-13">
                <button>
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Receive Text Notifications
                    </label>
                  </div>
                </button>
                <div className="mt-05 notification-checkbox">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
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
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label text-muted"
                      htmlFor="flexCheckDefault"
                    >
                      Daily report (at 6 PM)
                    </label>
                  </div>
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label text-muted"
                      htmlFor="flexCheckDefault"
                    >
                      Weekly report (Every Friday at 6 PM)
                    </label>
                  </div>
                </div>
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
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Receive Email Notifications
                    </label>
                  </div>
                </button>
                <div className="mt-05 notification-checkbox">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
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
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label text-muted"
                      htmlFor="flexCheckDefault"
                    >
                      Daily report (at 6 PM)
                    </label>
                  </div>
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label text-muted"
                      htmlFor="flexCheckDefault"
                    >
                      Weekly report (Every Friday at 6 PM)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default MyCircle;
