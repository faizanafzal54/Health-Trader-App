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
import { currentMonthRange } from "../../helpers/dateFormator";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";

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
}) {
  const [year, month] = yearAndMonth;

  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
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

  return (
    <div className="calendar-root">
      <div className="d-flex search-actions g-0 row">
        <div className="col-md-6">
          <div className="current-date d-flex flex-wrap align-items-center">
            <span>{currentMonthRange()}</span>
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
                <FormControl style={{width:"100%"}}>
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
                <button className="day-button">Day</button>
                <button className="week-button">Week</button>
                <button className="month-button selected-frequcy-butoon">
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
                  <div className={day.dayOfMonth === new Date().getDate() ?"current-day-box day-content-wrapper":"day-content-wrapper"} >{renderDay(day)}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='col-md-6'></div>
      </div>
      <br/>
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
