// General imports
import PropTypes from 'prop-types';

// Script imports
import { Objects } from '../../../scripts';

// Style import
import './css/Spin.css';

const SpinType = {
  circles: { className: "circles", itemNumber: 3 },
  dots   : { className: "dots"   , itemNumber: 3 },
  planets: { className: "planets", itemNumber: 5 },
}

const SpinSize = {
  "small"  : 30,
  "default": 45,
  "large"  : 70,
}

/**
 * Spin component : displays an animated spin
 * @param {Object} props : component properties
 * @returns 
 */
const Spin = ({ size, type, id, className, style }) => {
  const spinType = Objects.enumVal({ SpinType }, [type]),
        spinSize = Objects.enumVal({ SpinSize }, [size]);

  const classNames = `Spin Spin-${spinType.className} ${className ?? ''}`.trim();
  const props = { id, className: classNames, style: { ...style, "--spin-size": `${spinSize}px` } };

  return (
    <div {...props}>
      {[...Array(spinType.itemNumber)].map((e, i) => <div key={i} className={`Spin-item Spin-item-${i}`}></div>)}
    </div>
  );
}

// Properties restrictions
Spin.propTypes = {
  size      : PropTypes.string,
  type      : PropTypes.string,
  id        : PropTypes.string,
  className : PropTypes.string,
}

Spin.defaultProps = {
  size: "default",
  type: "circles",
}

export default Spin;