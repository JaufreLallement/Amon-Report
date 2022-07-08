// General imports
import PropTypes from 'prop-types';

// Style import
import './css/Icon.css';

// Icon options
import icons from './icons';

const Icon = ({ icon, color, size, style, viewBox, onClick, id, className, ...otherProps}) => (
  <svg
    id={id}
    className={`Icon ${className ?? ''}`.trim()}
    style={{ ...style }}
    onClick={onClick}
    viewBox={viewBox}
    width={`${size}px`}
    height={`${size}px`}
    {...otherProps}
  >
    <path fill={color} d={icons[icon]} />
  </svg>
);

// Properties restrictions
Icon.propTypes = {
  icon     : PropTypes.string.isRequired,
  viewBox  : PropTypes.string.isRequired,
  size     : PropTypes.number.isRequired,
  color    : PropTypes.string.isRequired,
  id       : PropTypes.string,
  className: PropTypes.string,
  onClick  : PropTypes.func,
}

Icon.defaultProps = {
  size     : 20,
  color    : "#000000",
  viewBox  : "0 0 24 24",
}

export default Icon;