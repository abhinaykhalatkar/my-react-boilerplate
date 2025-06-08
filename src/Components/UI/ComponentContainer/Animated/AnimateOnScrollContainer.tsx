import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useSelector } from 'react-redux';


export type ScrollDirection =
  | 'scroll-left'
  | 'scroll-right'
  | 'scroll-up'
  | 'scroll-down'
  | 'scroll-fade'
  | 'scroll-scale-up';

interface AnimateOnScrollContainerProps {
  children: React.ReactNode;
  scrollVariant?: ScrollDirection | ScrollDirection[];
  startOffset?: number; // from 0 to 1
  disableOnMobile?: boolean;
  disableOnTablet?: boolean;
  className?: string;

}

const AnimateOnScrollContainer: React.FC<AnimateOnScrollContainerProps> = ({
  children,
  scrollVariant = 'scroll-left',
  startOffset = 0.1,
  disableOnMobile = true,
  disableOnTablet = false,
  className
}) => {
  const ref = useRef(null);

  const isMobile = useSelector((state: any) => state.accessibility.displaySize.isMobile);
  const isTablet = useSelector((state: any) => state.accessibility.displaySize.isTablet);
  const animationDisabledOnMobile = (disableOnMobile && isMobile);
  const animationDisabledOnTablet = (disableOnTablet && isTablet);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Clamp and flip: lower value = more distance to travel
  const offset = 1 - Math.min(Math.max(startOffset, 0), 1);
  const shift = `${offset * 100}%`;

  // Apply spring for smoother transform interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.9,
  });

  // Modular transform styles
  const transformStyles = {
    'scroll-left': {
      x: useTransform(smoothProgress, [0, 1], [`-${shift}`, '0%']),
    },
    'scroll-right': {
      x: useTransform(smoothProgress, [0, 1], [shift, '0%']),
    },
    'scroll-up': {
      y: useTransform(smoothProgress, [0, 1], [`${shift}`, '0%']),
    },
    'scroll-down': {
      y: useTransform(smoothProgress, [0, 1], [`-${shift}`, '10%']),
    },
    'scroll-fade': {
      opacity: useTransform(smoothProgress, [0, 1], [0, 1]),
    },
    'scroll-scale-up': {
      opacity: useTransform(smoothProgress, [0, 1], [0.90,1]),
      scale: useTransform(smoothProgress, [0, 1], [1.1, 1.15]), // Starts slightly smaller, scales to full
    },
  };

  let style = {};
  if ((!animationDisabledOnMobile) || (!animationDisabledOnTablet)) {
    if (Array.isArray(scrollVariant)) {
      scrollVariant.forEach((variant) => {
        style = { ...style, ...transformStyles[variant] };
      });
    } else {
      style = transformStyles[scrollVariant] || {};
    }
  }

  return (
    <div ref={ref} className={className}>
      {(animationDisabledOnMobile || animationDisabledOnTablet) ? (
        <div>{children}</div>
      ) : (
        <motion.div style={style}>
          {children}
        </motion.div>
      )}
    </div>
  );

  // const style = animationDisabled ? {} : transformStyles[scrollVariant] || {};

  // return (
  //   <div ref={ref}>
  //     {animationDisabled ? (
  //       <div>
  //         {children}
  //       </div>
  //     ) : (

  //       <motion.div style={style}>
  //         {children}
  //       </motion.div>
  //     )}
  //   </div>
  // );
};

export default AnimateOnScrollContainer;
