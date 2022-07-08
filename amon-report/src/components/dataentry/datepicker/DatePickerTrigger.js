// General imports
import PropTypes from 'prop-types';

// Component imports
import { Icon } from '../..';

/**
 * DatePicker cancel icon to reset dates
 * @param {Object} props : component props 
 * @returns 
 */
const DatePickerCancel = ({ onCancel }) =>
  <span className="DatePicker-cancel" onClick={onCancel}><Icon icon="cancel" size={15} /></span>

/**
* DatePicker trigger button
* @param {Object} props : component properties 
* @returns 
*/
const DatePickerTrigger = ({ displayValues, type, onClick, onCancel }) => {
  const [startDate, endDate] = displayValues;

  const options = {
    start: { value: startDate, display: startDate?.toDateString() ?? "Start date", className: "DatePicker-start-date" },
    end  : { value: endDate, display: endDate?.toDateString() ?? "End date", className: "DatePicker-end-date" }
  }

  const getSpanValue = ({ value, display, className }) =>
    <span className={`${className} ${!value ? "DatePicker-placeholder" : ''}`}>{display}</span>

  return (
    <button onClick={onClick}>
      {getSpanValue(options.start)}
      {type === "range" && (
        <>
          <Icon className="DatePicker-range-arrow" icon="flat_arrow_right" />
          {getSpanValue(options.end)}
        </>
      )}
      {startDate && <DatePickerCancel onCancel={onCancel} />}
    </button>
  )
}

DatePickerTrigger.propTypes = {
  displayValues : PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancel      : PropTypes.func.isRequired,
  onClick       : PropTypes.func,
  type          : PropTypes.string,
}

DatePickerTrigger.defaultProps = {
  type        : "simple",
}

export default DatePickerTrigger;