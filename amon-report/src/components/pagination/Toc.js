// General imports
import PropTypes from 'prop-types';

// Style imports
import './css/Toc.css';

const TocRow = ({ id, text, page, index }) =>
  <li className="ToC-Section">
    <a href={`#${id}`}>
      <span className="Toc-Section-Number">{index + 1}</span>
      <span className="Toc-Section-Text">{text}</span>
    </a>
    <span className="Toc-Dots"></span>
    <b className="Toc-Page-Number">{page + 1}</b>
  </li>

/**
 * Toc (Table of contents) component
 * @param   {Object} props 
 * @returns 
 */
const Toc = ({ data, title, size, id, className = "", style }) => {
  const tocSections = data.map((s, i) => <TocRow key={i} {...s} index={i} />);
  const classes = ["Toc-Row", ...className?.split(' ')].join(' ');

  return (
    <div className={classes}>
      <div id={id} className="Toc" style={{ ...style, width: `${size}px` }}>
        <h3 className="Toc-Title">{title}</h3>
        <ul className="Toc-List">{tocSections}</ul>
      </div>
    </div>
  );
}

// Properties restrictions
Toc.propTypes = {
  data     : PropTypes.arrayOf(PropTypes.object).isRequired,
  title    : PropTypes.string,
  size     : PropTypes.number,
  id       : PropTypes.string,
  className: PropTypes.string,
  style    : PropTypes.object,
}

Toc.defaultProps = {
  title    : "Summary",
  size     : 500,
}

export default Toc;