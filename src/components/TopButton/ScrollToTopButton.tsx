"use client";
import React, { useState, useEffect } from "react";
import styles from "./ScrollToTopButton.module.scss";
import { FaAnglesDown } from "react-icons/fa6";

// import doubleUpIcon from "../../assets/doubleUpIcon.png";

import { useLocation } from 'react-router-dom';

export const ScrollToTopFunction = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
};
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return isVisible ? (
    <button onClick={scrollToTop} className={styles.scrollToTop}>
      <FaAnglesDown />
      {/* <img
        src={doubleUpIcon}
        alt="go to the top of page"
        title="go to the top of page"
      /> */}
    </button>
  ) : null;
};

export default ScrollToTopButton;
