// General imports
import PropTypes from 'prop-types';

// Component imports
import { Toc, DatePicker, Icon } from '../../';

// Style imports
import './css/ReportFirstPage.css';

const ReportInfo = ({ icon, name, value }) =>
  <div className="Report-Info">
    <span className="ri-icon"><Icon icon={icon} size={18} /></span>
    <b>{name}: </b>
    {value}
  </div>

/**
 * ReportFirstPage component
 * @param   {Object} props : component properties
 * @returns 
 */
export const ReportFirstPage = ({ section }) => {
  const conf = section.getConf();

  // Setting up the datepicker
  const pickerProps = {
    defaultValue: conf.getPeriod().map(d => d.toDateString("YYYY-MM-DD hh:mm:ss")),
    onSelectedEnd: dates => conf.setPeriod(dates)
  }
  const picker = <DatePicker className="Report-fp-picker" type="range" {...pickerProps} />;

  // 
  const infos = [
    { icon: "tag", name: "Version", value: conf.getVersion() },
    { icon: "user", name: "Généré par", value: conf.getAuthor() },
    { icon: "calendar", name: "Généré le", value: conf.getTime().toDateString() },
    { icon: "date_range", name: "Période", value: picker },
  ];

  const toc = <Toc data={conf.getMenu()} title="Sommaire" className="Report-toc" />;
  return (
    <div className="Report-FirstPage">
      <span className="main-logo"></span>
      <div className="Report-Infos">{infos.map((el, i) => <ReportInfo key={i} {...el} />)}</div>
      {toc}
    </div>
  );
}

ReportFirstPage.propTypes = {
  section: PropTypes.object.isRequired,
}