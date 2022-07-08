import { Type } from ".";

class Circle {
  // Circle radius
  #r
  // Circle coordinates
  #coords
  // Circle fill color


  /**
   * Circle constructor
   * @param {Object} conf : circle configuration
   */
  constructor(r, { x = 0, y = 0 }, { fill = "#000" }) {
    this.#r = this.setRadius(r);
    this.#coords = this.setCoordinates(x, y);
    this.#fill = this.setFillColor(fill);
  }

  /**
   * Returns circle coordinates
   * @returns {Object} : circle coords
   */
  getCoordinates = () => this.#coords;

  /**
   * Returns circle radius
   * @returns {Number} : radius of the circle
   */
  getRadius = () => this.#r;

  /**
   * Returns the diameter of the circle
   * @returns {Number} : dameter of the circle
   */
  getDiameter = () => 2 * this.#r;

  /**
   * Returns the circumference of the circle
   * @returns {Number} : circumference of the circle
   */
  getCircumference = () => 2 * Math.PI * this.#r;

  /**
   * Returns the area of the circle
   * @returns {Number} : area of the circle
   */
  getArea = () => Math.PI * (r ** 2);

  /**
   * Sets circle radius
   * @param   {Number} r : radius
   * @returns {Number}   : new radius value
   */
  setRadius = r => {
    Type.checkTypes([r], [Type.number]);
    return this.#r = r;
  }

  /**
   * Sets circle coodinates
   * @param   {Number} x : circle x pos
   * @param   {Number} y : circle y pos
   * @returns {Number}   : new circle position
   */
  setCoordinates = (x, y) => {
    Type.checkTypes([x, y], [Type.number]);
    return this.#coords = { x, y };
  };

  /**
   * Sets circle fill color
   * @param   {String} fill : fill color
   * @returns {String}      : new fill color
   */
  setFillColor = fill => {
    Type.checkTypes([fill], [Type.string]);
    return this.#fill = fill;
  }

  /**
   * Returns a radius based on the given circumference
   * @param   {Number} c : circumference
   * @returns {Number}   : radius
   */
  static radiusFromCircumference = c => c / (2 * Math.PI);

  /**
   * Returns a radius based on a given area
   * @param   {Number} a : area
   * @returns {Number}   : radius
   */
  static radiusFromArea = a => Math.sqrt(a / Math.PI);

  /**
   * Returns the radians correspunding to the given angle
   * @param   {Number} ang : angle 
   * @returns {Number}     : radians
   */
  static ang2Radians = a => a * (Math.PI * 180);
}