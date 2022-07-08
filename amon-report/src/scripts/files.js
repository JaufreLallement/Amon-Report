import { Type, Strings } from './';

const csvDelimiter = /,(?!\s)(?=(?:[^"]*"[^"]*")*(?![^"]*"))/g;
const csvCharFilter = /[^\w\s.\\,]/gi;

/**
 * Returns the extension of a file
 * @param  {File} f : file from which retrieve the extension
 * @return {String} : file extension
 */
const getExtension = f => {
  Type.checkTypes([f], [Type.file]);
  return f.name.substring(f.name.lastIndexOf(".") + 1);
}

/**
 * Reads file data and executes given onload operations
 * @param {Object}   f      : file to read
 * @param {Function} onLoad : operations to execute when loading the file
 */
const loadFile = (f, onLoad = () => {}) => {
  Type.checkTypes([f, onLoad], [Type.file, Type.func]);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsText(f);
  });
}

/**
 * Checks if the imported is valid
 * @param  {HTMLElement} upl   : upload input
 * @param  {Array}       fType : expected types in order
 * @return {String}            : extension of the file
 */
 const checkImport = (upl, fType) => {
  Type.checkTypes([upl, fType], [Type.file, Type.array]);

  const extension = getExtension(upl);
  if (!fType.includes(extension)) throw new TypeError(`Uploaded file should be a .${fType} file !`);

  return extension;
}

/**
 * Converts CSV file to a JSON array
 * @param  {File}   csv : CSV file
 * @param  {RegExp} del : CSV regexp delimiter
 * @param  {RegExp} fil : CSV regexp char filter
 * @return {Array}      : JSON array
 */
const csv2JSON = (csv, del = csvDelimiter, fil = null) => {
  Type.checkTypes([csv, del, fil], [Type.string, Type.regex, Type.regex]); // Checks arguments type

  csv = csv.trim();

  const lines = csv.split("\n");
  const headers = lines[0].split(del);
  lines.shift();

  // Creates an object for each line
  return lines.map((l, li) => {
    let obj = {};
    let lineArray = l.split(del);

    obj["key"] = li;

    for (let i = 0; i < headers.length; i++) {
      let rawValue = lineArray[i];
      let value = rawValue;

      if (fil) value = (rawValue) ? rawValue.replace(fil, '') : "N/A";

      obj[`${Strings.camelize(headers[i])}`] = value;
    }

    return obj;
  });
}

export {
  csvDelimiter,
  csvCharFilter,
  getExtension,
  checkImport,
  loadFile,
  csv2JSON
};