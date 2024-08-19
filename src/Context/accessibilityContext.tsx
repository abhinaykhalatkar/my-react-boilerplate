import React, { useState, createContext, useEffect, ReactNode } from "react";

interface AccessibilityContextType {
  darkTheme: boolean;
  toggleTheme: () => void;
  fontSizeMag: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  displaySize: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}
const defaultContextValue: AccessibilityContextType = {
  darkTheme: false,
  toggleTheme: () => {},
  fontSizeMag: 16,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  displaySize: {
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  },
};

// Create a context with a default value
export const AccessibilityContext = createContext<AccessibilityContextType >(defaultContextValue);

interface AccessibilityProviderProps {
  children: ReactNode;
}
export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const mobileWidth = 450;
  const desktopWidth = 1000;
  //change to 1366 after development
  const [darkTheme, setDarkTheme] = useState(false);
  const [fontSizeMag, setFontSizeMag] = useState(16);
  const [displaySize, setDisplaySize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= mobileWidth ? true : false,
    isTablet:
      window.innerWidth > mobileWidth && window.innerWidth <= desktopWidth
        ? true
        : false,
    isDesktop: window.innerWidth > desktopWidth ? true : false,
  });
  useEffect(() => {
    const handleResize = () => {
      setDisplaySize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= mobileWidth ? true : false,
        isTablet:
          window.innerWidth > mobileWidth && window.innerWidth <= desktopWidth
            ? true
            : false,
        isDesktop: window.innerWidth > desktopWidth ? true : false,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setDisplaySize]);
  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }
  function increaseFontSize() {
    fontSizeMag >= 16 && fontSizeMag < 26
      ? setFontSizeMag(fontSizeMag + 2)
      : setFontSizeMag(fontSizeMag);
  }
  function decreaseFontSize() {
    fontSizeMag > 16 && fontSizeMag <= 26
      ? setFontSizeMag(fontSizeMag - 2)
      : setFontSizeMag(fontSizeMag);
  }
  return (
    <AccessibilityContext.Provider
      value={{
        darkTheme,
        toggleTheme,
        fontSizeMag,
        decreaseFontSize,
        increaseFontSize,
        displaySize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
