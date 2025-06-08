// src/Components/CookieConsent/CookieConsentForm.tsx
import React from 'react';
import styles from "./CookieConsent.module.scss";
import BackDrop from '../Backdrop/BackDrop';
import GoogleTagManager from '../../Util/GoogleTagManager/GoogleTagManager';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@Store/store';
import {
  ConsentTypes,
  consentItems,
  setConsentSelection,
  toggleCookieConsentVisibility,
  acceptAllConsents,
  declineAllConsents,resetCookies
} from '@Store/cookieConsentSlice';

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
const handleCookieRest=()=>{
  dispatch(resetCookies())
}

  return (
    <>
      {isCookieConsentFormVisible ? (
        <BackDrop showBackdrop={isCookieConsentFormVisible}>
          <div className={`${styles.banner} bg-bg-light text-brand-primary dark:bg-bg-muted dark:text-text-dark`}>
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
                    disabled={consentSelection.includes(item.id) && item.disabled}
                  />
                  {item.label}
                </label>
              ))}
            </div>
            <div className={styles.buttons}>
              <button onClick={handleAcceptSelected} className={styles.button}>
                Akzeptieren Ausgewählt
              </button>
              {consentItems.length > 1 && <button onClick={handleAcceptAll} className={styles.button}>
                Alle akzeptieren
              </button>}
              <button onClick={handleDeclineAll} className={styles.button}>
                {consentItems.length > 1 ? "Alle abbrechen" : "abbrechen"}
              </button>
            </div>
            <p onClick={handleCookieRest} className='cursor-pointer justify-self-end text-red-800 font-semibold text-smallest transition-colors duration-300 my-2 w-fit px-1 rounded-md hover:text-white hover:bg-red-800'>Reset cookie consent</p>
          </div>
        </BackDrop>
      ) : (
        <GoogleTagManager />
      )}
    </>
  );
};

export default CookieConsentForm;
