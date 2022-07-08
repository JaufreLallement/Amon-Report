// General imports
import { useState, useEffect } from 'react';

// Component imports
import { FileUpload, Button, Alert, Spin, Report, Flex, Fieldset, Icon, BannerPortal } from './components';

// Script imports
import { Files, Strings } from './scripts';
import Configuration from './components/report/Configuration.class';

// Style imports
import './css/App.css';

const { Row, Col } = Flex;
const __attrStr__ = "@attributes";
const __version__ = "1.8.5";

/**
 * App base component
 */
const App = () => {
  // React hooks
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({ conf: { file: null, load: null }, data: { file: null, load: null } });
  const [loaded, setLoaded] = useState(false);

  /**
   * Sets a new alert
   * @param   {String} message : alert message
   * @param   {String} type    : alert type
   * @returns 
   */
  const setNewAlert = (message, type) => setAlert({ id: Strings.uuid(), message, type });

  /**
   * Close the alert
   * @returns 
   */
  const closeAlert = () => setTimeout(() => setAlert(null), 500);

  /**
   * Handles FileUpload changes by checking file type
   * @param {File} file : selected file
   * @returns
   */
  const onFileChange = (res, upl) => {
    if (res.error) setNewAlert(res.error.message, "error");
    else {
      const { file } = res;
      setFiles(prevFiles => ({ ...prevFiles, [upl]: { ...prevFiles[upl], file } }))
      setNewAlert("Le type de fichier sélectionné est valide !", "success");
    }
    return;
  };

  /**
   * Awaits all file reading promises
   * @param   {File}    dataFile : data file
   * @param   {File}    confFile : configuration file
   * @returns {Promise}          : promise
   */
  const waitFiles = async (dataFile, confFile) => await Promise.all([Files.loadFile(dataFile), Files.loadFile(confFile)]);

  /**
   * Loads data from the FileUpload selected file
   * @param {File} file : file from which extract the data
   */
  const load = (dataFile, confFile) => {

    if (!dataFile || !confFile) {
      const message = !dataFile ? "Aucun fichier de données sélectionné !" : "Aucun fichier de configuration sélectionné !";
      setNewAlert(message, "error");
      return;
    }

    // Trigger loading spin
    setLoading(prevLoading => !prevLoading);

    // Waiting for files read promises
    waitFiles(dataFile, confFile).then(([data, conf]) => {
      const isCSV    = Files.getExtension(dataFile) === "csv";
      const dataLoad = isCSV ? Files.csv2JSON(data, Files.csvDelimiter, Files.csvCharFilter) : JSON.parse(data),
            confLoad = JSON.parse(conf);
      // Updating state
      setFiles(prevFiles => ({ conf: { ...prevFiles.conf, load: confLoad }, data: { ...prevFiles.data, load: dataLoad } }));
      setLoading(false);
    });
    return;
  }

  /**
   * Renders a fieldset/fileupload based on given option
   * @param {String} option : option to choose between "data" and "conf"
   * @param {File} loaded 
   * @returns 
   */
  const getFieldset = (option, isUpl, legend) => {
    const fsSharedProps = { id: `${option}-fieldset`, className: "upl-fieldset" },
          fuSharedProps = { id: `${option}-upload`, onChange: res => onFileChange(res, option), size: "small" };

    return (
      <Fieldset {...fsSharedProps} legend={legend}>
        {isUpl && <Icon icon="check_circle" size={30} className="upl-check" />}
        <FileUpload {...fuSharedProps} accept={(option === "data") ? ".csv,.json" : ".json"} />
      </Fieldset>
    );
  }

  /**
   * Get default app form
   * @returns {ReactDOM} : upload form
   */
  const getForm = () => {
    const { conf, data } = files;
    return (
      <Col>
        <Row className="upl-row">
          <Col>{getFieldset("data", data.file, "1. Données")}</Col>
          <Col>{getFieldset("conf", conf.file, "2. Configuration")}</Col>
        </Row>
        <Row className="upl-row">
          <Button size={300} onClick={() => load(data.file, conf.file)}>{`> Generate report <`}</Button>
        </Row>
      </Col>
    );
  }

  /**
   * Format configuration and returns report
   * @param {Array} data : data to use for the report
   * @param {Object} conf : report configuration
   * @returns {Object} : report
   */
  const getReport = (data, config) => {
    const conf = new Configuration({ ...config, [__attrStr__]: { __version__, ...config[__attrStr__] } }, data);
    return <Report conf={conf} />;
  }

  // React useEffect : re-render based on files changes
  useEffect(() => {
    const { conf, data } = files;
    const isLoaded = (data.load !== null && conf.load !== null);

    setLoaded(isLoaded);
    isLoaded && console.log(data.load, conf.load);
  }, [files]);

  const content = loaded ? getReport(files.data.load, files.conf.load) : getForm();

  return (
    <Col className="App" yAlign="start">
      {content}
      {(!loaded && alert) && <Alert {...alert} onClose={closeAlert} />}
      {loading && <Spin />}
      <BannerPortal />
    </Col>
  )
}

export default App;