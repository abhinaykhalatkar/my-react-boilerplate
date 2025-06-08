import { useEffect } from 'react';
import { hasConsent } from '@Store/cookieConsentSlice';

const GTM_CONSENT_FLAG = "consent_analytics"; // Use string, not enum!

interface GoogleTagManagerProps {
  // consentSelection: ConsentTypes[]; // not needed with localStorage-based logic
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = () => {
  const gtmId = process.env.REACT_APP_GTM_ID;

  // 1. Check if the consent flag exists in code
  const analyticsAvailable = hasConsent(GTM_CONSENT_FLAG);

  // 2. Check if the user has given consent for this flag

  useEffect(() => {
    if (!analyticsAvailable) return;   // The consent flag doesn't exist in code, so do nothing

    // GTM script injection logic as before
    if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtm.js?id=${gtmId}"]`)) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      const gtmScript = document.createElement('script');
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtmScript);

      (window as any).dataLayer.push({ event: GTM_CONSENT_FLAG });
    }

    if (!document.querySelector(`noscript iframe[src="https://www.googletagmanager.com/ns.html?id=${gtmId}"]`)) {
      const noScript = document.createElement('noscript');
      noScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noScript);
    }
  }, [analyticsAvailable, gtmId]);

  // Don't render anything if the flag is not present in code
  if (!analyticsAvailable) return null;

  return null;
};

export default GoogleTagManager;
