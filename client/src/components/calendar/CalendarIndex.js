import PropTypes from "prop-types";
import classNames from "classnames";
import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  // getMonthDropdownOptions,
  // getYearDropdownOptions,
} from "../../helpers/calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  currentMonthRange,
  currentDay,
  currentWeek,
  currentWeekText,
} from "../../helpers/dateFormator";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import MonthViewReminders from "./MonthViewReminders";
import { useSelector } from "react-redux";
import DailyViewReminder from "./DailyViewReminder";

CalendarIndex.propTypes = {
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func,
};
export default function CalendarIndex({
  className = "",
  yearAndMonth = [2021, 6],
  onYearAndMonthChange,
  renderDay = () => null,
  setCalendarType,
  calendarType,
}) {
  const [year, month, date] = yearAndMonth;
  const tempReminders = useSelector(
    (state) => state.reminder.calendarReminders
  );

  let currentMonthDays = createDaysForCurrentMonth(year, month + 1);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month + 1,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month + 1, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;

    if (nextMonth === -1) {
      nextMonth = 11;
      nextYear = year - 1;
    }

    if (calendarType === "Month") {
      onYearAndMonthChange([nextYear, nextMonth, date]);
    } else if (calendarType === "Day") {
      let today = new Date(year, month, date);
      today.setDate(today.getDate() - 1);
      onYearAndMonthChange([
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      ]);
    } else {
      let today = new Date(year, month, date);
      today.setDate(today.getDate() - 7);
      onYearAndMonthChange([
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      ]);
    }
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 12) {
      nextMonth = 0;
      nextYear = year + 1;
    }
    if (calendarType === "Month") {
      onYearAndMonthChange([nextYear, nextMonth, date]);
    } else if (calendarType === "Day") {
      let today = new Date(year, month, date);
      today.setDate(today.getDate() + 1);
      onYearAndMonthChange([
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      ]);
    } else {
      let today = new Date(year, month, date);
      today.setDate(today.getDate() + 7);
      onYearAndMonthChange([
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      ]);
    }
  };

  const getReminderCount = (date) => {
    const filteredReminders = tempReminders.filter((reminder) => {
      return (
        new Date(reminder.date).getDate() === date.getDate() &&
        new Date(reminder.date).getMonth() === date.getMonth()
      );
    });
    return filteredReminders.length === 0 ? "" : filteredReminders.length;
  };
  const setDayFromWeek = (date) => (e) => {
    const tempDate = new Date(date);
    onYearAndMonthChange([
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate(),
    ]);
  };
  // const handleMonthSelect = (evt) => {
  //   let nextYear = year;
  //   let nextMonth = parseInt(evt.target.value, 10);
  //   onYearAndMonthChange([nextYear, nextMonth]);
  // };

  // const handleYearSelect = (evt) => {
  //   let nextMonth = month;
  //   let nextYear = parseInt(evt.target.value, 10);
  //   onYearAndMonthChange([nextYear, nextMonth]);
  // };
  const ampmList = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className="calendar-root">
      <div className="d-flex search-actions g-0 row">
        <div className="col-md-6">
          <div className="current-date d-flex flex-wrap align-items-center">
            {calendarType === "Month" ? (
              <span>{currentMonthRange(year, month)}</span>
            ) : calendarType === "Day" ? (
              <span>{currentDay(year, month, date)}</span>
            ) : (
              <span>{currentWeekText(year, month, date)} </span>
            )}

            <FontAwesomeIcon
              onClick={handleMonthNavBackButtonClick}
              className="text-white left"
              icon={faChevronLeft}
            />
            <FontAwesomeIcon
              onClick={handleMonthNavForwardButtonClick}
              className="text-white right"
              icon={faChevronRight}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 text-start">
              <div className="search">
                <FormControl style={{ width: "100%" }}>
                  <InputLabel
                    className="text-white"
                    htmlFor="standard-adornment-search"
                  >
                    Search Calendar
                  </InputLabel>
                  <Input
                    // onChange={(e) => setSearch(e.target.value)}
                    color="secondary"
                    id="standard-adornment-search"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>
                          <FontAwesomeIcon
                            className="text-white"
                            icon={faSearch}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex">
                <button
                  onClick={() => setCalendarType("Day")}
                  className={
                    calendarType === "Day"
                      ? "day-button selected-frequcy-butoon"
                      : "day-button"
                  }
                >
                  Day
                </button>
                <button
                  onClick={() => setCalendarType("Week")}
                  className={
                    calendarType === "Week"
                      ? "week-button selected-frequcy-butoon"
                      : "week-button"
                  }
                >
                  Week
                </button>
                <button
                  onClick={() => setCalendarType("Month")}
                  className={
                    calendarType === "Month"
                      ? "month-button selected-frequcy-butoon"
                      : "month-button"
                  }
                >
                  Month
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <select
          className="month-select"
          value={month}
          onChange={handleMonthSelect}
        >
          {getMonthDropdownOptions().map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select> */}
      {/* <select
          className="year-select"
          value={year}
          onChange={handleYearSelect}
        >
          {getYearDropdownOptions(year).map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select> */}
      {calendarType === "Month" ? (
        <div className="row calendar-grids">
          <div className="col-md-6">
            <div className="days-of-week">
              {daysOfWeek.map((day, index) => (
                <div
                  key={day}
                  className={classNames("day-of-week-header-cell", {
                    "weekend-day": [6, 0].includes(index),
                  })}
                >
                  {day.toString().substring(0, 3).toUpperCase()}
                </div>
              ))}
            </div>
            <div className="days-grid">
              {calendarGridDayObjects.map((day) => {
                return (
                  <div
                    key={day.dateString}
                    className={classNames("day-grid-item-container", {
                      "weekend-day": isWeekendDay(day.dateString),
                      "current-month": day.isCurrentMonth,
                    })}
                  >
                    <div
                      className={
                        day.dayOfMonth === new Date().getDate() &&
                        new Date(day.dateString).getMonth() ===
                          new Date().getMonth()
                          ? "current-day-box day-content-wrapper"
                          : "day-content-wrapper"
                      }
                    >
                      {renderDay(day)}
                      <div className="reminder-count">
                        <span>
                          {getReminderCount(new Date(day.dateString))}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-6">
            <MonthViewReminders />
          </div>
        </div>
      ) : calendarType === "Day" ? (
        <>
          <DailyViewReminder
            date={new Date(year, month, date)}
            ampmList={ampmList}
          />
        </>
      ) : calendarType === "Week" ? (
        <div className="week-calendar">
          <div className="d-flex justify-content-between flex-wrap">
            {currentWeek(year, month, date).map((_date) => {
              const count = getReminderCount(new Date(_date.date));
              return (
                <div key={_date.date.toString()}>
                  <span className="day-name text-start">{_date.day} </span>
                  <div
                    className={
                      date === _date.date.getDate() &&
                      month === _date.date.getMonth()
                        ? "box-active box"
                        : "box"
                    }
                    onClick={setDayFromWeek(_date.date)}
                  >
                    <span className="day-number">{_date.date.getDate()}</span>
                    {count > 0 ? (
                      <span className="total-reminders">{count} Reminders</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <DailyViewReminder
              date={new Date(year, month, date)}
              ampmList={ampmList}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <br />
    </div>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired,
};
export function CalendarDayHeader({ calendarDayObject }) {
  return (
    <div className="day-grid-item-header">{calendarDayObject.dayOfMonth}</div>
  );
}
