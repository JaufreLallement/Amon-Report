// General imports
import PropTypes from 'prop-types';

// Style imports
import './css/CodeBox.css';

const CodeBox = ({ lang, id, className }) => {
  return <code id={id} className={`CodeBox ${className ?? ''}`.trim()} lang={lang}></code>
}

// Properties restrictions
CodeBox.propTypes = {
  lang     : PropTypes.string.isRequired,
  id       : PropTypes.string,
  className: PropTypes.string,
}

export default CodeBox;