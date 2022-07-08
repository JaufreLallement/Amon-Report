// General imports
import { useState } from 'react';
import PropTypes from 'prop-types';

// Component imports
import { Icon } from '../..'

// Script import
import { Files, Objects } from '../../../scripts';

// Style import
import './css/FileUpload.css';

const FileUploadSize = {
  normal: { iconSize: 80 },
  small : { iconSize: 20 },
}

/**
 * FileUpload class component
 */
const FileUpload = ({ text, onChange, accept, size, required, id, className }) => {

  // React hook
  const [file, setFile] = useState(null);

  /**
   * Handles changes in sliders value
   * @param {Object} e : catched event
   * @param {Function} callback : callback function to execute after state change
   */
  const handleChange = ({ target: { files: { 0: upl } } }, callback) => {
    const accepTypes = accept.slice(1).split(',.');

    try {
      if (accept !== "") Files.checkImport(upl, accepTypes);
      setFile(upl);
      callback({ file: upl });
    } catch (error) {
      callback({ error });
    }
  }

  /**
   * Returns the render of the uploaded file name
   * @returns {HTMLElement} : file name
   */
  const genFileName = () => <p className="FileUpload-Filename">{<Icon icon="attach_file" size={18} />} {file.name}</p>;

  const fileName = file && genFileName();

  FileUploadSize[size] = (size === "normal") ?
    { ...FileUploadSize[size], innerText: fileName ?? text, outerText: null } :
    { ...FileUploadSize[size], innerText: text, outerText: fileName };

  const sizeOptions = Objects.enumVal({ FileUploadSize }, [size]);
  const inputProps = { accept, required, onChange: e => handleChange(e, onChange) };

  return (
    <div className="FileUpload-Wrapper">
      <div id={id} className={`FileUpload ${className ?? ''}`.trim()} mode={size}>
        <label htmlFor={`${id}-input`}>
          <Icon icon="upload_file" size={sizeOptions.iconSize} />
          {sizeOptions.innerText}
        </label>
        <input id={`${id}-input`} type="file" {...inputProps}></input>
        {sizeOptions.outerText}
      </div>
    </div>
  );
}

// Properties restrictions
FileUpload.propTypes = {
  text      : PropTypes.string,
  onChange  : PropTypes.func,
  accept    : PropTypes.string,
  size      : PropTypes.string,
  required  : PropTypes.bool,
  id        : PropTypes.string.isRequired,
  className : PropTypes.string,
}

FileUpload.defaultProps = {
  text     : "Click to Upload",
  onChange : () => {},
  size     : "normal",
}

export default FileUpload;
