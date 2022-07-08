// General imports
import PropTypes from 'prop-types';

// Component imports
import { Ellipsis, Document, Flex } from '../../';

// Script imports
import { Type, Strings } from '../../../scripts';

// Style imports
import './css/ReportSection.css';

// Page component
const { Page } = Document;
const { Row, Col } = Flex;
const { uuid } = Strings;

// Flex grid options
const flexOptions = { row: Row, col: Col };
const attrStr = "@attributes";

/**
 * Section component
 * @param {Object} props : component props
 * @returns 
 */
const Section = ({ section, title, className }) => {
    /**
   * Renders the nest of page content
   * @param   {Object} obj    : object to explore
   * @param   {String} parent : parent key of the current explored object
   * @param   {String} index  : recursive index
   * @returns {Object[]}      : rendered nest
   */
  const renderNest = (obj, parent, index) => {
    let nest, subContent, Tag;

    if (obj instanceof Object) {
      if (Array.isArray(obj)) nest = obj.map((el, eli) => renderNest(el, parent, `${index}-${eli}`));
      if (Type.getRealType(obj) === "object") {
        if (parent === "row" || parent === "col") Tag = flexOptions[parent];
        // Check obj keys to find nested rows/cols or components
        for (let key in obj) {
          if (key === "row" || key === "col") subContent = renderNest(obj[key], key, index);
          if (key === "components") {
            subContent = obj[key].map((c, ci) => {
              const Component = c.getReportComponent();
              return <Component key={ci} dataSource={c.getData()} {...c.getProps()} section={section} />;
            });
          }
        }

        nest = Tag ? <Tag key={uuid()} {...obj[attrStr]}>{subContent}</Tag> : subContent;
      }
    }
    return nest;
  }

  // Rendering pages
  const secPages = section.getPages();
  const pages = secPages.map((p, i) => {
    const pageNumbers = { ...p.getNumbering() };

    let ellipsis  = null;
    if (p.isChunked()) {
      const { chunkNumber, chunkTotal } = p.getChunkInfos();
      ellipsis = (chunkNumber + 1 < chunkTotal) ? <Ellipsis /> : ellipsis;
    }

    const titleProps = i === 0 ? { pageTitle: title } : {};
    const pageNest = renderNest(p.getContent(), "", 0);

    return (
      <Page key={p.getId()} {...p.getSpecs()} {...titleProps} {...pageNumbers}>
        {pageNest}
        {ellipsis}
      </Page>
    );
  });

  return <div id={section.getId()} className={`Section ${className ?? ''}`.trim()}>{pages}</div>;
}

// Properties restrictions
Section.propTypes = {
  section   : PropTypes.object.isRequired,
  className : PropTypes.string,
}

export { Section };