// General imports
import { useState, useEffect } from 'react';

// Script imports
import { Strings } from '../scripts';
const { uuid } = Strings;

export const createBaseContainer = () => {
  const div = document.createElement("div");
  div.className = "banner-portal";
  return div;
}

export const useBannerPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`banner-portal-${uuid()}`);

  useEffect(() => {
    const div = createBaseContainer();
    div.id = portalId;
    document.body.appendChild(div);
    setLoaded(true);

    return () => document.body.removeChild(div);
  }, [portalId]);

  return { loaded, portalId };
}