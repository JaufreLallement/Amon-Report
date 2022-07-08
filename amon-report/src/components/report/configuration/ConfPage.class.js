import Component from './ConfComponent.class';
import { Type } from "../../../scripts";

// Recurring attribute object key string
const attrStr = "@attributes";

/**
 * SectionPage class
 */
 class SectionPage {
  // Page attributes
  #attr;
  // Page size
  #size;
  // Page layout
  #layout;
  // Page ID
  #id;
  // Page number
  #number;
  // Page number in the section
  #indexInSection;
  // Page content
  #content;
  // Section instance
  #section;
  // Page component count
  #componentCount = 0

  /**
   * SectionPage constructor
   * @param {Object} page     : page infos
   * @param {Section} section : section instance
   */
  constructor (page, section) {
    const { [attrStr]: attr, content } = page;
    const { size = "A4", layout = "portrait", pageNumber } = attr;
    this.#section = section;
    this.#attr    = attr;
    this.#content = content;
    this.#indexInSection = this.#attr.indexInSection;
    this.#size   = size;
    this.#layout = layout;
    this.#number = pageNumber + 1;
    this.#id     = `${this.#section.getId()}-p${this.#indexInSection}`;
  }

  /**
   * Multiple attribute getters
   * @returns {*} attribute
   */
  getAttr             = () => this.#attr;
  getSpecs            = () => ({ size: this.#size, layout: this.#layout });
  getNumber           = () => this.#number;
  getId               = () => this.#id;
  getIndexInPage      = () => this.#indexInSection;
  isChunked           = () => ("chunkNumber" in this.#attr);
  getChunkInfos       = () => this.isChunked() ? ({ chunkNumber: this.#attr.chunkNumber, chunkTotal: this.#attr.chunkTotal }) : null;

  getContent          = () => SectionPage.formatContent(this.#content, c =>
    new Component({ ...c, [attrStr]: { numberInPage: this.#incComponentCount(), ...c[attrStr] } }, this));

  getSection          = () => this.#section;
  getSectionId        = () => this.#section.getId();
  getSectionPageCount = () => this.#section.getPageCount();
  getConf             = () => this.#section.getConf();
  getNumbering        = () => ({ pageNumber: this.#number, pageCount: this.getConf().getPageCount() });

  /**
   * Increments component count
   * @param   {Number} v : incrementation
   * @returns {Number}   : component count new value
   */
   #incComponentCount  = (v = 1) => this.#componentCount += v;

  /**
   * Renders the nest of page content
   * @param   {Object} obj    : object to explore
   * @param   {String} parent : parent key of the current explored object
   * @param   {String} index  : recursive index
   * @returns {Object[]}      : rendered nest
   */
  static formatContent = (obj, callback) => {
    let nest, subContent;
    if (obj instanceof Object) {
      if (Array.isArray(obj)) nest = obj.map(el => SectionPage.formatContent(el, callback));
      if (Type.getRealType(obj) === "object") {
        // Check obj keys to find nested rows/cols or components
        for (let key in obj) {
          if (key === "row" || key === "col") subContent = { [key]: SectionPage.formatContent(obj[key], callback) };
          if (key === "components") subContent = { [key]: obj[key].map(c => callback(c)) };
        }
        nest = { ...obj, ...subContent };
      }
    }
    return nest;
  }
}

export default SectionPage;