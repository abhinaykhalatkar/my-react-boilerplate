import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDisplaySize } from '@Store/accessibilitySlice';

const ResponsiveUpdaterOnResize: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const newDisplaySize = {
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 450,
        isTablet: window.innerWidth > 450 && window.innerWidth <= 1000,
        isDesktop: window.innerWidth > 1000,
      };
      dispatch(setDisplaySize(newDisplaySize));
    };

    // Add the resize event listener
    window.addEventListener('resize', handleResize);

    // Call handleResize initially in case the window size changed before mounting
    handleResize();

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default ResponsiveUpdaterOnResize;
