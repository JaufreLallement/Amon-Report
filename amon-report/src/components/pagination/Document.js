// General imports
import React from 'react';
import PropTypes from 'prop-types';

// Style imports
import './css/Pagination.css';

// Script imports
import { enumVal } from '../../scripts/objects';

/**
 * 
 */
const Document = ({ id, className, children }) => <div id={id} className={`Document ${className ?? ''}`.trim()}>{children}</div>;

/**
 * Page size enumeration
 */
const PageSize = {
  A3: "A3",
  A4: "A4",
  A5: "A5",
}

/**
 * Page layout enumeration
 */
const PageLayout = {
  portrait : "portrait",
  landscape: "landscape",
}

/**
 * Page component
 */
const Page = ({
  children,
  size,
  layout,
  pageCount,
  pageNumber,
  pageTitle,
  pageFooter,
  showFooter,
  showPageNumber,
  id,
  className
}) => {
  const pagesize   = enumVal({ PageSize }, [size]),
        pagelayout = enumVal({ PageLayout }, [layout]);

  
  const pageSpecs = { pagesize, pagelayout };
  const classes = ["Page", ...className?.split(' ') ?? ''].join(' ');
  const headerPadding = pageTitle ? { "--page-header-padding": "5px" } : {};

  return (
    <div id={id} className={classes} {...pageSpecs}>
      <div className="Page-header" style={headerPadding}>{pageTitle}</div>
      <div className="Page-body">
        {children}
      </div>
      {showFooter && (
        <div className="Page-footer">
          {pageFooter && pageFooter({ pageNumber, pageCount })}
          {showPageNumber && <span className="Page-count">{pageNumber} / {pageCount}</span>}
        </div>
      )}      
    </div>
  );
}

// Properties restrictions
Document.propTypes = {
  children : PropTypes.array,
  id       : PropTypes.string,
  className: PropTypes.string,
}

Page.propTypes = {
  size       : PropTypes.string.isRequired,
  layout     : PropTypes.string.isRequired,
  pageNumber : PropTypes.number,
  pageCount  : PropTypes.number,
  pageFooter : PropTypes.func,
  showFooter : PropTypes.bool,
  showPageNumber: PropTypes.bool,
  id         : PropTypes.string,
  className  : PropTypes.string,
}

Page.defaultProps = {
  size       : PageSize.A4,
  layout     : PageLayout.portrait,
  showFooter : true,
  showPageNumber: true,
}

Document.Page = Page;

export default Document;