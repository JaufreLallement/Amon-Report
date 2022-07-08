// General imports
import { useMemo } from 'react';
import PropTypes from 'prop-types';

// Component imports
import { Icon } from '../..';
import FeedbackIcons from '../Feedback.icons';

// Script imports
import { Objects } from '../../../scripts';

import './css/Banner.css';

const Banner = ({ id, type, message, className }) => {
  const classes = useMemo(() => className ? className.split(' ') : '', [className]);
  const typeOptions = useMemo(() =>
    ({ icon: Objects.enumVal({ FeedbackIcons }, [type]), className: `Banner-message Banner-message-${type}` }),
  [type]);

  return (
    <div id={id} className={["Banner", ...classes].join(' ')}>
      <div className={typeOptions.className}>
        <div className="Banner-message-content">
          <Icon icon={typeOptions.icon} className="Banner-icon" />
          <span>{message}</span>
        </div>
      </div>
    </div>
  )
}

Banner.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
}

export default Banner;