import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutAction } from "../actions/userActions";
import history from "../helpers/history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const toggleMenuBar = () => {
  //   const output = document.getElementById("navbarSupportedContent");
  //   if (output) {
  //     if (window.getComputedStyle(output).display === "none") {
  //       output.style.display = "block";
  //     } else {
  //       output.style.display = "none";
  //     }
  //   }
  // };
  const logout = () => {
    setAnchorEl(null);
    dispatch(logoutAction());
  };

  const redirectToAccount = () => {
    setAnchorEl(null);
    history.push("/account");
  };
  const renderAvatarName = (name) => {
    return name.charAt(0);
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <NavLink
            to="/"
            className="navbar-brand text-white app-title"
            data-toggle="tab"
            role="tab"
          >
            {/* FOUNTAIN LIFE */}
          </NavLink>

          {/* <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenuBar}
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
              {/*  <li className="nav-item">
               <NavLink
                  to="/home"
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/treeBuilder"
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                >
                  Tree Builder
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/account"
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                >
                  Account
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/learn"
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                >
                  Learn
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/getintouch"
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                >
                  Get in touch
                </NavLink>
              </li> */}
              {userState.isAuthenticated ? (
                ""
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link text-white"
                      data-toggle="tab"
                      role="tab"
                    >
                      Log In
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/signup"
                      className="ms-2 nav-link text-white"
                      data-toggle="tab"
                      role="tab"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {userState.isAuthenticated ? (
              <>
                <Avatar className="user-avatar">
                  {renderAvatarName(userState.user.firstName)}
                </Avatar>
                <div className="d-flex align-items-center">
                  <span className="navbar-username">
                    {userState?.user.name ?? userState.user.firstName}
                  </span>
                  <button
                    className="btn btn-sm btn-transparent text-white nav-bar-menu"
                    id="fade-button"
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleMenu}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={redirectToAccount}>My account</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
