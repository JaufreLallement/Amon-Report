// General imports
import { useState } from 'react';
import PropTypes from 'prop-types';

// Component imports
import { Calendar } from '../..';
import DatePickerTrigger from './DatePickerTrigger';
import { withScaleDownAnimation, TriggerProvider } from '../../../hoc';

// Script imports
import { Time } from '../../../scripts';

// Style imports
import './css/DatePicker.css';
  
/**
 * DatePicker body
 * @param {Object} props : component properties 
 * @returns 
 */
const PickerContent = ({ onDateClick, dateProps, footer }) => (
  <div className="DatePicker-content">
    <div className="DatePicker-inner-content">
      <Calendar onDateClick={onDateClick} dateProps={dateProps} />
    </div>
    {footer && (
      <div className="DatePicker-footer">
        {footer()}
      </div>
    )}
  </div>
);

const AnimatedDatePicker = withScaleDownAnimation(PickerContent);

/**
 * DatePicker component
 * @param {Object} props : component properties
 * @returns 
 */
const DatePicker = ({ defaultValue, type, showTimePicker, onSelectedEnd, footer, id, className }) => {

  /**
   * Resolves a part of the component state based on props
   * @param   {String[]} dates : base dates string
   * @returns {Object}         : state part based on component props
   */
  const resolveStateFromProps = dates => {
    const [defaultStart = "", defaultEnd = ""] = dates;
    const startDate = defaultStart !== "" ? new Time(defaultStart) : null,
          endDate   = defaultEnd   !== "" ? new Time(defaultEnd)   : null;
    return type === "simple" ? { startDate } : { startDate, endDate };
  }

  // React hook
  const [state, setState] = useState({ ...resolveStateFromProps(defaultValue), hoverDate: null });

  /**
   * Updates the selected date
   * @param {Object} date : date object
   */
  const handleDateUpdate = newDate => {
    if (type === "simple") {
      setState(prevState => ({ ...prevState, startDate: newDate }));
      onSelectedEnd && onSelectedEnd(newDate);
    }
    else {
      const isBeforeStart = state.startDate && newDate.isBefore(state.startDate),
            isFirstSelect = (!state.startDate && !state.endDate),
            bothSet       = (state.startDate && state.endDate);

      if (bothSet) setState(prevState => ({ ...prevState, startDate: newDate, endDate: null }));
      else if (isFirstSelect || isBeforeStart) setState(prevState => ({ ...prevState, startDate: newDate }));
      else {
        setState(prevState => ({ ...prevState, endDate: newDate, hoverDate: null }));
        onSelectedEnd && onSelectedEnd([state.startDate, newDate]);
      }
    }
  }

  /**
   * Handles date click event
   * @param {Object} e    : event object
   * @param {Object} date : date object
   */
  const onDateClick = (e, date) => handleDateUpdate(date);

  /**
   * Handles date hover when a range is hovered
   * @param {Object} e    : event object
   * @param {Object} date : date object
   */
  const onDateHover = (e, date) => setState(prevState => ({ ...prevState, hoverDate: date }));

  // Resets the selected dates
  const handleCancel = () => setState(prevState => ({ ...prevState, startDate: null, endDate: null }));

  /**
   * Returns the props to be passed to dates
   * @param   {Object} date : current date
   * @returns {Object}      : date props
   */
  const dateProps = date => {
    const time = new Time(date);
    let props = { onClick: e => onDateClick(e, time) };

    if (type === "simple") {
      const selected = Time.isSameDay(state.startDate, time);
            props = { ...props, className: selected ? "DatePicker-selected" : '' };
    } else {
      // Start / End selected
      const startSelected = Time.isSameDay(state.startDate, time),
            endSelected   = Time.isSameDay(state.endDate, time),
            selectedClass = `${startSelected ? "DatePicker-selected-start" : ''} ${endSelected ? "DatePicker-selected-end" : ''}`;
      // Between selection
      const isBetween    = time.isBetween(state.startDate, state.endDate),
            betweenClass = `${isBetween ? "DatePicker-in-range" : ''}`;

      // Hover mode and hover range
      const isHoverMode     = (state.startDate && !state.endDate),
            hoverFunc       = isHoverMode ? { onMouseOver: e => onDateHover(e, time) } : {},
            inHoverRange    = time.isBetween(state.startDate, state.hoverDate) || time.isSameDay(state.hoverDate),
            hoverRangeClass = isHoverMode ? `${inHoverRange ? "DatePicker-in-hover-range" : ''}` : '';

      const classes = [selectedClass, betweenClass, hoverRangeClass].join(' ');
      props = { ...props, ...hoverFunc, className: classes };
    }

    return props;
  }

  return (
    <TriggerProvider
      trigger={<DatePickerTrigger displayValues={[state.startDate, state.endDate]} type={type} onCancel={handleCancel} />}
      triggerProps={{ className: `DatePicker-trigger ${className ?? ''}`.trim() }}
      portal={{ parent: document.body, className: "picker-portal" }}
    >
      <AnimatedDatePicker 
        id={id}
        className="DatePicker"
        onDateClick={onDateClick}
        dateProps={dateProps}
        footer={footer}
      />
    </TriggerProvider>
  );
}

DatePicker.propTypes = {
  defaultValue  : PropTypes.arrayOf(PropTypes.string),
  type          : PropTypes.string,
  onSelectedEnd : PropTypes.func,
  footer        : PropTypes.func,
}

DatePicker.defaultProps = {
  defaultValue: [],
  type        : "simple",
}

export default DatePicker;