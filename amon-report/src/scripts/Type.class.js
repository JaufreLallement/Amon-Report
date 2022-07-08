/**
 * Type class : regroups multiple type check methods
 */
class Type {

  static number = "number";
  static bool   = "boolean";
  static string = "string";
  static regex  = "regexp";
  static object = "object";
  static func   = "function";
  static array  = "array";
  static map    = "map";
  static file   = "file";
  static date   = "date";

  /**
   * Multiple functions to check if given value is of a certain type
   * @param   {*}       v : value to check
   * @returns {Boolean}   : whether the value is of the expected type or not
   */
  static isNumber = v => Type.#isType(v, Type.number);
  static isBool   = v => Type.#isType(v, Type.bool);
  static isString = v => Type.#isType(v, Type.string);
  static isRegex  = v => Type.#isType(v, Type.regex);
  static isObject = v => Type.#isType(v, Type.object);
  static isFunc   = v => Type.#isType(v, Type.func);
  static isArray  = v => Type.#isType(v, Type.array);
  static isMap    = v => Type.#isType(v, Type.map);
  static isFile   = v => Type.#isType(v, Type.file);
  static isDate   = v => Type.#isType(v, Type.date);

  static #isType = (v, type) => Type.getRealType(v) === type;

  /**
   * Checks if the first argument is an array of the given type
   * @param   {Array} arg : argument to check
   * @param   {*} type    : expected type
   */
  static arrayOf = (arg, type) => {
    Type.checkTypes([arg, type], [Type.array, Type.string]);
    Type.checkTypes([...arg], [type]);
  }

  /**
   * Gets the real type of the provided object
   * @param  {Object} obj : object from which retrieve the type
   * @return {String}     : type of the object 
   */
  static getRealType = obj => ({}).toString.call(obj).match(/\s(\w+)/)[1].toLowerCase();

  /**
   * For each argument, checks if type is valid
   * @param {Array} args  : arguments
   * @param {Array} types : must be arguments type
   */
  static checkTypes = (args, types) => {
    for (let i = 0; i < args.length; i++) {
      const type    = (types.length > 1) ? types[i] : types[0],
            arg     = args[i],
            argType = Type.getRealType(arg);
      if (argType !== type) throw new TypeError(`Argument ${i} should be of type ${type} but is ${argType}!`);
    }
  }

  /**
   * For each argument, checks if type is valid
   * @param  {Array}   args  : arguments
   * @param  {Array}   types : must be arguments type
   * @return {Boolean}       : whether all types are checked or not
   */
  static checkTypesBool = (args, types) => args.every((arg, i) => Type.getRealType(arg) !== types[i]);
}

export default Type;