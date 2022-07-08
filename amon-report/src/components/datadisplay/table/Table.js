// General imports
import PropTypes from 'prop-types';

// Style import
import './css/Table.css';

/**
 * Table component class
 */
const Table = ({ data, columns, id, className }) => {

  /**
   * Calculates the colSpan attribute based on array of children
   * @param   {Object[]} children : header children
   * @returns {Number}            : colSpan
   */
  const getColSpan = children => children.reduce((prev, curr) => (curr.children ? getColSpan(curr.children) : prev + 1), 0);

  /**
   * Processes columns props to prepare tabel headers
   * Adds useful attributes like colSpan and rowSpan
   * @param   {Object[]} columns : array of objects describing table headers
   * @returns {Object[]}         : formated headers
   */
  const tableHeaders = columns => {
    const rows = [];

    // Recursive function in order to explore the given columns
    const processHeaders = (columns, rows) => {
      const row = columns.map(c => {
        const { title, dataIndex } = c;

        // If the current header has children
        let colSpan = 1;
        if (c.children) {
          colSpan = getColSpan(c.children);
          processHeaders(c.children, rows);
        }

        return { title, dataIndex, colSpan };
      });
      rows.push(row);
    }

    processHeaders(columns, rows);

    // Table tr of the children ends up as first indexes, so we need to reverse the order
    const reversed = rows.reverse();

    // Generating the rowSpan attribute
    return reversed.map((tr, trI) => 
      tr.map((th, thI) => ({ key: `TableCol-${trI}-${thI}`, rowSpan: (th.colSpan === 1) ? reversed.length - trI : 1, ...th })));
  }

  // Table headers
  const headers = tableHeaders(columns);
    
  // Generates table head rows 
  const head = headers.map((tr, trI) => 
    <TRHead key={trI} className={`TableRow-${trI} THead-TR-${trI}`} type="header" data={tr} />);

  // Generates table body
  const body    = data.map((tr, trI) => 
    <TRBody key={trI} index={trI} headers={headers} className={`TableRow-${trI} TBody-TR-${trI}`} data={tr} />);

  return (
    <table id={id} className={`Table ${className ?? ''}`.trim()}>
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </table>
  );
}

/**
 * TRHead component
 * @param {Object} props : component props 
 * @returns {HTMLElement}  : table row <tr> composed of <th>
 */
const TRHead = ({ data, className, ...otherProps }) => {
  // For each object in the row array, generates a th element
  const cells = data.map((d, di) => {
    const { key, title, colSpan, rowSpan } = d;
    const cellProps = { colSpan, rowSpan };

    return <th key={di} className={key} {...cellProps}>{title}</th>;
  });

  return <tr className={`TableRow ${className ?? ''}`.trim()} {...otherProps}>{cells}</tr>;
}

/**
 * TRBody component
 * @param   {Object} props : component props 
 * @returns {HTMLElement}  : table row <tr> composed of <td>
 */
const TRBody = ({ data, headers, className, index, ...otherProps }) => {
  // For each table column get corresponding data in the row object
  const cells = headers.flat().map((h, i) => {
    const { key: hKey, dataIndex, render } = h;
    
    // Use the render function if specified
    const cellRender = render ? render(data[dataIndex], h, i) : data[dataIndex];
    const cellKey = `${hKey} TableCell-${index}-${i}`;

    return <td key={cellKey} className={cellKey}>{cellRender}</td>;
  });
  return <tr className={`TableRow ${className ?? ''}`.trim()} {...otherProps}>{cells}</tr>;
}

// Properties restrictions
Table.propTypes = {
  data     : PropTypes.arrayOf(PropTypes.object).isRequired,
  columns  : PropTypes.arrayOf(PropTypes.object).isRequired,
  id       : PropTypes.string,
  className: PropTypes.string,
}

TRHead.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TRBody.propTypes = {
  data: PropTypes.object.isRequired,
  headers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
}

export default Table;