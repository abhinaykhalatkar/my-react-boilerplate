
import React, { useState, useEffect } from "react";
import styles from "./ScrollToTopButton.module.scss";
import { FaAnglesUp } from "react-icons/fa6";

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
export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
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

    <button
      onClick={scrollToTop}
      className="
        fixed right-5 bottom-20 
        bg-brand-light text-white
        rounded-lg shadow-lg w-12 h-12 flex items-center justify-center
        opacity-70 hover:opacity-100 transition-opacity duration-300 z-8
      "
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <FaAnglesUp className="text-xl" />
    </button>

  ) : null;
};

export default ScrollToTopButton;
