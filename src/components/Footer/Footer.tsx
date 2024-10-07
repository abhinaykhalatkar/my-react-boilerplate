import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { companyName } from '../../Global-Info';

const Footer: React.FC = () => {
    return (
        <div className={styles.Footer}>
            <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
            <ul className={styles.footerLinks}>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>

        </div>
    );
};

export default Footer;