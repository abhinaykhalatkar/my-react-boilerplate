import React from 'react';
import styles from './CircleLoader.module.scss';

interface CircleLoaderProps {
  size?: 'small' | 'medium' | 'large';
}

const CircleLoader: React.FC<CircleLoaderProps> = ({ size = 'medium' }) => {
  // Decide which size class to apply
  const sizeClass =
    size === 'small'
      ? styles.small
      : size === 'large'
      ? styles.large
      : styles.medium;

  return (
    <div className={styles.loaderContainer}>
      <div className={`${styles.loader} ${sizeClass}`} />
    </div>
  );
};

export default CircleLoader;
