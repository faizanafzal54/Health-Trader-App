import { Redirect, Route, RouteProps } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { isUserLawyer } from "./services/roleService";

const Home = lazy(() => import("./home/Home"));
const ResetPassword = lazy(() => import("./login/ResetPassword"));
const Account = lazy(() => import("./account/Account"));

const recruiterRoutes = [];

//Private Route ........
const RecruiterPrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isUserLawyer() ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

function Main() {
  const dispatch = useDispatch();

  return (
    <div>
      <Suspense fallback={<div>Loading . . . </div>}>
        <Route exact path="/home" component={Home} />
        <Route exact path="/education" component={ResetPassword} />
        <Route exact path="/account" component={Account} />
      </Suspense>
    </div>
  );
}

export default Main;

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  path: string;
}
