// Script imports
import { Type, Maths, Objects } from './';

/**
 * Color class
 */
class Color {
  static #hexCheck = /^#([0-9A-F]{3}){1,2}$/i;
  #r = 0;
  #g = 0;
  #b = 0;
  #a = 1;
  #hex;

  /**
   * Color contructor
   * @param {Object|String} color : color initial value
   */
  constructor (color) {    
    if (Type.isString(color)) {
      Color.#checkHexString(color);
      
      this.#hex = color;
      this.#setRgbFromHex(color);

    } else if (Type.isObject(color)) {
      Objects.checKeys(color, ["r", "g", "b"]);
      const { r, g, b, a = 1 } = color;
      [this.#r, this.#g, this.#b, this.#a] = [r, g, b, a];
      this.#hex = Color.rgb2Hex(r, g, b, a);
      
    } else {
      this.#hex = Color.randomColor();
      this.#setRgbFromHex();
    }
  }

  /**
   * Returns color hex value
   * @returns {Stirng} : hex value
   */
  getHex = () => this.#hex;

  /**
   * Returns color rgb values
   * @returns {Object} : rgb values
   */
  getRGB = () => ({ r: this.#r, g: this.#g, b: this.#b, a: this.#a });

  /**
   * Sets rgb values based on hex
   * @param   {String} hex : hex string
   * @returns {Number[]}   : instance rgb values
   */
  #setRgbFromHex = (hex = this.#hex) => {
    const { r, g, b, a = 1 } = Color.hex2RGB(hex);
    return [this.#r, this.#g, this.#b, this.#a] = [r, g, b, a];
  }

  /**
   * Converts rgba values into hex color
   * @param   {Number} r : red value
   * @param   {Number} g : green value
   * @param   {Number} b : blue value
   * @param   {Number} a : alpha value
   * @returns {String}   : hex value
   */
  static rgb2Hex = (r, g, b, a = 1) => "#" + [r, g, b, a].map(
    (x, i) => i === 3
      ? a === 1 ? '' : parseInt(255 * x).toString(16)
      : x.toString(16).padStart(2, 0)).join('');

  /**
   * Converts a hex color string into rgb values
   * @param   {String} hex : hex color
   * @returns {Object}     : rgba object
   */
  static hex2RGB = hex => {
    const [r, g, b, a] = hex.match(hex.length <= 4 ? /\w/g : /\w\w/g).map(x => parseInt(x.length < 2 ? `${x}${x}` : x, 16));
    return { r, g, b, a: Maths.round(a / 255, 10) };
  }
   
  /**
  * Returns a random hex color string
  * @returns {String} : random hex color
  */
  static randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

  /**
   * Returns a range of color based on start and end color, as well as a step number
   * @param   {String} color1 : start color
   * @param   {String} color2 : end color
   * @param   {Number} steps  : stape number
   * @param   {String} format : desired format
   * @returns {Array}         : color steps
   */
  static getColorRange = (color1, color2, steps = 2, format = "hex") => {
    Type.checkTypes([color1, color2, steps], [Type.string, Type.string, Type.number]);
    const stepFactor = 1 / (steps - 1);

    return [...Array(steps)].map((e, i) => {
      const color = Color.#interpolateColor(color1, color2, stepFactor * i);
      return format === "hex" ? Color.rgb2Hex(color[0], color[1], color[2]) : color;
    });
  }

  /**
   * Interolate a color based on two given colors and a factor
   * @param   {String} color1 : first color
   * @param   {String} color2 : second color
   * @param   {Number} factor : factor
   * @returns {Number[]}      : interpolated color
   */
  static #interpolateColor = (color1, color2, factor = .5) => {
    const rgb1 = Object.values(Color.hex2RGB(color1)),
          rgb2 = Object.values(Color.hex2RGB(color2));
    
    return [...Array(3)].map((e, i) => Math.round(rgb1[i] + factor * (rgb2[i] - rgb1[i])));
  }

  /**
   * Checks if hex string is valid
   * @param   {String} str : str to check
   * @returns {Boolean}    : whether the string is valid or not
   */
  static #checkHexString = str => {
    if (!str.match(Color.#hexCheck))
        throw new Error(`${str} is not a valid hex color string !`);
    return true;
  }
}

export default Color;