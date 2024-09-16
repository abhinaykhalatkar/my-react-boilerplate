import React, { useState, useEffect } from 'react';
import styles from "./CookieConsent.module.scss";
import BackDrop from '../Backdrop/BackDrop';

interface CustomCookieConsentProps {
  onConsentGranted: (consentTypes: string[]) => void;
  onConsentDenied: () => void;
}

const CookieConsentForm: React.FC<CustomCookieConsentProps> = ({ onConsentGranted, onConsentDenied }) => {
  const [consentTypes, setConsentTypes] = useState<string[]>(['consent_analytics', 'consent_marketing', 'consent_functional']); // Default to all true
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  // Handle checkbox changes for each consent type
  const handleConsentChange = (consentType: string) => {
    setConsentTypes((prev) =>
      prev.includes(consentType)
        ? prev.filter(type => type !== consentType)
        : [...prev, consentType]
    );
  };

  // Handle Accepting the selected consents
  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentTypes));
    setIsVisible(false);
    onConsentGranted(consentTypes); // Send the array of consents granted
  };

  const handleAcceptAll = () => {
    const allConsents = ['consent_analytics', 'consent_marketing', 'consent_functional'];
    localStorage.setItem('cookie-consent', JSON.stringify(allConsents));
    setIsVisible(false);
    onConsentGranted(allConsents); // Grant all consents
  };

  const handleDeclineAll = () => {
    localStorage.setItem('cookie-consent', 'denied');
    setIsVisible(false);
    onConsentDenied();
  };

  if (!isVisible) return null;

  return (

    <BackDrop showBackdrop={isVisible} >
      <div className={styles.banner}>
        <p>Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern. Bitte wählen Sie Ihre Präferenzen:</p>

        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              name="consent"
              value="consent_analytics"
              checked={consentTypes.includes('consent_analytics')}
              onChange={() => handleConsentChange('consent_analytics')}
            />
            Analyse Cookies
          </label>
          <label>
            <input
              type="checkbox"
              name="consent"
              value="consent_marketing"
              
         
              checked={consentTypes.includes('consent_marketing')}
              onChange={() => handleConsentChange('consent_marketing')}
            />
            Marketing Cookies
          </label>
          <label>
            <input
              type="checkbox"
              name="consent"
              value="consent_functional"
              disabled={true}
              checked={consentTypes.includes('consent_functional')}
              // onChange={() => handleConsentChange('consent_functional')}
            />
            Funktionale Cookies (For Internal Use)
          </label>
        </div>

        <div className={styles.buttons}>
          <button onClick={handleAcceptSelected} className={styles.button}>Akzeptieren Ausgewählt</button>
          <button onClick={handleAcceptAll} className={styles.button}>Alle akzeptieren</button>
          <button onClick={handleDeclineAll} className={styles.button}>Alle abbrechen</button>
        </div>
      </div>
    </BackDrop>


  );
};

export default CookieConsentForm;
