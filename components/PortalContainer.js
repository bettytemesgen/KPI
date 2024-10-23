// components/PortalContainer.js

import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const PortalContainer = ({ children }) => {
  const portalRoot = document.getElementById('portal-root');
  const portalElement = document.createElement('div');

  useEffect(() => {
    portalRoot.appendChild(portalElement);
    return () => portalRoot.removeChild(portalElement);
  }, [portalElement, portalRoot]);

  return ReactDOM.createPortal(children, portalElement);
};

export default PortalContainer;
