// General imports
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Portal component
 * @param {Object} props : component properties
 * @returns 
 */
const Portal = ({ children, parent, className }) => {
  // Only recompute when depth changes
  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body;

    // Handles classNames
    const classList = ["portal-container"];
    if (className) className.split(" ").forEach((item) => classList.push(item));
    classList.forEach((item) => el.classList.add(item));

    target.appendChild(el);
    return () => target.removeChild(el);
  }, [el, parent, className]);

  return createPortal(children, el);
}

Portal.propTypes = {
  children  : PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  parent    : PropTypes.object.isRequired,
  className : PropTypes.string,
}

/**
 * With portal HOC
 * @param   {ReactDOM} Component : child component
 * @param   {Object}   parent    : parent object
 * @param   {String}   className : class name
 * @returns 
 */
const withPortal = (Component, parent, className) => ({ ...props }) =>
  <Portal parent={parent} className={className}>
    <Component {...props} />
  </Portal>

export { withPortal };
export default Portal;