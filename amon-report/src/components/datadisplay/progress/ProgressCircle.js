// General imports
import PropTypes from 'prop-types';

// Style imports
import './css/ProgressCircle.css';

// Scripts import
import { Maths } from '../../../scripts';

// Size interval
const Sizes = { MIN: 100, MAX: 800 }

/**
 * ProgressCircle component
 * @param   {Object} props component props
 * @returns 
 */
const ProgressCircle = ({ percent, size, color, label, thick, id, className, style }) => {

  // Limits the size to the [MIN; MAX] interval
  const realSize  = Maths.limit(size, [Sizes.MIN, Sizes.MAX]),
        thickness = Maths.limit(thick, [3, 20]);

  // Shared circle props
  const r  = 40,
        cx = 50,
        cy = 50;

  const allCircleProps = { r, cx, cy, fill: "transparent" };
  const perimeter        = Maths.circumference(r),
        strokeDashoffset = Maths.strokeOffset(perimeter, percent);

  // Defining circle, label and connector props
  const circleProps = {
    strokeWidth     : thickness,
    stroke          : color,
    strokeDasharray : perimeter,
    transform       : `rotate(-90 50 50)`,
    className       : `ProgressCircle-Progress`,
    strokeDashoffset,
    ...allCircleProps,
  },
  textProps = { x: cx, y: cy + 4, fill: "var(--font-color)", className: "ProgressCircle-Percent" };

  return (
    <figure id={id} className={`ProgressCircle ${className ?? ''}`.trim()} progresssize={size}>
      <svg width={`${realSize}px`} height={`${realSize}px`} viewBox="0 0 100 100" style={{ ...style }}>
        <g className="ProgressCircle-Donut">
          <circle {...allCircleProps} className="ProgressCircle-Center" />
          <circle {...allCircleProps} className="ProgressCircle-BG" strokeWidth={thickness} stroke="var(--grey)"/>
          <circle {...circleProps} />
          <text {...textProps}>{percent}%</text>
        </g>
      </svg>
      {label && <figcaption className="ProgressCircle-Label">{label}</figcaption>}
    </figure>
  );
}

// PropTypes
ProgressCircle.propTypes = {
  percent   : PropTypes.number.isRequired,
  size      : PropTypes.number,
  color     : PropTypes.string,
  label     : PropTypes.string,
  thick     : PropTypes.number,
  id        : PropTypes.string,
  className : PropTypes.string,
  style     : PropTypes.object,
}

// Default props value
ProgressCircle.defaultProps = {
  size      : 200,
  color     : "#000",
  thick     : 8,
}

export default ProgressCircle;