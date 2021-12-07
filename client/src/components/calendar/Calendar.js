import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CalendarIndex, { CalendarDayHeader } from "./CalendarIndex";

function Calendar() {
  const [yearAndMonth, setYearAndMonth] = useState([
    new Date().getFullYear(),
    new Date().getMonth() + 1,
  ]);
  const [calendarType, setCalendarType] = useState("Week"); //month,day,week

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
              calendarType={calendarType}
              setCalendarType={setCalendarType}
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
