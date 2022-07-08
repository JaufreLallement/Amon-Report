// General imports
import PropTypes from 'prop-types';

// Component imports
import { ProgressBar, ProgressCircle } from '../../';

// Script imports
import { Maths, Objects } from '../../../scripts';

// Progress types
const ProgressType = {
  bar   : ProgressBar,
  circle: ProgressCircle,
}

/**
 * ReportProgress component
 * @param   {Object}       props : component properties
 * @returns {ReactElement}       : report formated progress
 */
export const ReportProgress = ({  dataSource, size, type, section, className, ...otherProps }) => {
  console.log(dataSource);
  const { "@attributes": datAttr, data } = dataSource[0],
        { dataIndex, color, label }      = datAttr;
  const sectionData = section.getData();

  const percent  = Maths.round(Maths.percentage(data.length, sectionData[dataIndex ?? 0].length), 100),
        props    = { percent, color, label, size, className: `ReportProgress ${className ?? ''}`.trim() },
        Type = Objects.enumVal({ ProgressType }, [type]);

  return <Type {...props} {...otherProps} />;
}

// ReportProgress
ReportProgress.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  section   : PropTypes.object.isRequired,
  size      : PropTypes.number,
  type      : PropTypes.string,
  id        : PropTypes.string,
  className : PropTypes.string,
}

ReportProgress.defaultProps = {
  type: "bar",
}