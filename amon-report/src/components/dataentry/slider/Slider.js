// General imports
import { useState } from 'react'
import PropTypes from 'prop-types'

// Style import
import './css/Slider.css';

/**
 * Slider component
 */
const Slider = ({ defaultValue, min, max, step, onChange, id, className }) => {

  // React hook
  const [value, setValue] = useState(defaultValue);

  /**
   * Handles changes in sliders value
   * @param {Object} e : catched event
   * @param {Function} callback : callback function to execute after state change 
   */
  const handleSlideChange = ({ target }, callback = null) => {
    setValue(target.value);
    callback(target);
  }

  const baseProps = { id, min, max, step, defaultValue, className: "Slider-input" };
    
  return (
    <div className={`Slider ${className ?? ''}`.trim()}>
      <span className="Slider-value">{value}</span>
      <input onChange={e => handleSlideChange(e, onChange)} type="range" {...baseProps} ></input>
    </div>
  );
}

// Properties restrictions
Slider.propTypes = {
  id            : PropTypes.string.isRequired,
  min           : PropTypes.string.isRequired,
  max           : PropTypes.string.isRequired,
  className     : PropTypes.string,
  step          : PropTypes.string,
  defaultValue  : PropTypes.string,
  onChange: PropTypes.func,
}

Slider.defaultProps = {
  step          : 1,
  defaultValue  : 1,
}

export default Slider;
