import { Switch, Route, Redirect, Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login/Login";

import SignUp from "./components/signup/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "./helpers/history";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import Main from "./components/Main";
import { checkAuth } from "./components/login/loginService";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "./components/Header";

//Private Route ........
const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        checkAuth() ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

function App() {
  const userState = useSelector((state) => state.user);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userState.token}`;

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userState.token}`;
  }, [userState.token]);

  return (
    <div className="App">
      <ToastContainer />
      <Router history={history}>
        <Header />

        <Switch>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/resetPassword/:link" component={ResetPassword} />
          <PrivateRoute path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
