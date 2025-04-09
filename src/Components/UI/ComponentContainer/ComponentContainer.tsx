import React from 'react';
import styles from './ComponentContainer.module.scss';

interface ComponentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
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
  text-black dark:bg-bg-dark dark:text-white
  p-8 
  sm:px-6 md:px-8 lg:px-14
  w-screen
  m-6 
  sm:mx-6 md:mx-8
  md:my-12 scroll-mt-[12vh]
    
         ${styles.containerCus} 
        ${containerClassName ? containerClassName : ""} 
      `}
      {...rest}
    >
      <div className='max-w-7xl mx-auto'>
      <h2 className={`${styles.heading} text-3xl md:text-4xl font-heading text-black dark:bg-bg-dark dark:text-white mb-12`}>
        {heading}
      </h2>
      {subHeading && (
        <h3 className={`${styles.subHeading} text-xl  sm:text-2xl md:text-3xl font-bold`}>
          {subHeading}
        </h3>
      )}
      <div className={`${styles.content} ${className ? className : ""} mt-4`}>
        {children}
      </div>
      </div>
      
    </div>
  );
};

export default ComponentContainer;
