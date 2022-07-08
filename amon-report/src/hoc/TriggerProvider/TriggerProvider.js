// General imports
import { useState, useEffect, useRef, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { Portal } from '..';

/**
 * TriggerProvider component
 * @param {Object} props : component properties
 * @returns 
 */
const TriggerProvider = ({ trigger, children, triggerProps = {}, portal = null }) => {
  const wrapRef = useRef();
  const triggeRef = useRef();
  const [open, setOpen] = useState(false);
  const [triggerSize, setTriggerSize] = useState({ width: 0, height: 0 });
  const [coords, setCoords] = useState({ left: 0, top: 0 });

  // Hide children
  const hide = () => setOpen(false);

  // Show children
  const show = () => setOpen(true);
  
  /**
   * Updates trigger size and coords
   * @param {HTMLElement} trigger : clicked trigger
   */
  const updatePopCoord = trigger => {
    const rect = trigger.getBoundingClientRect();
    setCoords({ left: rect.x + window.scrollX, top: rect.y + window.scrollY + rect.height });
    setTriggerSize({ width: rect.width, height: rect.height });
  }
  
  // Trigger on click function
  const onClick = () => {
    updatePopCoord(triggeRef.current);
    return open ? hide() : show();
  }

  // React useEffect
  useEffect(() => {
    const checkClickOutside = e => {
      if (open && 
          wrapRef.current && 
          !wrapRef.current.contains(e.target) && 
          !triggeRef.current.contains(e.target)) hide();
    }
    document.addEventListener("mousedown", checkClickOutside);

    return () => document.removeEventListener("mousedown", checkClickOutside);
  }, [open]);

  // Style properties
  const styleProps = { 
    "--trigger-width" : `${triggerSize.width}px`,
    "--trigger-height": `${triggerSize.height}px`,
    "--trigger-left"  : `${coords.left}px`,
    "--trigger-top"   : `${coords.top}px`
  };

  const { className: triggerClass, ...moreTriggerProps } = triggerProps;
  const formatTriggerClass = `TriggerProvider-trigger ${triggerClass ?? ''}`.trim();
  const child = cloneElement(children, { open });

  return (
    <>
      <div className={formatTriggerClass} ref={triggeRef} style={{ width: "fit-content" }}>
        {cloneElement(trigger, { ...moreTriggerProps, onClick })}
      </div>
      {portal ?
        <Portal {...portal}>
          <div ref={wrapRef} style={styleProps}>{child}</div>
        </Portal> : <div style={styleProps}>{child}</div>
      }
    </>
  )
}

TriggerProvider.propTypes = {
  trigger      : PropTypes.node.isRequired,
  children     : PropTypes.node.isRequired,
  triggerProps : PropTypes.object,
  portal       : PropTypes.object,
}

const withTrigger = (trigger, render) => ({ triggerProps }) =>
  <TriggerProvider
    triggerProps={triggerProps}
    trigger={trigger}
    render={render}
  />


export { withTrigger }
export default TriggerProvider;