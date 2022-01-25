import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./Navbar";
import CreateReminder from "./reminders/CreateReminder";

const MyAccount = lazy(() => import("./account/MyAccount"));
const Home = lazy(() => import("./home/Home"));
const ResetPassword = lazy(() => import("./login/ResetPassword"));
const Medications = lazy(() => import("./medications/Medications"));
const Calendar = lazy(() => import("./calendar/Calendar"));
const Report = lazy(() => import("./health report/Report"));
const UploadFiles = lazy(() => import("./GoAnyWhere/UploadFiles"));

function Main() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading . . . </div>}>
        <div className="main-routes">
          <Route exact path="/" component={Home} />
          <Route exact path="/education" component={ResetPassword} />
          <Route exact path="/medications" component={Medications} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/account" component={MyAccount} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/uploadFiles" component={UploadFiles} />
          <CreateReminder />
        </div>
      </Suspense>
    </div>
  );
}

export default Main;
