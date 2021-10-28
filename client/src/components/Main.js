import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./Navbar";

const Home = lazy(() => import("./home/Home"));
const ResetPassword = lazy(() => import("./login/ResetPassword"));

function Main() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading . . . </div>}>
        <div className="main-routes">
          <Route exact path="/home" component={Home} />
          <Route exact path="/education" component={ResetPassword} />
        </div>
      </Suspense>
    </div>
  );
}

export default Main;
