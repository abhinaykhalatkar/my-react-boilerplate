import { useEffect } from 'react';


import { ConsentTypes } from '../../../store/cookieConsentSlice';
interface GoogleTagManagerProps {
  consentSelection: ConsentTypes[];
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ consentSelection }) => {
  let gtmId = process.env.REACT_APP_GTM_ID;


  function handlGtmConsent() {
    return (localStorage.getItem('cookie-consent')?.includes(ConsentTypes.Analytics)
      // && localStorage.getItem('cookie-consent')?.includes(Consents.Marketing)
      // && localStorage.getItem('cookie-consent')?.includes(Consents.Functional)
    )
  }
  useEffect(() => {
    if (handlGtmConsent()) {
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
        (window as any).dataLayer.push({ event: ConsentTypes.Analytics });
        if (localStorage.getItem('cookie-consent')?.includes(ConsentTypes.Marketing)) {
          (window as any).dataLayer.push({ event: ConsentTypes.Marketing });
        }
      }
      if (!document.querySelector(`noscript iframe[src="https://www.googletagmanager.com/ns.html?id=${gtmId}"]`)) {
        // Create the noscript element if it doesn't exist
        const noScript = document.createElement('noscript');
        noScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.appendChild(noScript);
      }

      // Push consent states to dataLayer for specific categories

      // if (functionalConsent) {
      //   (window as any).dataLayer.push({ event: 'consent_functional' });
      // }
    }
  }, [consentSelection]);
  return null;
};

export default GoogleTagManager;
