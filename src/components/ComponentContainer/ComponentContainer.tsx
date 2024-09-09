import React from 'react';
import styles from './ComponentContainer.module.scss';
interface ComponentContainerProps {
    heading: string;
    subHeading?: string;
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    scrollId?:string;
}

const ComponentContainer: React.FC<ComponentContainerProps> = ({ heading, children, subHeading, className,scrollId, containerClassName }) => {
    return (
        <div className={`${styles.container} ${containerClassName ? containerClassName : ""}`} id={scrollId ? scrollId : undefined}>
            <h2 className={styles.heading}>{heading}</h2>
            <span className={styles.line}></span>
            {subHeading && <h3 className={styles.subHeading}>{subHeading}</h3>}

            <div className={`${styles.content} ${className ? className : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default ComponentContainer;