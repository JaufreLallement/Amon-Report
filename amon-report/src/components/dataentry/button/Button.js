// General imports
import PropTypes from 'prop-types'

// Style import
import './css/Button.css';

// Component imports

const Button = ({ id, className, children, onClick, size, style, ...otherProps }) =>
  <button
    id={id}
    className={`Button ${className ?? ''}`.trim()}
    onClick={onClick}
    style={{ ...style, "--button-size": `${size}px` }}
    {...otherProps}
  >
    {children}
  </button>;

// Properties restrictions
Button.propTypes = {
  id       : PropTypes.string,
  className: PropTypes.string,
  children : PropTypes.string,
  onClick  : PropTypes.func,
  size    : PropTypes.number,
}

Button.defaultProps = {
  children : "Button",
}

export default Button;
