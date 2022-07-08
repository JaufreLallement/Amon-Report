import { Type } from './';

/**
 * Transforms a regular string into a camelCase word
 * @param   {String} str : string to transform
 * @returns {String}     : camelCase word
 */
const camelize = str => {
  Type.checkTypes([str], [Type.string]);
  return str.split(" ")
    .map(w => w.trim())
    .map(w => w[0].toUpperCase() + w.substring(1))
    .join("");
}

/**
* Transforms a camelCase word into a regular string
* @param   {String} cam : camelCase word to transform
* @returns {String}     : regular string
*/
const deCamelize = cam => {
  Type.checkTypes([cam], [Type.string]);
  const match = cam.match(/[A-Za-z][a-z]*/g) || [];
  return match.map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(" ");
}

/**
 * Capitalize the given string
 * @param   {String} str : string to capitalize
 * @returns {String}     : capitalized string
 */
const capitalize = str => {
  Type.checkTypes([str], [Type.string]);
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

/**
 * Returns the substring between the two given substring
 * @param   {String} str : string to use
 * @param   {Array}  sbs : substrings to use as delimiter
 * @returns {String}     : substring
 */
const sbstr = (str, sbs) => {
  Type.checkTypes([str, sbs], [Type.string, Type.array]);

  if (sbs.length !== 2)
    throw new Error(`The sbstr function requires an array of two elements in order to find the right substring !`);

  const [first, second] = sbs;
  Type.checkTypes([first, second], [Type.string, Type.string]);

  const i1 = str.indexOf(first),
        i2 = i1 + str.substring(i1).trim().indexOf(second);

  return str.substring(i1 + first.length, i2 + 1).trim();
}

/**
 * Pads a value with leading zeros until length is reached
 * @param   {*}      val : value to pad
 * @param   {Number} len : length to reach
 * @returns {String}     : padded string
 */
const zeroPad = (val, len) => `${val}`.padStart(len, '0');

/**
 * Generates a unique random ID
 * @returns {String} : UEID
 */
const uuid = () => {
  const first = Math.random() * 46656 | 0, second = Math.random() * 46656 | 0;
  return ("000" + first.toString(36)).slice(-3) + ("000" + second.toString(36)).slice(-3);
}

export {
  camelize,
  deCamelize,
  capitalize,
  sbstr,
  zeroPad,
  uuid,
}