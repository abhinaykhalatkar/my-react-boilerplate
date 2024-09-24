import React, { useEffect, useState } from 'react';
import styles from './NavBar.module.scss';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import routesData, { RouteData } from '../../Pages/routerData';
import { FaArrowUpLong } from 'react-icons/fa6';

interface HandleMouseEnterParams {
    key: string;
    event?: React.MouseEvent;
    hasDropdown?: boolean;
}
const Nav: React.FC = () => {
    const [dropdownStates, setDropdownStates] = useState<{ [key: string]: boolean }>({});
    const [underlineStyle, setUnderlineStyle] = useState({});
    const location = useLocation();
    const handleMouseLeave = () => {
        setDropdownStates({});
        setUnderLineToActive();
    };
    useEffect(() => {
        setUnderLineToActive();
    }, []);

    let closeDropdownTimeout: NodeJS.Timeout;
    const handleMouseEnter = ({ key, event, hasDropdown }: HandleMouseEnterParams) => {
        clearTimeout(closeDropdownTimeout); // Clear any existing timeout to keep the dropdown open

        if (event && !hasDropdown) {
            const target = event.currentTarget as HTMLElement;
            const { offsetLeft, offsetWidth } = target;
            if (offsetLeft !== 0) {
                setUnderlineStyle({
                    left: offsetLeft,
                    width: offsetWidth,
                });
            }
        } else {
            setUnderlineStyle({
                left: 0,
                width: 0,
            });
        }
        // closeAllDropdowns();
        setDropdownStates(prevState => ({
            ...prevState,
            [key]: true,
        }));

    };
    const setUnderLineToActive = () => {
        const activeLink = document.querySelector(`.${styles.navLink}.${styles.active}`);

        // Check if the current active link has `addToNav: true`
        const activeRoute = routesData.find(route => location.pathname === route.path && route.addToNav !== false);

        if (activeLink && activeRoute) {
            const { offsetLeft, offsetWidth } = activeLink as HTMLElement;
            setUnderlineStyle({
                left: offsetLeft,
                width: offsetWidth,
            });
        } else {
            setUnderlineStyle({
                left: 0,
                width: 0,
            });
        }
    };
    // Recursive function to render navigation links and dropdowns
    const renderNavItems = (routes: RouteData[], parentPath: string = '') => {
        return routes
            .filter(route => route.addToNav !== false) // Filter to exclude routes with `addToNav: false`
            .map((el, index) => {
                const fullPath = `${parentPath}${el.path}`;
                const hasDropdown = el.subRoutes && el.subRoutes.length > 0;

                if (hasDropdown) {
                    return (
                        <div
                            className={styles.dropdownWrapper}
                            key={index}
                            onMouseEnter={(e) => {
                                handleMouseEnter({ key: fullPath, event: e, hasDropdown });
                            }}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span
                                className={`${styles.navLink} ${location.pathname.includes(fullPath) ? styles.active : ''}`}
                            >
                                {el.navName}
                                <motion.div
                                    className={styles.chevronIcon}
                                    animate={{ rotate: dropdownStates[fullPath] ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaArrowUpLong className={`${styles.svgIconsR} ${styles.subRouteIcon}`} />
                                </motion.div>
                            </span>

                            {el.subRoutes && dropdownStates[fullPath] && (
                                <motion.div
                                    className={styles.dropdown}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    onMouseEnter={() => {
                                        handleMouseEnter({ key: fullPath, hasDropdown });
                                        setUnderlineStyle({
                                            left: 0,
                                            width: 0,
                                        });
                                    }}
                                >
                                    {renderNavItems(el.subRoutes, fullPath)} {/* Recursively render dropdown items */}
                                </motion.div>
                            )}
                        </div>
                    );
                }

                return (
                    <Link
                        key={index}
                        to={fullPath}
                        className={`${styles.navLink} ${location.pathname === fullPath ? styles.active : ''}`}
                        onMouseEnter={(e) => {
                            handleMouseEnter({ key: fullPath, event: e, hasDropdown })
                        }}
                    >
                        {el.navName}
                        {/* {parentPath && <FaArrowRightLong className={styles.subRouteIcon} />}  */}
                    </Link>
                );
            });
    };
    return (

        <nav className={styles.nav} onMouseLeave={handleMouseLeave}>
            {renderNavItems(routesData)}
            <motion.div className={styles.underline} style={underlineStyle} layout />
        </nav>


    );
};

export default Nav;