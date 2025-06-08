import { useState } from "react";
import { FaUniversalAccess } from "react-icons/fa6";
import { RiCloseCircleLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import DarkModeToggle from '@UI/Buttons/DarkModeToggle/DarkModeToggleBtn';
import {hasConsent,  ConsentTypes, toggleCookieConsentVisibility } from "@Store/cookieConsentSlice";
import AppearanceAccessibilityFeatures from "./AppearanceAccessibilityFeatures/AppearanceAccessibilityFeatures";
import FontSizeMenu from "./FontSizeMenu/FontSizeMenu";
import styles from "./AccessibilityMenu.module.scss";


export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCookieConsentToggle = () => {
    dispatch(toggleCookieConsentVisibility());
  };

  function AccessibilityFunctions() {
    return (
      <div className={`${styles.acessiblityFunctions} flex flex-col items-center gap-2 w-full ${isOpen ? 'visible' : 'invisible'} `}>
        <AppearanceAccessibilityFeatures />
        <DarkModeToggle />
        <FontSizeMenu />
      </div>
    );
  }

  return (
    <motion.div
      layoutId="accessibilityMenuMorph"
      className={`
        fixed bottom-5 right-5 z-10 text-text-light dark:text-text-dark shadow-lg
        ${isOpen
          ? "bg-bg-subtle dark:bg-bg-dark flex flex-col"
          : "bg-brand-light flex items-center justify-center"}
      `}
      initial={false}
      animate={{
        width: isOpen ? 300 : 48,  // Open width is fixed; closed width is icon size
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      style={{
        overflow: "hidden",
        minWidth: 48,
        minHeight: 48,
        height: isOpen ? "auto" : 48, // auto height on open, fixed 48px on close

        borderRadius: 8, // fixed subtle rounding, no animation
        boxShadow: "0 4px 16px rgba(0,0,0,0.22)",
      }}
      onClick={() => { if (!isOpen) setIsOpen(true); }}
      onKeyDown={e => {
        if (
          (e.key === 'Enter' || e.key === ' ') && !isOpen
        ) {
          setIsOpen(true);
          e.preventDefault(); // prevent scrolling on space
        }
      }}
      tabIndex={0}
    >
      <div className={`w-full flex flex-col gap-2 px-3 py-3 relative`}>
        {isOpen && (
          <div className="flex justify-end">
            <RiCloseCircleLine
              onClick={e => { e.stopPropagation(); setIsOpen(false); }}
              className="hover:text-bg-muted dark:hover:text-brand-light text-2xl cursor-pointer"
              aria-label="Close accessibility menu"
               tabIndex={0}
            />
          </div>
        )}

        <AccessibilityFunctions />
        {isOpen && !hasConsent(ConsentTypes.Functional) && (
          <p className="text-red-800 font-semibold text-sm text-center py-3">
            Bitte <span
              onClick={() => { handleCookieConsentToggle(); setIsOpen(false); }}
              className="text-green-600 hover:underline cursor-pointer"
            >
              akzeptieren
            </span> Sie die funktionalen Cookies, um Ihre Präferenz zu speichern.
          </p>
        )}

        {!isOpen && (
          <FaUniversalAccess
            className="text-2xl text-text-dark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            role="img"
            aria-label="Open Accessibility Menu"
            title="Open Accessibility Menu"
          />)}
      </div>
    </motion.div>
  );
}
