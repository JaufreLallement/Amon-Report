// General imports
import { useMemo } from 'react';
import PropTypes from 'prop-types';

// Component imports
import { Table } from '../../';

// Script imports
import { Strings } from '../../../scripts';
const { camelize } = Strings;

/**
 * ReportTable component
 * @param   {Object}       props : component properties
 * @returns {ReactElement}       : report formated table
 */
export const ReportTable = ({ dataSource, columns, className, ...otherProps }) => {
  const tableId = useMemo(() => {
    const dataLabel = dataSource[0].getLabel(),
        dataChunkInfos = dataSource[0].getChunkInfos();

    return "Table-" + camelize(dataLabel).toLowerCase() + '-' + dataChunkInfos.chunkNumber;
  }, [dataSource])
  
  const props = { data: dataSource[0].getData(), columns, className };
  return <Table id={tableId} { ...props } {...otherProps} />;
}

// ReporTable
ReportTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  section   : PropTypes.object.isRequired,
  columns   : PropTypes.arrayOf(PropTypes.object).isRequired,
  id        : PropTypes.string,
  className : PropTypes.string,
}

ReportTable.defaultProps = {
}