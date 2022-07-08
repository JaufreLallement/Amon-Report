import DataPiece from './DataPiece.class';

// Recurring attribute object key string
const attrStr = "@attributes";

/**
 * Component class
 */
 class Component {
  // Component attributes object
  #attr;
  // Component ID
  #id;
  // Component name
  #name;
  // ReportComponent
  #reportComponent;
  // Component number inside the page
  #numberInPage;
  // Chunk size of the component if any
  #chunkSize;
  // Component props
  #props;
  // Component data
  #data;
  // Page instance
  #page;

  /**
   * Component constructor
   * @param {Object}      component : component infos
   * @param {SectionPage} page      : SectionPage instance
   */
  constructor (component, page) {
    const { [attrStr]: attr, props } = component;
    const { name, numberInPage } = attr;
    this.#attr   = attr;
    this.#name   = name
    this.#props  = props;
    this.#page   = page;
    this.#data = this.#props.dataSource ?? [];
    this.#numberInPage = numberInPage;
    this.#id = `${this.#page.getId()}-c${this.#numberInPage}`;

    // Retreives Corresponding component
    this.#reportComponent = this.#page.getConf().getComponents()[this.getRCName()];
    this.#chunkSize = this.#reportComponent.chunk ?? null;

    if (!this.#reportComponent) throw new Error(`${this.#name} is not defined as a Report component !`);
    
    // Handles chunk parameters if set
    if (this.#chunkSize) {
      const { chunkNumber } = this.#page.getChunkInfos();
      this.#data = this.#data.map((d, i) =>
        new DataPiece(d.getData(), { ...d.getConf(), [attrStr]: { ...d.getConf()[attrStr], chunkNumber, chunkSize: this.#chunkSize } }, i));
    }
  }

  /**
   * Multiple attribute getters
   * @returns {*} attribute
   */
   getAttr  = () => this.#attr;
   getName  = () => this.#name;
   getId    = () => this.#id;
   getProps = () => (({ dataSource, ...props }) => props)(this.#props);
   getData  = () => this.#data;
   getPage  = () => this.#page;
   getRCName = () => `Report${this.#name}`;
   getNumberInPage    = () => this.#numberInPage;
   getReportComponent = () => this.#reportComponent.component;
}

export default Component;