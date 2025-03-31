// src/Components/CookieConsent/CookieConsentForm.tsx
import React from 'react';
import styles from "./CookieConsent.module.scss";
import BackDrop from '../Backdrop/BackDrop';
import GoogleTagManager from '../../Util/GoogleTagManager/GoogleTagManager';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { 
  ConsentTypes, 
  consentItems, 
  setConsentSelection, 
  toggleCookieConsentVisibility, 
  acceptAllConsents,  
  declineAllConsents 
} from '../../../store/cookieConsentSlice';

const CookieConsentForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const consentSelection = useSelector((state: RootState) => state.cookieConsent.consentSelection);
  const isCookieConsentFormVisible = useSelector((state: RootState) => state.cookieConsent.isCookieConsentFormVisible);

  // Handle checkbox changes for each consent type
  const handleConsentChange = (consentType: ConsentTypes) => {
    const updatedSelection = consentSelection.includes(consentType)
      ? consentSelection.filter(type => type !== consentType)
      : [...consentSelection, consentType];
    dispatch(setConsentSelection(updatedSelection));
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentSelection));
    dispatch(toggleCookieConsentVisibility(false));
    console.log(localStorage.getItem('cookie-consent'));
  };

  const handleAcceptAll = () => {
    dispatch(acceptAllConsents());
    localStorage.setItem('cookie-consent', JSON.stringify(consentItems.map(item => item.id)));
    console.log(localStorage.getItem('cookie-consent'));
  };

  const handleDeclineAll = () => {
    dispatch(declineAllConsents());
    localStorage.setItem('cookie-consent', JSON.stringify([]));
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
