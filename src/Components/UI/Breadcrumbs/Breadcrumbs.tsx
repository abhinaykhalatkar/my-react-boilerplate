import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import routesData from 'Pages/routerData'; // Make sure to adjust this path based on your project structure

// Helper function to recursively find the navName based on the path
const findNavName = (path: string, routes: any[]): string | undefined => {
    for (const route of routes) {
        if (route.path === path) {
            return route.navName;
        }

        // Check subRoutes if present
        if (route.subRoutes) {
            const found = findNavName(path, route.subRoutes);
            if (found) return found;
        }
    }
    return undefined; // Return undefined if no match is found
};

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className={styles.breadcrumb}>
            <ul>
                <li>
                    <Link to="/">Start</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    // Find the navName from the routesData based on the current segment
                    const navName = findNavName(`/${value}`, routesData) || value;

                    return (
                        <li key={to}>
                            {isLast ? (
                                <span>{navName}</span>
                            ) : (
                                <Link to={to}>{navName}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;