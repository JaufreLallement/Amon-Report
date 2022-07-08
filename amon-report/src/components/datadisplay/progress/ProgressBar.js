// General imports
import PropTypes from 'prop-types';

// Component imports

// Style import
import './css/ProgressBar.css';

const ProgressBar = ({ label, percent, color, id, className, style }) => (
<div id={id} className={`ProgressBar ${className ?? ''}`.trim()} style={style}>
    {label !== "" && <p className="ProgressBar-Label">{label}</p>}
    <div className="ProgressBar-Inforow">
      <div className="ProgressBar-BG">
        <div className="ProgressBar-Progress" style={{ width: `${percent}%`, backgroundColor: color }}></div>
      </div>
      <span className="ProgressBar-Percent">{percent}%</span>
    </div>
  </div>
);

ProgressBar.propTypes = {
  label    : PropTypes.string,
  percent  : PropTypes.number.isRequired,
  color    : PropTypes.string,
  id       : PropTypes.string,
  className: PropTypes.string,
  style    : PropTypes.object,
}

ProgressBar.defaultProps = {
  label   : "",
  color    : "#000",
}

export default ProgressBar;