import React from 'react';
import styles from './Page404.module.scss';
import { Link } from 'react-router-dom';

const Page404: React.FC = () => {
    return (

         <div className={styles.Page404}>
            <h1>404 Page Not Found</h1>
            <h2>Return to <Link className={styles.link} to="/">Home</Link></h2>
        </div>

    );
};

export default Page404;