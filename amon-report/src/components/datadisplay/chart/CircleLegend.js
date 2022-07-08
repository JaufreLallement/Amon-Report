// General imports
import PropTypes from 'prop-types';

// Scripts import
import { Maths } from '../../../scripts';

// Style imports
import './css/CircleLegend.css';

/**
 * CircleLegend component: displays legend arround circle slice
 * @param {Object} props : component properties
 * @returns 
 */
const CircleLegend = ({ circle, labelRadius, labelAngle, strokeWidth, data }) => {
  const { r, cx = 50, cy = 50 } = circle;
  const { name, percent, count, color } = data;

  // Generating first label coords
  const { x, y } = Maths.cartCoord(labelRadius, labelAngle, { cx, cy });

  // Drifts label coords to the sides so that no label ends up at the top or bottom
  const { x: lx, y: ly } = Maths.driftCoords([x, y], 100);
  const isWest           = lx < cx,
        connectX         = isWest ? lx + 2 : lx - 2;

  // Calculates the angle between the first label connecting point and x absis.
  // Then calculates connecting point to the circle based on that angle
  const theta = Maths.arctangent([cx, cy], [connectX, ly]);
  const { x: x2, y: y2 } = Maths.cartCoord(r + strokeWidth / 2, theta, { cx, cy });

  // If the label is on right side, sets the text anchor to the left and vice versa
  const labelProps     = { x: lx, y: ly, className: isWest ? "right-anchor" : "left-anchor" },
        connectorProps = { x1: connectX, y1: ly, x2, y2 };

  const label = (
    <text {...labelProps}>
      {name}
      <tspan x={lx} dy={r / 6}>{count} : {Maths.round(percent, 10)}%</tspan>
    </text>
  );

  return (
    <g>
      <line {...connectorProps} style={{ "--connector-stroke": color }} />
      {label}
    </g>
  );
}

CircleLegend.propTypes = {
  circle: PropTypes.object.isRequired,
  labelRadius: PropTypes.number.isRequired,
  labelAngle: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

export default CircleLegend;