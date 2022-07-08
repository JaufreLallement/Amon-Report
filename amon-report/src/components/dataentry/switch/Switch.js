// General imports
import { useState } from 'react';
import PropTypes from 'prop-types';

// Style import
import './css/Switch.css';

// Script imports
import { Objects } from '../../../scripts';

// Switch size enum
const SwitchSize = { default: "default", small  : "small" };

/**
 * Switch component : displays a switch input
 * @param {Object} props : component props 
 * @returns 
 */
const Switch = ({ size, onClick, checked, disabled, id, className }) => {
  const sizeClass = Objects.enumVal({ SwitchSize }, [size]);
  
  // React hook
  const [check, setCheck] = useState(checked);

  /**
   * On switch check function
   * @returns
   */
  const onCheck = () => {
    setCheck(prevState => !prevState);
    onClick(check);
  }

  const props = {
    id,
    className: `Switch Switch-${sizeClass} ${check ? "Switch-checked" : ""} ${disabled ? "Switch-disabled" : ""} ${className ?? ''}`.trim(),
    onClick: onCheck,
    ...disabled ? { disabled: "" } : {},
  };

  return <button {...props}><div className="Switch-handle"></div></button>;
}

// Properties restrictions
Switch.propTypes = {
  size      : PropTypes.string,
  onClick   : PropTypes.func,
  checked   : PropTypes.bool,
  disabled  : PropTypes.bool,
  id        : PropTypes.string,
  className : PropTypes.string,
}

Switch.defaultProps = {
  size    : "default",
  onClick : () => {},
  checked : false,
  disabled: false,
}

export default Switch;