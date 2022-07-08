// General imports
import PropTypes from 'prop-types';

// Style imports
import './css/Animated.css';

/**
 * Animated component
 * @param {Object} props : component properties
 * @returns 
 */
const Animated = ({ 
  isVisible,
  animationIn,
  animationOut,
  animationInDuration,
  animationOutDuration,
  animationInDelay,
  animationOutDelay,
  className,
  style,
  children
}) => {

  // Changing properties based on visible state
  const animationProps = isVisible
    ? { name: animationIn , duration: animationInDuration , delay: animationInDelay  }
    : { name: animationOut, duration: animationOutDuration, delay: animationOutDelay };

  // Style properties to pass
  const styles = {
    "--animation-name": animationProps.name,
    "--animation-duration": `${animationProps.duration}ms`,
    "--animation-delay": `${animationProps.delay}ms`,
  };
  
  return (
    <div className={`Animated ${className ?? ''}`.trim()} style={{ ...style, ...styles }}>
      {children}
    </div>
  );
}

Animated.propTypes = {
  isVisible   : PropTypes.bool.isRequired,
  children    : PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  animationIn : PropTypes.string.isRequired,
  animationOut: PropTypes.string.isRequired,
  animationInDuration: PropTypes.number,
  animationOutDuration: PropTypes.number,
  animationInDelay: PropTypes.number,
  animationOutDelay: PropTypes.number,
}

Animated.defaultProps = {
  isVisible   : true,
  animationIn : "zoomIn",
  animationOut: "zoomOut",
  animationInDuration: 300,
  animationOutDuration: 300,
  animationInDelay: 0,
  animationOutDelay: 0,
}

export default Animated;