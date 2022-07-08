// General imports
import PropTypes from 'prop-types';

// Style import
import './css/Fieldset.css';

/**
 * Fieldset component
 * @param   {Object} props : component props 
 * @returns 
 */
const Fieldset = ({ legend, children, id, className }) => (
  <fieldset id={id} className={`Fieldset ${className ?? ''}`.trim()}>
    <legend>{legend}</legend>
    <div className="Fieldset-Content">
      {children}
    </div>
  </fieldset>
);

// Properties restrictions
Fieldset.propTypes = {
  legend        : PropTypes.string.isRequired,
  id            : PropTypes.string,
  className     : PropTypes.string,
}

export default Fieldset;