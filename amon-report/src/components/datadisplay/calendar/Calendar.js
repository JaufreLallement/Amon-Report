// General imports
import { useState } from 'react';
import PropTypes from 'prop-types';

// Component imports
import { Icon } from '..';

// Script imports
import { Arrays, Time } from '../../../scripts';

// Style imports
import './css/Calendar.css';

/**
 * Calendar component
 * @param {Object} props component properties
 * @returns 
 */
const Calendar = ({ date, dateProps, id, className }) => {

  /**
   * Resolves a part of the component state based on props
   * @param   {String} date : base date string
   * @returns {Object}      : state part based on component props
   */
  const resolveStateFromDate = date => {
    const baseDate = date ? new Time(date) : new Time();
    return { month: baseDate.getRealMonth(), year: baseDate.getFullYear() };
  }

  // React hook
  const [state, setState] = useState({ ...resolveStateFromDate(date), today: new Time() });

  /**
   * Calendar header button functions
   * @returns
   */
  const onPrevYear  = () => setState(prevState => ({ ...prevState, year: prevState.year - 1 }));
  const onNextYear  = () => setState(prevState => ({ ...prevState, year: prevState.year + 1 }));
  const onPrevMonth = () => setState(prevState => ({ ...prevState, ...Time.getPreviousMonth(prevState.month, prevState.year) }));
  const onNextMonth = () => setState(prevState => ({ ...prevState, ...Time.getNextMonth(prevState.month, prevState.year) }));

  // Prepare props
  const { month, year } = state;
  const stateProps  = { month, year },
        headerProps = { ...stateProps, onPrevYear, onNextYear, onPrevMonth, onNextMonth },
        bodyProps   = { ...stateProps, dateProps };

  return (
    <div id={id} className={`Calendar ${className ?? ''}`.trim()}>
      <div className="Calendar-header">
        <CalendarHeader {...headerProps} />
      </div>
      <div className="Calendar-body">
        <CalendarGrid {...bodyProps} today={state.today} />
      </div>
    </div>
  );
}

/**
 * Calendar header component
 * @param {Object} props : component properties
 * @returns 
 */
const CalendarHeader = ({ month, year, onPrevYear, onNextYear, onPrevMonth, onNextMonth }) => {

  // Calendar header buttons properties
  const props = {
    prevY: { className: "Calendar-prev-year",  onClick: onPrevYear  },
    nextY: { className: "Calendar-next-year",  onClick: onNextYear  },
    prevM: { className: "Calendar-prev-month", onClick: onPrevMonth },
    nextM: { className: "Calendar-next-month", onClick: onNextMonth },
  }

  return (
    <div className="Calendar-header-content">
      <div className="Calendar-prev-buttons">
        <button {...props.prevY}><Icon icon="double_arrow_left" size={18} /></button>
        <button {...props.prevM}><Icon icon="arrow_left" size={18} /></button>
      </div>
      <div className="Calendar-header-display">
        <span className="Calendar-year">{year}</span>
        <span className="Calendar-month">{Time.getFullMonth(month - 1)}</span>
      </div>
      <div className="Calendar-next-buttons">
        <button {...props.nextM}><Icon icon="arrow_right" size={18} /></button>
        <button {...props.nextY}><Icon icon="double_arrow_right" size={18} /></button>
      </div>
    </div>
  );
}

/**
 * CalendarDay component
 * @param {Object} props : component properties
 * @returns 
 */
const CalendarDay = ({ day, month, year, today, dateProps }) => {
  const { day: dayDay } = day;
  const date = new Time({ ...day });

  const isToday   = Time.isSameDay(date, today),
        inMonth   = Time.isSameMonth(date, new Time({ year, month, day: 1 }));

  const passedProps = dateProps(day);
  const classNames  = `Calendar-day ${inMonth ? "Calendar-day-in-month" : ''} ${isToday ? "Calendar-today" : ''} ${passedProps?.className ?? ''}`.trim();
  
  return <td {...dateProps(day)} className={classNames}>
    <div className="Calendar-day-number">
      <span className="Calendar-day-number-inner">{dayDay}</span>
    </div>
  </td>
}

/**
 * CalendarGrid component
 * @param {Object} props : component properties
 * @returns 
 */
const CalendarGrid = ({ month, year, today, dateProps }) => {

  const dates = Time.getCalendar(month, year);
  const weeks = Arrays.chunkArray(dates, 7);
  const dayProps = { month, year, today, dateProps };

  return (
    <table className="Calendar-grid">
      <thead className="Calendar-labels">
        <tr className="Calendar-label-row">{Object.keys(Time.getRealWeek()).map((l, i) => <th key={i}>{l}</th>)}</tr>
      </thead>
      <tbody className="Calendar-weeks">
        {weeks.map((w, i) => 
          <tr key={i} className="Calendar-week ">
            {w.map((d, di) => <CalendarDay key={di} day={d} {...dayProps} />)}
          </tr>
        )}
      </tbody>
    </table>
  )
}

Calendar.propTypes = {
  date: PropTypes.string,
  onDateClick: PropTypes.func,
}

Calendar.defaultTypes = {
  date: new Time().toDateString(),
}

Calendar.Header = CalendarHeader;
Calendar.Grid = CalendarGrid;

export default Calendar;