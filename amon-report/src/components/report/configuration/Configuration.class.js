import { Type, Time } from "../../../scripts";
import componentOptions from "../reportcomponents";
import Section from './ConfSection.class';
import DataPiece from './DataPiece.class';

// Recurring attribute object key string
const attrStr = "@attributes";

/**
 * Configuration class
 */
class Configuration {

  // Configuration attributes object
  #attr;
  // Component options for the report
  #componentOptions;
  // Configuration file
  #conf;
  // Configuration sections
  #sections;
  // Report generation time
  #time = new Time();
  // Report ID
  #id;
  // Report Title
  #title;
  // Report author
  #author;
  // App version
  #version;
  // Report period
  #period;
  // Report raw / untouched data
  #rawData;
  // First section : essentially containing the first page with table of contents, main title, etc.
  #firstSection;
  // Menu sections : 
  #menuSections = new Map();
  // Report page count
  #pageCount = 0;

  /**
   * Configuration constructor
   * @param {Object}   conf             : report configuration
   * @param {Object[]} data             : report data
   * @param {Object}   componentOptions : component options
   */
  constructor(conf, data) {
    Type.checkTypes([conf, data, componentOptions], [Type.object, Type.array, Type.object]);
    const { [attrStr]: attr = {}, data: mainData = [], sections = [] } = conf;
    const { id = `report_${this.#time.toDateString()}`, title = "My Report", author, version } = attr;
    this.#attr             = attr;
    this.#sections         = sections;
    this.#componentOptions = componentOptions;
    this.#conf             = conf;
    this.#id               = id;
    this.#title            = title;
    this.#author           = author;
    this.#version          = version;
    this.#period           = Time.getPeriod([this.#time, this.#time]);

    const firstSection = {
      [attrStr]: { id: "firstsec", title: this.#title },
      data: [],
      pages: [{
        [attrStr]: { size: "A4", layout: "landscape" },
        content: [{ components: [{ [attrStr]: { name: "FirstPage" }, props: { dataSource: [], } }] }]
      }]
    };

    this.#firstSection = new Section(firstSection, this, 0);
    
    // Handle date field definition
    let dateFmtInput = data, dates = [];
    if ("dateField" in this.#attr) {
      // Formatting date field
      dateFmtInput = data.map(obj => {
        const dateObj = new Time(obj[this.#attr.dateField]);
        dates.push(dateObj);
        return { ...obj, [this.#attr.dateField]: dateObj.toDateString("YYYY-MM-DD hh:mm:ss") };
      });
      this.#period = Time.getPeriod(dates);
    }

    this.#rawData = [new DataPiece(dateFmtInput, mainData[0])];
    console.log(this.#rawData);
    this.#sections.forEach((s, i) => this.#menuSections.set(s[attrStr].id, new Section(s, this, i + 1)));
  }

  /**
   * Multiple attribute getters
   * @return {*} : attribute
   */
  getAttr         = () => this.#attr;
  getId           = () => this.#id;
  getTitle        = () => this.#title;
  getAuthor       = () => this.#author;
  getVersion      = () => this.#version;
  getPeriod       = () => this.#period;
  getConf         = () => this.#conf;
  getTime         = () => this.#time;
  getComponents   = () => this.#componentOptions;
  getRawData      = () => this.#rawData;
  getSections     = () => new Map([["firstsec", this.#firstSection], ...this.#menuSections]);
  getPageCount    = () => this.#pageCount;

  /**
   * Format menu infos
   * @returns {Object[]} : menu infos
   */
  getMenu = () => this.#sections.map(({ [attrStr]: { id, title } }) => {
    return { id, text: title, page: this.#menuSections.get(id).getFirstPage() };
  });

  /**
   * Period setter
   * @param {Time[]} dates : dates array
   * @returns {Time[]}     : period
   */
  setPeriod = dates => this.#period = Time.getPeriod(dates);

  /**
   * Increments page count
   * @param   {Number} v : value
   * @returns {Number}   : pageCount value
   */
  incPageCount = v => this.#pageCount += v;

  /**
   * Sets the configuration period
   * @param {Date[]} dates : period dates
   */
  setPeriod = dates => {
    Type.arrayOf(dates, Type.date);
    const [start, end] = dates;
    if (!start || !end) throw new Error("Invalid period provided, expected two dates!");
    this.#period = dates;
  }
}

export default Configuration;