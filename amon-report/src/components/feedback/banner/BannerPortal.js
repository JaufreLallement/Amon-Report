// General imports
import { useState } from 'react';
import { createPortal } from 'react-dom';


// Component imports
import { useBannerPortal } from '../../../hooks';
import { Banner } from '.';

import './css/BannerPortal.css';

export const BannerPortal = () => {
  const { loaded, portalId } = useBannerPortal();
  const [banners, setBanners] = useState([]);

  const removeBanner = id => setBanners(banners.filter(b => b.id !== id ));

  return loaded && (
    createPortal(
      <div className="banner-list">
        {banners.map(b => (
          <Banner key={b.id} id={b.id} type={b.type} message={b.message} />
        ))}
      </div>,
      document.getElementById(portalId)
    )
  )
}
