import React, { useState, useEffect } from 'react';
import styles from "./CookieConsent.module.scss";
import BackDrop from '../Backdrop/BackDrop';
import GoogleTagManager from '../GoogleTagManager/GoogleTagManager';

export enum Consents {
  Analytics = "consent_analytics",
  Marketing = "consent_marketing",
  Functional = "consent_functional"
}

const CookieConsentForm: React.FC = () => {

  const [consentSelection, setConsentSelection] = useState<Consents[]>([])
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent) as Consents[];
        setConsentSelection(parsedConsent);
      } catch (error) {
        console.error("Failed to parse consent data from localStorage:", error);
      }
    } else {
      setConsentSelection([...Object.values(Consents)])
      setIsVisible(true);
    }

  }, []);

  // Handle checkbox changes for each consent type
  const handleConsentChange = (consentType: Consents) => {
    setConsentSelection((prev) =>
      prev.includes(consentType)
        ? prev.filter(type => type !== consentType)
        : [...prev, consentType]
    );
  };
  // Handle Accepting the selected consents
  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentSelection));
    setIsVisible(false);
    console.log(localStorage.getItem('cookie-consent'))
  };

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify([...Object.values(Consents)]));
    setIsVisible(false);
    console.log(localStorage.getItem('cookie-consent'))
  };

  const handleDeclineAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify([]));
    setIsVisible(false);
    console.log(localStorage.getItem('cookie-consent'))
  };
  return (
    <>
      {isVisible ? <BackDrop showBackdrop={isVisible} >
        <div className={styles.banner}>
          <p>Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern. Bitte wählen Sie Ihre Präferenzen:</p>
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="consent"
                value={Consents.Analytics}
                checked={consentSelection.includes(Consents.Analytics)}
                onChange={() => handleConsentChange(Consents.Analytics)}
              />
              Analyse Cookies
            </label>
            <label>
              <input
                type="checkbox"
                name="consent"
                value={Consents.Marketing}
                checked={consentSelection.includes(Consents.Marketing)}
                onChange={() => handleConsentChange(Consents.Marketing)}
              />
              Marketing Cookies
            </label>
            <label>
              <input
                type="checkbox"
                name="consent"
                value={Consents.Functional}
                disabled={true}
                checked={consentSelection.includes(Consents.Functional)}
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
      </BackDrop> : 
      <GoogleTagManager consentSelection={consentSelection} />
      }
    </>
  );
};

export default CookieConsentForm;
