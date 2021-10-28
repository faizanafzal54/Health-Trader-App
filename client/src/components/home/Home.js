import { withRouter } from "react-router-dom";
import MyCircle from "./MyCircle";
import Timeline from "./timeline/Timeline";
import UpcomingAppointments from "./UpcomingAppointments";

function Home() {
  return (
    <div className="home">
      <div className="main-container">
        <div className="row">
          <div className="col-md-9">
            <Timeline />
          </div>
          <div className="col-md-3">
            <div className="card">
              <UpcomingAppointments />
            </div>
            <div className="card mt-20">
              <MyCircle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Home);
