import React, { useState, useEffect } from 'react';
import styles from "./CookieConsent.module.scss";
import BackDrop from '../Backdrop/BackDrop';
import GoogleTagManager from '../GoogleTagManager/GoogleTagManager';

// Updated enum for consent types
export enum ConsentTypes {
  Analytics = "consent_analytics",
  Marketing = "consent_marketing",
  Functional = "consent_functional"
}

// Array of consent items with IDs and labels
const consentItems: { id: ConsentTypes; label: string; disabled?: boolean; isCheckedByDef?: boolean }[] = [
  { id: ConsentTypes.Analytics, label: "Analyse Cookies" },
  { id: ConsentTypes.Marketing, label: "Marketing Cookies" },
  { id: ConsentTypes.Functional, label: "Funktionale Cookies (For Internal Use)", disabled: true, isCheckedByDef: true },
];

const CookieConsentForm: React.FC = () => {
  const [consentSelection, setConsentSelection] = useState<ConsentTypes[]>([]);
  const [isCookieConsentFormVisible, setIsCookieConsentFormVisible] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent) as ConsentTypes[];
        setConsentSelection(parsedConsent);
      } catch (error) {
        console.error("Failed to parse consent data from localStorage:", error);
      }
    } else {
      // Set all consents as default
      setConsentSelection(consentItems.filter(item => item.isCheckedByDef).map(item => item.id));
      handleCookieConsentToggle(true)
    }
  }, []);
  const handleCookieConsentToggle = (state?: boolean) => {
    if (state !== undefined) {
      setIsCookieConsentFormVisible(state);
    } else {
      setIsCookieConsentFormVisible(prev => !prev);
    }
  };

  // Handle checkbox changes for each consent type
  const handleConsentChange = (consentType: ConsentTypes) => {
    setConsentSelection(prev =>
      prev.includes(consentType)
        ? prev.filter(type => type !== consentType)
        : [...prev, consentType]
    );
  };

  // Handle Accepting the selected consents
  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentSelection));
    setIsCookieConsentFormVisible(false);
    console.log(localStorage.getItem('cookie-consent'));
  };

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentItems.map(item => item.id)));
    setIsCookieConsentFormVisible(false);
    console.log(localStorage.getItem('cookie-consent'));
  };

  const handleDeclineAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify([]));
    setIsCookieConsentFormVisible(false);
    console.log(localStorage.getItem('cookie-consent'));
  };

  return (
    <>
      {isCookieConsentFormVisible ? (
        <BackDrop showBackdrop={isCookieConsentFormVisible}>
          <div className={styles.banner}>
            <p>
              Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern. Bitte wählen Sie Ihre Präferenzen:
            </p>
            <div className={styles.checkboxGroup}>
              {consentItems.map((item) => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    name="consent"
                    value={item.id}
                    checked={consentSelection.includes(item.id)}
                    onChange={() => handleConsentChange(item.id)}
                    disabled={item.disabled}
                  />
                  {item.label}
                </label>
              ))}
            </div>
            <div className={styles.buttons}>
              <button onClick={handleAcceptSelected} className={styles.button}>
                Akzeptieren Ausgewählt
              </button>
              <button onClick={handleAcceptAll} className={styles.button}>
                Alle akzeptieren
              </button>
              <button onClick={handleDeclineAll} className={styles.button}>
                Alle abbrechen
              </button>
            </div>
          </div>
        </BackDrop>
      ) : (
        <GoogleTagManager consentSelection={consentSelection} />
      )}
    </>
  );
};

export default CookieConsentForm;
