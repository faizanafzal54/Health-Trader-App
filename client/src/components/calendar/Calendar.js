import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarRemindersAction } from "../../actions/reminderActions";
import CalendarIndex, { CalendarDayHeader } from "./CalendarIndex";

function Calendar() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [yearAndMonth, setYearAndMonth] = useState([
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ]);
  const [ver_date, ver_setDate] = useState(new Date());
  const [isFirst, setIsFirst] = useState(true);

  const [calendarType, setCalendarType] = useState("Month"); //Month,Day,Week

  useEffect(() => {
    getCalendarReminders();
    setIsFirst(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(yearAndMonth[1], ver_date.getMonth());
    if (isFirst) {
      return;
    }
    if (yearAndMonth[1] === ver_date.getMonth()) {
    } else {
      const [year, month, date] = yearAndMonth;
      ver_setDate(year, month, date);
      getCalendarReminders();
      setIsFirst(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearAndMonth]);

  const getCalendarReminders = () => {
    dispatch(setCalendarRemindersAction(userState.user?._id, yearAndMonth));
  };

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
