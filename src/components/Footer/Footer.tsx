import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { companyName } from '../../Global-Info';

const Footer: React.FC = () => {
    return (
        <div className={styles.Footer}>
            <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
            <ul className={styles.footerLinks}>

                <li><Link to="/datenschutz">Privacy Policy</Link></li>
                <li><Link to="/impressum">Terms of Service</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>

            </ul>

        </div>
    );
};

export default Footer;