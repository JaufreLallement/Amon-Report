// General imports
import PropTypes from 'prop-types';

// Component imports
import { CircleChart } from '../../';

// Script imports
import { Arrays, Maths, Objects, Color } from '../../../scripts';

// Chart types
const ChartType = {
  donut: CircleChart,
  pie  : CircleChart,
  gauge: CircleChart,
}

/**
 * ReportChart component
 * @param   {Object}       props : component properties
 * @returns {ReactElement}       : report formated chart
 */
export const ReportChart = ({
  dataSource,
  size,
  type,
  section,
  label,
  thick,
  countKey,
  colorRange,
  className,
  ...otherProps
}) => {
  const sectionData = section.getData();
  const Chart = Objects.enumVal({ ChartType }, [type]);
  let chartData;

  // If countkey is defined: count different value of the given field and use the key/value couples for the chart 
  // Else automatically use the dataSource pieces
  if (countKey) {
    const data = dataSource[0].getData();
    const mapCount  = Arrays.countFrequencies(data, countKey);
    const possibleColors = colorRange && Color.getColorRange(colorRange[0], colorRange[1], mapCount.size);

    chartData = [...mapCount.entries()].map(([key, value], i) => {
      const color   = possibleColors ? possibleColors[i] : Color.randomColor(),
            percent = Maths.percentage(value, data.length);
      return { name: key, color, count: value, percent };
    });
  } else {
    chartData = dataSource.map(src => {
      
      const sectionDataPiece = sectionData[src.getDataIndex() ?? 0],
            percent = Maths.percentage(src.getDataSize(), sectionDataPiece.getDataSize());
      return { name: src.getLabel(), color: src.getColor(), count: src.getDataSize(), percent };
    });
  }

  const props = { size, className: `ReportChart ${className ?? ''}`.trim(), thick, label, type };
  return <Chart data={chartData} {...props} {...otherProps} />;
}

ReportChart.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  section   : PropTypes.object.isRequired,
  size      : PropTypes.number,
  id        : PropTypes.string,
  label     : PropTypes.string,
  countKey  : PropTypes.string,
  thick     : PropTypes.number,
  colorRange: PropTypes.arrayOf(PropTypes.string),
  className : PropTypes.string,
}

ReportChart.defaultProps = {
  type : "pie",
  thick: 15,
}