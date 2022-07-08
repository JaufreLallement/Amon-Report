import { Type } from './';

/**
 * Returns an array of objects based on a first array and a key filter
 * @param   {Array} arr  : array of objects
 * @param   {Array} keys : properties of the first array to keep
 * @returns {Array}      : array of objects containing only the given keys
 */
 const mapByKey = (arr, keys) => {
    Type.checkTypes([arr, keys], [Type.array]);

    return arr.map(obj => {
        let newObj = {};
        keys.forEach( k => newObj[k] = obj[k] );
        return newObj;
    });
}

/**
 * Counts element based on an id in a given array
 * @param   {Array}  arr : array to check
 * @param   {String} id  : key to count
 * @returns {Map}        : Map containing the counting results
 */
const countFrequencies = (arr, id) => {
    Type.checkTypes([arr, id], [Type.array, Type.string]);
    return arr.reduce((acc, obj) => acc.set(obj[id], (acc.get(obj[id]) || 0) + 1), new Map());
}

/**
 * Returns a sorted map based on the given sorting function
 * @param   {Map}      map : Map to sort
 * @param   {Function} srt : sort function to apply
 * @returns {Map}          : sorted Map
 */
const sortMap = (map, srt) => {
    Type.checkTypes([map, srt], [Type.map, Type.func]);
    return new Map([...map.entries()].sort((prev, next) => srt(prev, next)));
}

/**
 * Checks if the given element passes at least some filter
 * @param   {*}     el  : element which is to pass the tests
 * @param   {Array} fil : filters to check
 * @returns {Boolean}   : whether the element passed or not
 */
const checkSomeFilters = (el, fil) => {
  Type.checkTypes([fil], [Type.array]);
  return fil.some(func => func(el));
}

/**
 * Checks if the given element passes all the filters
 * @param   {*}     el  : element which is to pass the tests
 * @param   {Array} fil : filters to check
 * @returns {Boolean}   : whether the element passed or not
 */
 const checkEveryFilters = (el, fil) => {
  Type.checkTypes([fil], [Type.array]);
  return fil.every(func => func(el));
}

/**
 * Filters the elements in the given array for which at least one of the provided filters pass.
 * @param   {Array}   arr : array to filter
 * @param   {Array}   fil : array of filters
 * @param   {Boolean} neg : should the filters be true or not
 * @returns {Array}       : resulting array
 */
const applySomeFilters = (arr, fil, neg = false) => {
    Type.checkTypes([arr, fil, neg], [Type.array, Type.array, Type.bool]);
    return arr.filter(el => neg ? !fil.some(func => func(el)) : fil.some(func => func(el)));
}

/**
 * Filters the elements in the given array for which all the provided filters pass.
 * @param   {Array}   arr : array to filter
 * @param   {Array}   fil : array of filters
 * @param   {Boolean} neg : should the filters be true or not
 * @returns {Array}       : resulting array
 */
const applyEveryFilters = (arr, fil, neg = false) => {
  Type.checkTypes([arr, fil, neg], [Type.array, Type.array, Type.bool]);
  return arr.filter(el => neg ? !fil.every(func => func(el)) : fil.every(func => func(el)));
}

/**
 * Chunks given array into smaller ones
 * @param   {Array}  arr : array to chunk
 * @param   {Number} cs  : size of the chunks
 * @returns {Array}      : chunked array
 */
const chunkArray = (arr, cs) => {
    Type.checkTypes([arr, cs], [Type.array, Type.number]);

    if (cs <= 0) return [arr];
    
    const res = [];
    for (let i = 0; i < arr.length; i += cs) res.push(arr.slice(i, i + cs));

    return res;
}

/**
 * Flattens an array completely
 * @param   {Array} arr : array to flat
 * @returns {Array}     : flattened array
 */
const flatComplete = arr => {
  Type.checkTypes([arr], [Type.array]);
  return arr.reduce((acc, v) => acc.concat(Array.isArray(v) ? flatComplete(v) : v), []);
}

/**
 * Amongst the given values finds the one which is present in the array
 * @param   {Array} arr : array to explore
 * @param   {Array} val : values to check
 * @returns {*}         : found value
 */
const findValueIn = (arr, val) => {
  Type.checkTypes([arr, val], [Type.array]);
  return arr.find(e => val.some(v => e === v));
}

/**
 * Returns the intersection of two given arrays
 * @param   {Array} arr1 : first array 
 * @param   {Array} arr2 : second array
 * @returns {Array}      : intersection of the two given arrays
 */
const intersection = (arr1, arr2) => {
  Type.checkTypes([arr1, arr2], [Type.array]);
  return arr1.filter(e => arr2.includes(e));
}

/**
 * Returns the difference between two given arrays
 * @param   {Array} arr1 : first array 
 * @param   {Array} arr2 : second array
 * @returns {Array}      : difference between the two given arrays
 */
const difference = (arr1, arr2) => {
  Type.checkTypes([arr1, arr2], [Type.array]);
  return arr1.filter(e => !arr2.includes(e));
}

/**
 * Returns the symmetric difference between two given arrays
 * @param   {Array} arr1 : first array 
 * @param   {Array} arr2 : second array
 * @returns {Array}      : symmetric difference between the two given arrays
 */
const symDifference = (arr1, arr2) => {
  Type.checkTypes([arr1, arr2], [Type.array]);
  return arr1.filter(e => !arr2.includes(e)).concat(arr2.filter(e => !arr1.includes(e)));
}

/**
 * Filters the given array in order to remove duplicates based on the given keys to compare
 * @param   {Array} arr  : array to filter
 * @param   {Array} keys : keys to compare
 * @returns {Array}      : filtered array
 */
const unique = (arr, keys) => {
  Type.checkTypes([arr, keys], [Type.array]);
  return arr.filter((el, i, arr) => arr.findIndex(v => (keys.every(k => v[k] === el[k]))) === i);
}

export { 
  mapByKey,
  countFrequencies,
  sortMap,
  chunkArray,
  checkSomeFilters,
  checkEveryFilters,
  applySomeFilters,
  applyEveryFilters,
  flatComplete,
  findValueIn,
  intersection,
  difference,
  symDifference,
  unique,
};