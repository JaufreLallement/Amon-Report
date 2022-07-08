// Style imports
import './css/Ellipsis.css';

const Ellipsis = ({ id, className }) => <span id={id} className={`Ellipsis ${className ?? ''}`.trim()}>...</span>;

export default Ellipsis;