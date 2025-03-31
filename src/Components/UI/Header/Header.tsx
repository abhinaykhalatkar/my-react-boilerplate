import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import companyLogo from '../../../Assets/logo.png';
import { FaPhone, FaImage } from 'react-icons/fa6';
import { companyPhoneNumber, companyName } from '../../../Global-Info';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Sidebar from '../Sidebar/Sidebar';
import Nav from '../NavBar/NavBar';

const Header: React.FC = () => {
  const displaySize = useSelector((state: RootState) => state.accessibility.displaySize);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <>
      {displaySize.isTablet || displaySize.isMobile ? (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <header className={styles.header}>
          <div className={styles.topBar}>
            <div className={styles.actions}>
              <Link to="/gallery" className={`${styles.actionLink} flex`}>
                <FaImage className={styles.svgIconsR} /> Gallery
              </Link>
              <Link to={`tel:${companyPhoneNumber}`} className={`${styles.phoneNumber} flex`}>
                <FaPhone className={styles.svgIconsR} /> {companyPhoneNumber}
              </Link>
              <div className={styles.bookButton} onClick={() => alert("clicked")}>
                Contact Form
              </div>
            </div>
            <button className={styles.mobileMenuButton} onClick={toggleSidebar}>
              &#9776;
            </button>
          </div>
          <div className={styles.botBar}>
            <Link
              className={styles.logo}
              to="/"
              title={`back to ${companyName} homepage`}
            >
              <img src={companyLogo} alt={`back to ${companyName} homepage`} />
            </Link>
            <Nav />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
