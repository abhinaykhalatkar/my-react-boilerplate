import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { companyName } from '../../../Global-Info';
import { useDispatch,  } from 'react-redux';
import { AppDispatch } from '@Store/store';
import { toggleCookieConsentVisibility } from '@Store/cookieConsentSlice';

const Footer: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const handleCookieConsentToggle = () => {
        // Dispatching without a payload toggles the visibility.
        dispatch(toggleCookieConsentVisibility());
    };
    return (
        <div className={styles.Footer}>
            <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
            <ul className={styles.footerLinks}>

                <li><Link to="/datenschutz">Privacy Policy</Link></li>
                <li><Link to="/impressum">Terms of Service</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li onClick={handleCookieConsentToggle} className={styles.cookieConsentButton}>
                    Update Cookie Consent
                </li>
            </ul>

        </div>
    );
};

export default Footer;