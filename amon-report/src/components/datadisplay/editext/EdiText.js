// General imports
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Component imports
import { Icon, Input } from '../..';

// Style import
import './css/EdiText.css';

const EdiText = ({ tag: CustomTag, onChange, children, id, className }) => {

  // React hook
  const ref = useRef();
  const [state, setState] = useState({ text: children, edit: false });

  /**
   * Handles text edition
   * @returns {void}
   */
  const toggleEdit = () => setState(prevState => ({ ...prevState, edit: !prevState.edit }));

  /**
   * Handles the press enter action
   * @param {String} text : text from the input text 
   */
  const handlePressEnter = text => {
    toggleEdit();
    setState(prevState => ({ ...prevState, text }));
    onChange(text);
  }

  /**
   * Handle key down event on Input
   * @param {*} e 
   */
  const handleKeyDown = e => {
    if (e.key === "Enter") handlePressEnter(e.target.value);
    if (e.key === "Escape") toggleEdit();
  }

  /**
   * React useEffect
   */
  useEffect(() => {
    const checkClickOutside = e => {
      if (state.edit && ref.current && !ref.current.contains(e.target)) toggleEdit();
    }
    
    document.addEventListener("mousedown", checkClickOutside);

    return () => {
      document.removeEventListener("mousedown", checkClickOutside);
    }
  }, [state]);

  const input = state.edit && <Input defaultValue={state.text} onKeyDown={e => handleKeyDown(e)}></Input>;

  const editext = !state.edit && (
    <div className="EdiText-Wrapper">
      <CustomTag className="EdiText-Text">{state.text}</CustomTag>
      <Icon icon="edit" className="EdiText-Icon" onClick={toggleEdit} />
    </div>
  )

  return (
    <div id={id} className={`EdiText ${className ?? ''}`.trim()} tag={CustomTag} ref={ref}>
      {state.edit ? input : editext}
    </div>
  );
}

// Properties restrictions
EdiText.propTypes = {
  tag: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  onChange: PropTypes.func,
}

EdiText.defaultProps = {
  onChange: () => {},
}

export default EdiText;