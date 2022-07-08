import { Type } from './';

/**
 * Returns the round version of a given number based on a round value
 * @param   {Number} num : Number to round
 * @param   {Number} rnd : round value
 * @returns {Number}     : round number
 */
 const round = (num, rnd) => {
  Type.checkTypes([num, rnd], [Type.number]);
  return Math.round(num * rnd) / rnd;
}

/**
 * Returns the percentage based on a given numerator and total
 * @param   {Number} num : numerator
 * @param   {Number} t   : total
 * @returns {Number}     : percentage
 */
const percentage = (num, t) => {
  Type.checkTypes([num, t], [Type.number]);
  return num / t * 100 || 0;
}

/**
 * Apply a given percentage on a given total
 * @param   {Number} t : total on which apply the percentage
 * @param   {Number} p : percentage to apply
 * @returns {Number}   : number
 */
const applyPercent = (t, p) => {
  Type.checkTypes([t, p], [Type.number]);
  return t * p / 100;
}

/**
 * Returns the circumference of a circle based on its radius
 * @param   {Number} r : radius
 * @returns {Number}   : circumference
 */
const circumference = r => {
  Type.checkTypes([r], [Type.number]);
  return 2 * Math.PI * r;
}

/**
 * Returns full circle rotation based on a percentage
 * @param   {Number} p   : percentage
 * @param   {Number} max : max rotation (e.g. 360, 180, etc.)
 * @returns {Number}     : rotation
 */
const percent2Rotation = (p, max) => {
  Type.checkTypes([p, max], [Type.number]);
  return p / 100 * max;
}

/**
 * Returns a circle stroke offset based on its perimeter and a percentage
 * @param   {Number} per : circle perimeter
 * @param   {Number} p   : percent to use
 * @returns {Number}     : stroke offset
 */
const strokeOffset = (per, p) => {
  Type.checkTypes([per, p], [Type.number]);
  return per - per * p / 100;
}

/**
 * Returns the radians correspunding to the given angle
 * @param   {Number} ang : angle 
 * @returns {Number}     : radians
 */
const ang2Radians = ang => {
  Type.checkTypes([ang], [Type.number]);
  return ang * (Math.PI / 180);
}

/**
 * Returns cartesian coordinates based on a radius, an angle and offset coordinates
 * Cartesian coordinates can be used to place element around a circle
 * @param   {Number} r   : circle radius
 * @param   {Number} ang : angle
 * @param   {Object} off : offset coordinates
 * @returns {Object}     : coordinates
 */
const cartCoord = (r, ang, off) => {
  Type.checkTypes([r, ang, off], [Type.number, Type.number, Type.object]);
  const { cx, cy } = off;

  if (!cx || !cy) throw new Error(`The offset does not contain the expected offset coordinates !`);
  Type.checkTypes([cx, cy], [Type.number]);

  const radians = ang2Radians(ang);

  return {
    x: r * Math.cos(radians) + cx,
    y: r * Math.sin(radians) + cy,
  };
}

/**
 * Keeps a given value inside the given interval based on a min and max value.
 * @param   {Number}   num   : number to limit
 * @param   {Number[]} inter : interval
 * @returns {Number}         : limited value
 */
const limit = (num, inter) => {
  Type.checkTypes([num, inter], [Type.number, Type.array]);
  const [min, max] = inter;
  Type.checkTypes([min, max], [Type.number]);
  return Math.min(Math.max(num, min), max);
}

/**
 * Checks whether the given number is inside the given interval
 * @param   {Number}   num   : number to check
 * @param   {Number[]} inter : interval
 * @param   {Boolean}  inc   : should the interval be inclusive or not
 * @returns {Boolean}        : whether the number is inside the interval or not
 */
const between = (num, inter, inc = false) => {
  Type.checkTypes([num, inter, inc], [Type.number, Type.array, Type.bool]);

  const [min, max] = inter;
  Type.checkTypes([min, max], [Type.number]);
  if (max < min) throw new Error(`The given interval is invalid! Min value (${min}) > Max value (${max}) !`);

  return inc ? (num >= min && num <= max) : (num > min && num < max);
}

/**
 * Drifts aside cartesian coords based on base coords and vBox size
 * @param   {Object} coords : base coords
 * @param   {Number} vbSize : vBox size
 * @returns {Object}        : drifted coords
 */
const driftCoords = (coords, vbSize) => {
  Type.checkTypes([coords, vbSize], [Type.array, Type.number]);
  const [x, y] = coords;

  Type.checkTypes([x, y], [Type.number]);

  const middle = vbSize / 2,
        xMin   = vbSize * .15,
        xMax   = vbSize * .85,
        vShift = vbSize * .08;

  const xAroundMiddle = between(x, [xMin, xMax]);

  let drftX;
  if (xAroundMiddle) {
    if (x < middle) drftX = x - (xMin * .65);
    else drftX = x + (xMax * .65);
  } else drftX = x;

  return { x: drftX, y: limit(y, [vShift, vbSize - vShift]) };
}

/**
 * Returns the angle between x axis and a point based on its coordinates
 * @param   {Number[]} origin : origin coordinates
 * @param   {Number[]} target : target coordinates
 * @returns {Number}          : resulting theta angle
 */
const arctangent = (origin, target) => {
  Type.checkTypes([origin, target], [Type.array]);
  const [ox, oy] = origin,
        [tx, ty] = target;
  
  Type.checkTypes([ox, oy, tx, ty], [Type.number]);

  const dx = ox - tx,
        dy = oy - ty;
  let theta = Math.atan2(-dy, -dx);
  theta *= 180 / Math.PI;
  if (theta < 0) theta += 360;

  return theta;
}

/**
 * Generates a random number between min and max value
 * @param   {Number} min : min value
 * @param   {Number} max : max value
 * @returns {Number}     : random number
 */
const getRandom = (min, max) => {
  Type.checkTypes([min, max], [Type.number]);
  const nMin = Math.ceil(min),
        nMax = Math.floor(max);
  return Math.floor(Math.random() * (nMax - nMin + 1)) + nMin;
}

export {
  round,
  percentage,
  applyPercent,
  circumference,
  percent2Rotation,
  strokeOffset,
  ang2Radians,
  cartCoord,
  limit,
  between,
  driftCoords,
  arctangent,
  getRandom,
}