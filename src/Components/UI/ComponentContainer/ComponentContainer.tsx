import React from 'react';
import styles from './ComponentContainer.module.scss';

interface ComponentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  subHeading?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

const ComponentContainer: React.FC<ComponentContainerProps> = ({
  heading,
  subHeading,
  children,
  className,
  containerClassName,
  ...rest
}) => {
  return (
    <div
      className={`  justify-self-center 
  dark:text-white
  w-screen max-w-full
 scroll-mt-[12vh] mb-12 px-4 
       ${containerClassName ? containerClassName : ""} 
      `} tabIndex={0}
      {...rest}
    >
      <div className={` max-w-7xl mx-auto sm:px-6 md:px-8 lg:px-14 `}>
        {heading &&(
          <h2 className={`${styles.heading} text-3xl mb-4 font-semibold text-text-light dark:text-white `}>
          {heading}
        </h2>
        )}
        
        {subHeading && (
          <h3 className={`${styles.subHeading}`}>
            {subHeading}
          </h3>
        )}
        <div className={`${styles.content} ${className ? className : ""} `}>
          {children}
        </div>
      </div>

    </div>
  );
};

export default ComponentContainer;
