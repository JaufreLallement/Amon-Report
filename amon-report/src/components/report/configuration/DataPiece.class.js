import { Objects, Arrays, Operators, Color } from "../../../scripts";

// Recurring attribute object key string
const attrStr = "@attributes";

/**
 * DataPiece class
 */
 class DataPiece {
  // DataPiece configuration : filters, transforms, etc.
  #conf;
  // Input data to be transformed
  #input;
  // Index of the datapiece inside the data array
  #index;
  // Index of the parent datapiece
  #dataIndex;
  // Chunk index
  #chunkNumber = null;
  // Chunk size
  #chunkSize = null;
  // Label of the DataPiece
  #label;
  // Color of the DataPiece
  #color;
  // Data changes
  #changes = {};
  // Resulting data
  #data;

  /**
   * DataPiece constructor
   * @param {Object[]} input : input data
   * @param {Object}   conf  : datapiece configuration
   * @param {Number}   index : index
   */
  constructor (input, conf = {}, index = 0) {
    const {
      [attrStr]: {
        label = "Raw data",
        color = Color.randomColor(),
        dataIndex = 0,
        chunkNumber = null,
        chunkSize = null
      } = {},
      filters = null, transforms = null, inserts = null,
    } = conf;

    this.#input = input;
    this.#conf  = conf;
    this.#index = index;
    this.#dataIndex = dataIndex;
    this.#label = label;
    this.#color = color;

    // Chunk infos
    this.#chunkNumber = chunkNumber;
    this.#chunkSize = chunkSize;

    // Data modifiers
    this.#changes = {
      filter: { conf: filters, do: this.#filter },
      insert: { conf: inserts, do: this.#insert },
      transform: { conf: transforms, do: this.#transform }
    };

    // Processing data
    this.#data = this.#change();
  }

  /**
   * Multiple attribute getters
   * @returns {*} : attribute
   */
  getConf        = () => this.#conf;
  getChunkInfos  = () => ({ chunkNumber: this.#chunkNumber, chunkSize: this.#chunkSize });
  getDataIndex   = () => this.#dataIndex;
  getIndex       = () => this.#index;
  getLabel       = () => this.#label;
  getColor       = () => this.#color;
  getDataSize    = () => this.#data.length;
  getChunk       = (chunkSize, i) => this.#data.slice(i * chunkSize, i * chunkSize + chunkSize);
  getChunkAmount = chunkSize => Math.ceil(this.#data.length / chunkSize);
  getData = () => (this.#chunkNumber !== null) ? this.getChunk(this.#chunkSize, this.#chunkNumber) : this.#data;

  setChunk = ({ chunkNumber, chunkSize }) => [this.#chunkNumber, this.#chunkSize] = [chunkNumber, chunkSize];

  /**
   * Apply all the changes operations in the given order
   * @param   {String[]} order : order of application
   * @returns {Object[]}       : changed data
   */
  #change = (order = ["insert", "transform", "filter"]) => {
    let data = this.#input;
    order.forEach(action => {
      const change = this.#changes[action];
      data = change.conf ? change.do(change.conf, data) : data;
    })
    return data;
  }
  
  /**
   * Apply JSON filters to data
   * @param   {Array} jsonFil : array of filters
   * @returns {Array}         : JS functions
   */
  #filter = (conf, data) => {
    const filterFunctions = this.#filterFunctions(conf);
    return Arrays.applyEveryFilters(data, filterFunctions);
  }

  /**
   * Converts JSON filters to JS filter functions.
   * @param   {Object[]} conf : filters configuration
   * @returns 
   */
  #filterFunctions = conf => conf.map(fil => {
    Objects.checKeys(fil, ["field", "operator", "value"]);
    const { field, operator, value } = fil;

    const opFunc = Operators[operator], isFieldArray = Array.isArray(field), isValueArray = Array.isArray(value);
    let filterFunction = element => opFunc(element[field], value);

    if (isFieldArray && isValueArray) filterFunction = element => field.some(f => value.some(val => opFunc(element[f], val)));
    else if (isFieldArray) filterFunction = element => field.some(f => opFunc(element[f], value));
    else if (isValueArray) filterFunction = element => value.some(val => opFunc(element[field], val));

    return filterFunction;
  });

  /**
   * Apply JSON insert on given data
   * @param   {Array} data       : data to transform
   * @param   {Array} inserts : transform actions
   * @returns {Array}            : transformed data
   */
   #insert = (conf, data) => {
    const transformeData = data.map(el => {
      conf.forEach(ins => {
        Objects.checKeys(ins, ["name", "field", "operator", "value"]);
        const { name, field, operator, value } = ins;
        const currentValue = el[field], opFunc = Operators[operator];

        if (el[name]) return;
        el[name] = opFunc(currentValue, value);
      });

      return el;
    });

    return transformeData;
  }

  /**
   * Apply JSON transformation on given data
   * @param   {Array} data       : data to transform
   * @param   {Array} transforms : transform actions
   * @returns {Array}            : transformed data
   */
  #transform = (conf, data) => {
    const transformeData = data.map(el => {
      conf.forEach(tr => {
        Objects.checKeys(tr, ["field", "operator", "value"]);
        const { field, operator, value, conditions } = tr;
        const currentValue = el[field], opFunc = Operators[operator];

        // If conditions have been defined, check if they pass before assigning the new value
        if (!conditions || conditions.length === 0) el[field] = opFunc(currentValue, value);
        else {
          const checks = this.#filterFunctions(conditions), checksAll = Arrays.checkEveryFilters(el, checks);
          if (checksAll) el[field] = opFunc(currentValue, value);
        }
      });

      return el;
    });

    return transformeData;
  }

  /**
   * Translate data infos from configuration to actual data based on input
   * @param   {Object[]} inputData : input data
   * @param   {Object[]} confData  : json data infos
   * @returns {Object[]}           : translated data
   */
  static factory = (inputData, confData = [], chunk = null) => {
    if (!confData || confData.length === 0) return inputData;
    const trData = confData.map((d, i) => {
      const dIndex = d[attrStr].dataIndex ?? 0,
            data   = inputData[dIndex].getData();
      
      let data2Pass = data;
      if (chunk) {
        Objects.checKeys([chunk], ["chunkNumber", "chunkTotal"]);
        data2Pass = { ...data, [attrStr]: { ...chunk, ...data[attrStr] } };
      }

      return new DataPiece(data2Pass, d, i);
    });

    return trData;
  }
}

export default DataPiece;