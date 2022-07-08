// General imports
import PropTypes from 'prop-types';

// Component imports
import { TriggerProvider, withZoomAnimation } from '../../../hoc';

// Script imports
import { Objects } from '../../../scripts';

//Style imports
import './css/Popover.css';

const PopoverPlacement = {
  t : "top",
  b : "bottom",
  l : "left",
  r : "right",
  tl: "topleft",
  tr: "topright",
  bl: "bottomleft",
  br: "bottomright",
}

/**
 * PopoverBody component used with AnimatedVisibility HOC
 * @param {Object} props : component props 
 * @returns 
 */
const PopoverContent = ({ title, content, ...rest }) =>
  <div className="Popover-content" {...rest}>
    {title && <div className="Popover-title">{title}</div>}
    <div className="Popover-inner-content">{content}</div>
  </div>

// AnimatedPopover : animated with hoc
const AnimatedPopover = withZoomAnimation(PopoverContent);

/**
 * Popover component
 * @param {Object} props : component props 
 * @returns 
 */
const Popover = ({ children, placement, className, ...props }) => {
  const placementClass = Objects.enumVal({ PopoverPlacement }, [placement]);

  return (
    <TriggerProvider 
      trigger={children}
      triggerProps={{ className: "Popover-trigger" }}
      portal={{ parent: document.body, className: "pop-portal" }}
    >
      <AnimatedPopover {...props} className={`Popover Popover-${placementClass} ${className ?? ''}`} />
    </TriggerProvider>
  );
}

// Properties restrictions
Popover.propTypes = {
  title     : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  content   : PropTypes.object.isRequired,
  placement : PropTypes.string,
  children  : PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
}

Popover.defaultProps = {
  placement: "br",
}

export default Popover;