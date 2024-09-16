import { useEffect } from 'react';

interface GoogleTagManagerProps {
  gtmId: string;
  analyticsConsent: boolean;
  marketingConsent:boolean

}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ gtmId, analyticsConsent,marketingConsent }) => {
  useEffect(() => {
    if (analyticsConsent || localStorage.getItem('cookie-consent')?.includes("consent_analytics")) {
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

      const noScript = document.createElement('noscript');
      noScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noScript);

      (window as any).dataLayer.push({ event: 'consent_analytics' });
      
      if (marketingConsent || localStorage.getItem('cookie-consent')?.includes("consent_marketing")) {
        (window as any).dataLayer.push({ event: 'consent_marketing' });
      }

      // Push consent states to dataLayer for specific categories

      // if (functionalConsent) {
      //   (window as any).dataLayer.push({ event: 'consent_functional' });
      // }
    }
  }, [gtmId, analyticsConsent]);

  return null;
};

export default GoogleTagManager;
