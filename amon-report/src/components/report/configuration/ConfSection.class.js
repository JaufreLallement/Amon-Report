import DataPiece from './DataPiece.class';
import SectionPage from './ConfPage.class';

// Recurring attribute object key string
const attrStr = "@attributes";

/**
 * Section class
 */
 class Section {
  // Section attributes object
  #attr;
  // Section ID
  #id;
  // Section index
  #index;
  // Section title
  #title;
  // Section first page number
  #firstPage;
  // Configuration instance
  #conf;
  // Section data before transform / filter
  #refData;
  // Configuration section data instruction (transform / filter)
  #confData;
  // Configuration section pages before formatting
  #confPages;
  // Section data after transform / filter
  #data;
  // Section formated pages
  #pages;
  // Loaded formated pages
  #loadedPages = new Map();
  // Section page count
  #pageCount = 0;

  /**
   * Section constructor
   * @param {Object}        section : section infos
   * @param {Configuration} conf    : configuration instance
   */
  constructor(section, conf, index) {
    const { [attrStr]: attr, data: sectionData = [], pages } = section;
    this.#conf      = conf;
    this.#index     = index;
    this.#attr      = attr;
    this.#id        = this.#attr.id;
    this.#title     = this.#attr.title;
    this.#firstPage = this.#conf.getPageCount();
    this.#refData   = this.#conf.getRawData();
    this.#confData  = sectionData;
    this.#confPages = pages;
    this.#data      = DataPiece.factory(this.#refData, this.#confData);

    this.#pages = this.#formatPages();

    this.#pageCount = this.#pages.length;
    this.#conf.incPageCount(this.#pageCount);
  }

  /**
   * Multiple attribute getters
   * @returns {*} : attribute
   */
  getAttr      = () => this.#attr;
  getId        = () => this.#id;
  getIndex     = () => this.#index;
  getTitle     = () => this.#title;
  getFirstPage = () => this.#firstPage;
  getConf      = () => this.#conf;
  getData      = () => this.#data;
  getPages     = () => {
    this.#pages.forEach((p, i) => {
      const newPage = new SectionPage({ ...p, [attrStr]: { pageNumber: this.#firstPage + i, indexInSection: i, ...p[attrStr] } }, this);
      this.addPage(i, newPage)
    });
    return [...this.#loadedPages.values()];
  }

  getPageCount = () => this.#pageCount;

  addPage = (i, p) => {
    this.#loadedPages.set(i, p);
    this.#pageCount++;
  }

  /**
   * 
   * @param {*} title 
   * @returns 
   */
  setTitle = title => this.#title = title;

  /**
   * Formats pages content based on configuration and input data
   * @param   {Object[]} pages : base pages
   * @returns {Object[]}       : formated pages
   */
  #formatPages = (pages = this.#confPages) => {
    const tmPages = [];

    pages.forEach(p => {
      let chunked = [];
      const fmtContent = SectionPage.formatContent(p.content[0], c => {
        const chunkSize = this.#conf.getComponents()[`Report${c[attrStr].name}`].chunk;
        const dataPieces = DataPiece.factory(this.#data, c.props.dataSource) ?? null;
        if (chunkSize) {
          const maxChunk = dataPieces.reduce((prev, curr) => Math.max(prev, curr.getChunkAmount(chunkSize)), 0);
          for (let i = 0; i < maxChunk; i++) chunked.push({ ...p, [attrStr]: { chunkNumber: i, chunkTotal: maxChunk, ...p[attrStr] } });
        }
        return { ...c, props: { ...c.props, dataSource: dataPieces } };
      });
      
      if (chunked.length === 0) tmPages.push({ ...p, content: fmtContent });
      else chunked.forEach(p => tmPages.push({ ...p, content: fmtContent }));
    });

    return tmPages;
  }
}

export default Section;