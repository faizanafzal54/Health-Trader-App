import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./Navbar";
import CreateReminder from "./reminders/CreateReminder";

const Home = lazy(() => import("./home/Home"));
const ResetPassword = lazy(() => import("./login/ResetPassword"));
const Medications = lazy(() => import("./medications/Medications"));

function Main() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading . . . </div>}>
        <div className="main-routes">
          <Route exact path="/" component={Home} />
          <Route exact path="/education" component={ResetPassword} />
          <Route exact path="/medications" component={Medications} />
          <CreateReminder />
        </div>
      </Suspense>
    </div>
  );
}

export default Main;
