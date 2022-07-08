// General imports
import PropTypes from 'prop-types';

// Component imports
import Slice from './Slice';
import ChartLegend from './ChartLegend';
import CircleLegend from './CircleLegend';

// Scripts import
import { Maths } from '../../../scripts';
import { circleChartOptions } from './circleChartOptions';

// Style imports
import './css/CircleChart.css';

// Circle size interval
const Sizes = { MIN: 150, MAX: 800 };

/**
 * CircleChart component
 * @param   {Object} props : component props
 * @returns 
 */
const CircleChart = ({ data, size, thick, label, type, legend, titleAlign, id, className }) => {
  const {
    typeName, r, baseR, cx, cy, perimeter, strokeWidth, labelRadius, maxRotation, startAngle
  } = circleChartOptions(type, thick);
  const realSize  = Maths.limit(size, [Sizes.MIN, Sizes.MAX]);

  // Base circle props
  const circleProps = { r, cx, cy };  

  // Generating chart slices
  let accRotation = startAngle;
  const circles = data.map((d, key) =>{
    const { percent, color } = d;

    // If the percentage is not above 0, the element is not displayed
    if (!percent > 0) return null;

    // Circle objects (slices) math attributes
    const rotation = Maths.percent2Rotation(percent, maxRotation);

    // Slice properties
    const sliceProps  = { circle: { ...circleProps, perimeter }, color, percent, rotation: accRotation },
          legendProps = { circle: circleProps, data: d, strokeWidth, labelRadius, labelAngle: rotation / 2 + accRotation };

    accRotation += rotation;
    return (
      <g key={key} className="Slice-group">
        <Slice {...sliceProps} />
        {legend !== "aside" && <CircleLegend {...legendProps}/>}
      </g>
    )
  });

  // Handle aside legend
  let asideLegend;
  if (legend === "aside") {
    const legendData = data.map(({ name, count, percent, color }) =>
      ({ text: `${name} (${count} : ${Maths.round(percent, 10)}%)`, color }));

    asideLegend = <ChartLegend data={legendData} className="CircleChart-legend" />;
  }

  const svgStyle = {
    "--perimeter": perimeter,
    "--stroke-width": strokeWidth,
    "--donut-hover-sw": strokeWidth + 3,
    "--svg-height": `${realSize}px`
  };

  return (
    <figure id={id} className={`CircleChart ${typeName} ${className ?? ''}`.trim()} legend={legend}>
      {label && <figcaption style={{ textAlign: titleAlign }}>{label}</figcaption>}
      <div className="CircleChart-content">
        <svg viewBox="0 0 100 100" style={svgStyle}>
          <g className={`CircleChart-chart ${typeName}-chart`}>
            <circle {...circleProps} r={baseR} className={`CircleChart-bg ${typeName}-bg`}/>
            {circles}
          </g>
        </svg>
        {legend === "aside" && asideLegend}
      </div>
    </figure>
  );
}

// PropTypes
CircleChart.propTypes = {
  data       : PropTypes.arrayOf(PropTypes.object).isRequired,
  size       : PropTypes.number,
  label      : PropTypes.string,
  thick      : PropTypes.number,
  type       : PropTypes.string,
  legend     : PropTypes.string,
  titleAlign : PropTypes.string,
  id         : PropTypes.string,
  className  : PropTypes.string,
}

// Default props value
CircleChart.defaultProps = {
  data       : [],
  size       : 300,
  legend     : "arround",
  titleAlign : "center",
  thick      : 20,
  type       : "pie",
}

export default CircleChart;