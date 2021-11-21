import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CalendarIndex, { CalendarDayHeader } from "./CalendarIndex";

function Calendar() {
  const [yearAndMonth, setYearAndMonth] = useState([2021, 9]);
  return (
    <div>
      <div className="calendar module-headers">
        <div className="card">
          <div className="d-flex justify-content-between">
            <h5>My Calendar</h5>
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
          
          <div>
            <CalendarIndex
              yearAndMonth={yearAndMonth}
              onYearAndMonthChange={setYearAndMonth}
              renderDay={(calendarDayObject) => (
                <div>
                  <CalendarDayHeader calendarDayObject={calendarDayObject} />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
