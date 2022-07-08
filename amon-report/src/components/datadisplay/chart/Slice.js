// General imports
import PropTypes from 'prop-types';

// Scripts import
import { Maths } from '../../../scripts';

import './css/Slice.css';

/**
 * CircleSlice component
 * @param   {Object} props : component props
 * @returns 
 */
 const Slice = ({ circle, percent, color, rotation }) => {
   const { perimeter, ...moreCircleProps } = circle;

  // Slice style properties
  const sliceStyle = {
    "--slice-stroke": color,
    "--stroke-d-offset": Maths.strokeOffset(perimeter, percent),
    "--gauge-stroke-d-array": Maths.applyPercent(perimeter / 2, percent),
    "--slice-rotation": `rotate(${rotation}deg)`,
  }

  return <circle {...moreCircleProps} className="Slice" style={sliceStyle} />
}

Slice.propTypes = {
  circle: PropTypes.object.isRequired,
  percent: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  color: PropTypes.string,
}

Slice.defaultProps = {
  color: "blue",
}

export default Slice;