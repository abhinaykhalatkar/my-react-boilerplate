import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

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
            
            return (
              <li key={to}>
                {isLast ? (
                  <span>{decodeURIComponent(value).replace(/-/g, ' ')}</span>
                ) : (
                  <Link to={to}>{decodeURIComponent(value).replace(/-/g, ' ')}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
};

export default Breadcrumbs;