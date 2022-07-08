// General imports
import PropTypes from 'prop-types';

// Style imports
import './css/Flex.css';

// Script imports
import { Objects } from '../../../scripts';

// CSS Alignment options
const Alignment = {
  start       : "flex-start",
  center      : "center",
  end         : "flex-end",
  stretch     : "stretch",
  spaceven    : "space-evenly",
  spacearound : "space-around",
  spacebetween: "space-between",
};

// CSS flex order options
const Order = { normal : "normal", reverse: "reverse" };

// Both Row and Col have the same render, just different css properties
const base = (tag, props) => {
  const { children, wrap, alignX, alignY, order, id, className, style } = props;
  const [ x, y ] = Objects.enumVal({ Alignment }, [alignX, alignY], ["center"]),
        rOrder   = Objects.enumVal({ Order }, [order], ["normal"]);

  const [ justifyContent, alignItems ] = (tag === "Row") ? [ x, y ] : [ y, x ];

  // Formating props
  const cssProps   = { flexWrap: wrap, justifyContent, alignItems, ...style },
        otherProps = { id, className: `${tag} ${tag}-${rOrder} ${className ?? ''}`.trim() };

  return <div {...otherProps} style={{ ...cssProps }}>{children}</div>;
}

/**
 * Returns a flex row / column
 * @param {Object} props : component props
 * @returns 
 */
const Row = props => base("Row", props);
const Col = props => base("Col", props);

const basePropTypes = {
  wrap     : PropTypes.string,
  xAlign   : PropTypes.string,
  yAlign   : PropTypes.string,
  order    : PropTypes.string,
  style    : PropTypes.object,
  id       : PropTypes.string,
  className: PropTypes.string,
};

const baseDefaultPropTypes = {
  wrap     : "nowrap",
  alignX   : "center",
  alignY   : "center",
  order    : "normal"
};

// Properties restrictions
Row.propTypes    = { ...basePropTypes };
Row.defaultProps = { ...baseDefaultPropTypes };

Col.propTypes    = { ...basePropTypes }
Col.defaultProps = { ...baseDefaultPropTypes };

const Flex = { Row, Col };
export default Flex;