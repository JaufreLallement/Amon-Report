// General imports
import PropTypes from 'prop-types'

// Style import
import './css/Input.css';

/**
 * Text input component
 */
const Input = ({ defaultValue, placeholder, id, className, style, ...otherProps }) => {
  return (
    <input 
      id={id}
      defaultValue={defaultValue}
      placeholder={placeholder}
      type="text"
      className={`Input ${className ?? ''}`.trim()}
      style={{ ...style }} 
      {...otherProps}
    >  
    </input>
  );
}

// Properties restrictions
Input.propTypes = {
    defaultValue: PropTypes.string,
    palceholder : PropTypes.string,
    onPressEnter: PropTypes.func,
    id          : PropTypes.string,
    className   : PropTypes.string,
}

Input.defaultProps = {
  defaultValue: "",
  palceholder : "My text",
}

export default Input;