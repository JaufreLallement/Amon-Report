// General imports
import PropTypes from 'prop-types';

// Component imports
import { Ellipsis, ProgressBar, ProgressCircle } from '../../';

// Script imports
import { Arrays, Maths, Objects, Color } from '../../../scripts';

// Style imports
import './css/ReportProgressList.css';

// Progress types
const ProgressType = {
  bar   : ProgressBar,
  circle: ProgressCircle,
}

/**
 * ReportProgressList component
 * @param   {Object}       props : component properties
 * @returns {ReactElement}       : report formated progress list
 */
export const ReportProgressList = ({ dataSource, countKey, max, cols, type, className, section, ...otherProps }) => {
  const dataSize = dataSource[0].getDataSize();
  const Type = Objects.enumVal({ ProgressType }, [type]);

  const mapCount  = Arrays.countFrequencies(dataSource[0].getData(), countKey),
        sortCount = Arrays.sortMap(mapCount, (next, prev) => prev[1] - next[1]);

  const liProps   = { style: { "--progress-list-cols": cols } };

  const list = [];
  for (const [key, value] of [...sortCount.entries()]) {
    const index          = list.length,
          currentPercent = Maths.round(Maths.percentage(value, dataSize), 100),
          pLabel         = `${key}: ${value}/${dataSize}`,
          progressProps  = { label: pLabel, percent: currentPercent, color: dataSource[0].getColor() ?? Color.randomColor() };
          
    if (index < max) {
      const render = <Type {...progressProps} className="ReportProgressList-Progress" />;
      list.push(<li key={index}>{render}</li>);
    } else if (index === max) list.push(<Ellipsis key={index} />);
    else break;
  }

  return (
    <div className={`ReportProgressList ${className ?? ''}`.trim()}>
      <p className="ReportProgressList-Label">{`${sortCount.size} ${section.getTitle()} (${dataSource[0].getLabel()})`}</p>
      <ul {...liProps} {...otherProps}>{list}</ul>
    </div>    
  );
}

// ReportProgressList
ReportProgressList.propTypes = {
  dataSource : PropTypes.arrayOf(PropTypes.object).isRequired,
  section    : PropTypes.object.isRequired,
  countKey   : PropTypes.string.isRequired,
  cols       : PropTypes.number,
  max        : PropTypes.number,
  id         : PropTypes.string,
  className  : PropTypes.string,
}

ReportProgressList.defaultProps = {
  type : "bar",
  cols : 2,
  max  : 10,
}