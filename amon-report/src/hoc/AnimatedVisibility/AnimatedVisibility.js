// General imports
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Component imports
import { Animated } from '../../components';

// Style imports
import './css/AnimatedVisibility.css';

/**
 * Animated visibility component
 * @param {Object} props : component properties
 * @returns
 */
const AnimatedVisibility = ({
  visible,
  children,
  animationOutDuration,
  disappearOffset,
  style,
  ...rest
}) => {
  const [noDisplay, setNoDisplay] = useState(!visible);

  useEffect(() => {
    if (!visible) {
      const delay = animationOutDuration - disappearOffset;
      setTimeout(() => setNoDisplay(true), delay);
    } else setNoDisplay(false);
  }, [visible, animationOutDuration, disappearOffset]);

  const noDisplayStyle = noDisplay ? { display: "none" } : null;
  return (
    <Animated isVisible={visible} {...{ animationOutDuration }} style={{ ...noDisplayStyle, ...style }} {...rest}>
      {children}
    </Animated>
  )
}

/**
 * With visibility animation HOC
 * @param   {ReactDOM} Component            : Child component
 * @param   {String}   animationIn          : "In" animation name
 * @param   {String}   animationOut         : "Out" animation name
 * @param   {Number}   animationInDuration  : "In" animation duration
 * @param   {Number}   animationOutDuration : "Out" animation duration
 * @param   {Number}   disappearOffset      : No display offset
 * @returns {ReactDOM}                      : Child component wrapped with AnimatedVisibility
 */
const withVisibilityAnimation = (
  Component,
  animationIn,
  animationOut,
  animationInDuration,
  animationOutDuration,
  disappearOffset
  ) => ({ open, className, style, ...props }) =>
  <AnimatedVisibility
    visible={open}
    animationIn={animationIn}
    animationOut={animationOut}
    animationInDuration={animationInDuration}
    animationOutDuration={animationOutDuration}
    disappearOffset={disappearOffset}
    className={className}
    style={style}
  >
    <Component {...props} />
  </AnimatedVisibility>

AnimatedVisibility.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), PropTypes.node ]),
  animationOutDuration: PropTypes.number,
  disappearOffset: PropTypes.number,
  visible: PropTypes.bool,
}

AnimatedVisibility.defaultProps = {
  animationOutDuration: 300,
  disappearOffset: 0,
  visible: true,
}

/**
 * With visibility animation HOC for fadeIn-Out animation
 * @param   {ReactDOM} Component : Component to wrap
 * @returns {ReactDOM}           : Wrapped component
 */
const withFadeAnimation = Component => withVisibilityAnimation(Component, "fadeIn", "fadeOut", 300, 300, 0);

/**
 * With visibility animation HOC for zoomIn-Out animation
 * @param   {ReactDOM} Component : Component to wrap
 * @returns {ReactDOM}           : Wrapped component
 */
const withZoomAnimation = Component => withVisibilityAnimation(Component, "zoomIn", "zoomOut", 300, 300, 0);

/**
 * With visibility animation HOC for scaleDownIn-Out animation
 * @param   {ReactDOM} Component : Component to wrap
 * @returns {ReactDOM}           : Wrapped component
 */
const withScaleDownAnimation = Component => withVisibilityAnimation(Component, "scaleDownIn", "scaleDownOut", 300, 300, 0);

/**
 * With visibility animation HOC for scaleDownIn-Out animation
 * @param   {ReactDOM} Component : Component to wrap
 * @returns {ReactDOM}           : Wrapped component
 */
 const withSlideAnimation = Component => withVisibilityAnimation(Component, "slideInDown", "slideOutUp", 300, 300, 0);

export { withFadeAnimation, withZoomAnimation, withScaleDownAnimation, withSlideAnimation };
export default AnimatedVisibility;