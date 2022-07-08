import { Type } from "./";

/**
 * Checks if the given key exists in the given enumeration
 * @param   {Object} enumObj : enumeration check
 * @param   {String[]} key   : key to check in the enumeration
 * @returns {Array}          : value corresponding to the given key
 */
const enumVal = (enumObj, keys, defaultValues = []) => {
  Type.checkTypes([enumObj, keys, defaultValues], [Type.object, Type.array, Type.array]);
  const enumName = Object.keys(enumObj)[0];

  const errorHandling = i => {
    const k = keys[i],
          res = enumObj[enumName][k];
    if (!res)
      if (defaultValues) return defaultValues[i]
      else
        throw new Error(`${k} is not a valid ${enumName}! Choose between the following values: ${Object.keys(enumObj[enumName])}`);
    else return res;
  }

  if (keys.length === 1) {
    const res = errorHandling(0);
    return res;
  } else {
    return keys.map((k, i) => {
      const res = errorHandling(i);
      return res;
    });
  }
}

/**
 * Checks if the given object contains all specified keys
 * @param {Object} obj  : object to check
 * @param {Array}  keys : keys to find in the object
 */
 const checKeys = (obj, keys) => {
  Type.checkTypes([obj, keys], [Type.object, Type.array]);
  for (const key of keys) {
    if (!(key in obj)) throw new Error(`The given object does not contain the key ${key} !`);
  }
}

/**
 * Returns if the given object contains all specified keys
 * @param  {Object}  obj  : object to check
 * @param  {Array}   keys : keys to find in the object
 * @return {Boolean}      : whether the given object contains all specified keys or not
 */
const checKeysBool = (obj, keys) => {
  Type.checkTypes([obj, keys], [Type.object, Type.array]);
  return keys.every(key => (key in obj));
}

export {
  enumVal,
  checKeys, 
  checKeysBool,
};