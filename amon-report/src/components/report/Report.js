// General imports
import PropTypes from 'prop-types';

// Component imports
import { EdiText, Document } from '..';
import { Section } from './reportcomponents/'

// Style import
import './css/Report.css';

// Component destructuring

/**
 * Report component
 */
const Report = ({ conf, className }) => {

  /**
   * Generates a report title
   * @param   {String} text  : title text
   * @param   {Object} props : props to pass
   * @returns {Object}       : report title
   */
  const genTitle = (text, props) => <EdiText className="Report-Title" {...props}>{text}</EdiText>;

  const sections = [...conf.getSections().entries()].map(([k, s], i) => {
    const titleProps = { className: "Report-Title", tag: i === 0 ? "h1" : "h2" };
    return <Section key={k} section={s} title={genTitle(s.getTitle(), titleProps)} />;
  });

  return <Document id={conf.getId()} className={`Report ${className ?? ''}`.trim()}>{sections}</Document>;
}

// Properties restrictions
Report.propTypes = {
  conf      : PropTypes.object.isRequired,
  className : PropTypes.string,
}

export default Report;