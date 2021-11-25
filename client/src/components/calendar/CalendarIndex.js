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
import { currentMonthRange ,currentDay} from "../../helpers/dateFormator";
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
  setCalendarType,
  calendarType,

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

  const ampmList = [12,1,2,3,4,5,6,7,8,9,10,11]

  return (
    <div className="calendar-root">
      <div className="d-flex search-actions g-0 row">
        <div className="col-md-6">
          <div className="current-date d-flex flex-wrap align-items-center">
            {calendarType === 'Month' ?<span>{currentMonthRange()}</span>:<span>{currentDay()}</span> }
            
            
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
                <button onClick={()=>setCalendarType("Day")} className={calendarType === 'Day' ? "day-button selected-frequcy-butoon":"day-button"} >Day</button>
                <button onClick={()=>setCalendarType("Week")}  className={calendarType === 'Week' ? "week-button selected-frequcy-butoon":"week-button"}>Week</button>
                <button onClick={()=>setCalendarType("Month")}  className={calendarType === 'Month' ? "month-button selected-frequcy-butoon":"month-button"}>
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
      {calendarType === 'Month' ? <div className="row calendar-grids">
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
                  <div className={day.dayOfMonth === new Date().getDate() && new Date(day.dateString).getMonth() === new Date().getMonth() ?"current-day-box day-content-wrapper":"day-content-wrapper"} >{renderDay(day)}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='col-md-6'></div>
      </div>: calendarType === 'Day' ? <>
      
      <div className='row day-calendar gx-0'>
        <div className='col-md-6'>
          <div className='title'>
            <h4>AM HOURS</h4>
          </div>
          <div className='am-pm'>
            {ampmList.map(ap=> <div key={`am${ap.toString()}`} className='d-flex align-items-center justify-content-between'>
              <div><span>{ap} AM </span></div>
              <div>
                <div className='border-down'></div>
              </div>
            </div>)}
          </div>
        </div>
        <div className='col-md-6'>
        <div className='title'>

            <h4>PM HOURS</h4>
          </div>
          <div className='am-pm'>
            {ampmList.map(ap=> <div key={`pm${ap.toString()}`} className='d-flex align-items-center justify-content-between'>
              <div><span>{ap} PM </span></div>
              <div>
                <div className='border-down'></div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
      
      </>:""}
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
