import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store";
import { NavLink } from "react-router-dom";
import { logoutAction } from "../../actions/userActions";
import history from "../../helpers/history";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userState = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const toggleMenuBar = () => {
    const output = document.getElementById("navbarSupportedContent");
    if (output) {
      if (window.getComputedStyle(output).display === "none") {
        output.style.display = "block";
      } else {
        output.style.display = "none";
      }
    }
  };
  const logout = () => {
    setAnchorEl(null);
    dispatch(logoutAction());
  };

  const redirectToAccount = () => {
    setAnchorEl(null);
    history.push("/account");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" data-toggle="tab" role="tab">
            Heirshare
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenuBar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
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
              </li>
              {userState.isAuthenticated ? (
                ""
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      data-toggle="tab"
                      role="tab"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/signup"
                      className="nav-link"
                      data-toggle="tab"
                      role="tab"
                    >
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            {userState.isAuthenticated ? (
              <div className="d-flex">
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle className="user-avatar" />
                  <span className="navbar-username">
                    {userState?.user.displayName === null
                      ? userState.user.firstName
                      : userState?.user.displayName}
                  </span>
                </IconButton>
                {/* <Avatar className="user-avatar">FA</Avatar> */}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={redirectToAccount}>My account</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
