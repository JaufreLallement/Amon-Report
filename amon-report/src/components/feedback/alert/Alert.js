// General imports
import { useState } from 'react';
import PropTypes from 'prop-types';

// Component imports
import { Icon } from '../..';
import { AnimatedVisibility } from '../../../hoc';
import FeedbackIcons from '../Feedback.icons';

// Script imports
import { Objects } from '../../../scripts';

// Style imports
import './css/Alert.css';

/**
 * Alert animated component : displays given alert message
 * @param {Object} props    : component props
 * @returns 
 */
const Alert = ({ message, type, onClose, className }) => {
  const alertIcon = Objects.enumVal({ FeedbackIcons }, [type]);

  // React hook
  const [open, setOpen] = useState(true);

  /**
   * On alert close function
   * @returns 
   */
  const onClosing = () => {
    setOpen(false);
    onClose && onClose();
  }
  
  return (
    <AnimatedVisibility 
      visible={open}
      animationIn="scaleDownIn"
      animationOut="scaleDownOut"
      animationInDuration={300}
      animationOutDuration={300}
      className={`AnimatedAlert ${className ?? ''}`}
    >
      <div className="Alert" type={type}>
        <Icon icon={alertIcon} size={20} />
        <p className={`Alert-message`}>{message}</p>
        <Icon icon="close" size={15} onClick={onClosing} className="Alert-X" />
      </div>
    </AnimatedVisibility>
  )
}

// Properties restrictions
Alert.propTypes = {
  message   : PropTypes.string.isRequired,
  type      : PropTypes.string,
  onClose   : PropTypes.func,
  id        : PropTypes.string,
  className : PropTypes.string,
}

Alert.defaultProps = {
  type: "warning"
}

export default Alert;