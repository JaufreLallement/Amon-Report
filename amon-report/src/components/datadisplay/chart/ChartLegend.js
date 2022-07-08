// General imports
import PropTypes from 'prop-types';

// Style import
import './css/ChartLegend.css';

/**
 * ChartLegend component : displays a chart legend with color disc
 * @param {Object} props : component properties
 * @returns 
 */
const ChartLegend = ({ data, className }) =>
  <ul className={`ChartLegend ${className ?? ''}`.trim()}>
    {data.map((d, i) =>
      <li key={i}>
        <span className="ChartLegend-disc" style={{ backgroundColor: d.color }} />
        {d.text}
      </li>
    )}
  </ul>

ChartLegend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
}

export default ChartLegend;