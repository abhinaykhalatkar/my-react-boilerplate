import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaArrowUpLong, FaArrowDownLong } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import styles from './Sidebar.module.scss';
import companyLogo from '../../logo.svg';
import routesData, { RouteData } from '../../Pages/routerData';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [expandedStates, setExpandedStates] = useState<{ [key: string]: boolean }>({});

  const toggleSubMenu = (key: string) => {
    setExpandedStates(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderNavItems = (routes: RouteData[], parentPath: string = '') => {
    return routes
      .filter(route => route.addToSideBar !== false)
      .map((el, index) => {
        const fullPath = `${parentPath}${el.path}`;
        const hasDropdown = el.subRoutes && el.subRoutes.length > 0;

        if (hasDropdown) {
          return (
            <div key={index} className={styles.dropdownWrapper}>
              <div
                className={styles.navLink}
                onClick={() => toggleSubMenu(fullPath)}
              >
                {el.navName}
                <motion.div
                  className={styles.chevronIcon}
                  animate={{ rotate: expandedStates[fullPath] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedStates[fullPath] ? <FaArrowUpLong /> : <FaArrowDownLong />}
                </motion.div>
              </div>
              {el.subRoutes &&

                <motion.div
                  className={styles.subMenu}
                  initial={false}
                  animate={{ height: expandedStates[fullPath] ? 'auto' : 0, opacity: expandedStates[fullPath] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  {renderNavItems(el.subRoutes, fullPath)}
                </motion.div>
              }

            </div>
          );
        }

        return (
          <Link
            key={index}
            to={fullPath}
            className={styles.navLink}
            onClick={toggleSidebar}
          >
            {el.navName}
          </Link>
        );
      });
  };

  return (
    <>
      <div>
        <motion.div
          className={styles.hamburgerIcon}
          onClick={toggleSidebar}
          initial={{ x: 0 }}
          animate={{ x: isOpen ? '70%' : 0 }}
        >
          <FaBars className={styles.svgIconsR} />
        </motion.div>
      </div>

      <motion.div
        className={styles.sidebar}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <Link className={styles.logoContainer} to="/" onClick={toggleSidebar}>
          <img src={companyLogo} alt="PREV" className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          {renderNavItems(routesData)}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
