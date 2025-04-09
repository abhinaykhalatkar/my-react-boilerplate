import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import styles from '../ComponentContainer.module.scss';
import { useSelector } from 'react-redux';
import {animationVariants, AnimationVariantType } from './animationVariants';



interface AnimatedComponentContainerProps {
  heading?: string;
  subHeading?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  scrollId?: string;
  animationVariant?: AnimationVariantType;
  animateOnce?: boolean;
  exitOnLeave?: boolean;
  custom?: number;
  disableOnMobile?: boolean;
}



const AnimatedComponentContainer: React.FC<AnimatedComponentContainerProps> = ({
  heading,
  subHeading,
  children,
  className,
  containerClassName,
  scrollId,
  animationVariant = 'fade-up',
  animateOnce = true,
  exitOnLeave = false,
  disableOnMobile = true,
  custom = 0,
}) => {
  const baseClass = `${styles.container} ${containerClassName || ''} p-4`;
  const variants = animationVariants[animationVariant];
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { amount: 0.27 });
  const isMobile = useSelector((state: any) => state.accessibility.displaySize.isMobile);
  const animationDisabled = (disableOnMobile && isMobile);

  useEffect(() => {
    if (!exitOnLeave) return;

    const timeout = setTimeout(() => {
      controls.start(isInView ? 'visible' : 'hidden');
    }, 100); // Debounce for jitter prevention

    return () => clearTimeout(timeout);
  }, [isInView, exitOnLeave, controls]);

  const animationProps = exitOnLeave
    ? {
      animate: controls,
      initial: 'hidden',
      ref,
    }
    : {
      whileInView: 'visible',
      initial: 'hidden',
      viewport: { once: animateOnce, amount: 0.3 },
    };

  return (

    <>
      {animationDisabled ? <div className={baseClass}>
        {heading && <h2 className="text-2xl font-bold mb-2">{heading}</h2>}
        {subHeading && <h3 className={styles.subHeading}>{subHeading}</h3>}
        <div className={`${styles.content} ${className || ''}`}>{children}</div>
      </div>
        : (
          <motion.div
            {...animationProps}
            custom={!exitOnLeave ? custom : undefined}
            variants={{
              hidden: variants.hidden,
              visible: {
                ...variants.visible,
                transition: {
                  ...(variants.visible.transition || {}),
                  ...(exitOnLeave ? {} : { delay: custom }), // ✅ Only add delay if stagger is allowed
                },
              },
            }}
            className={baseClass}
            id={scrollId || undefined}
          >
            {heading && <h2 className="text-2xl font-bold mb-2">{heading}</h2>}
            {subHeading && <h3 className={styles.subHeading}>{subHeading}</h3>}
            <div className={`${styles.content} ${className || ''}`}>{children}</div>
          </motion.div>
        )}
    </>

  );
};

export default AnimatedComponentContainer;
