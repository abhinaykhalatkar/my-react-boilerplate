import React, { useState, useContext } from "react";
import "./AccessibilityMenu.scss";
import { FaAnglesRight, FaUniversalAccess } from "react-icons/fa6";
import "../../Assets/accessibility-icon.svg";
import { AccessibilityContext } from "../../Context/accessibilityContext";
export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1);

  const { decreaseFontSize, increaseFontSize } =
    useContext(AccessibilityContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  function adjustFontSize(val: boolean) {
    if (val && fontSize < 5) {
      setFontSize(fontSize + 1);
      increaseFontSize();
    } else if (!val && fontSize > 1) {
      setFontSize(fontSize - 1);
      decreaseFontSize();
    }
  }

  return (
    <div className={`accessibility-menu ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <></>
      ) : (
        <div onClick={toggleMenu} className="accessibility-icon" title="close accessibility menu"
          aria-label="close accessibility menu" >
          <FaUniversalAccess />
        </div>
      )}
      <div className={`menu-content ${isOpen ? "open" : ""}`}>
        <div onClick={toggleMenu} className={'close_Icon'} title="close accessibility menu"
          aria-label="close accessibility menu">
          <FaAnglesRight />
        </div>
        <div className="font-size-func">
          <div
            className="circle"
            onClick={() => {
              adjustFontSize(true);
            }}
          >
            <span className="hor-line"></span>
            <span className="ver-line"></span>
          </div>
          <h3>Font Size: {fontSize}</h3>
          <div
            className="circle"
            onClick={() => {
              adjustFontSize(false);
            }}
          >
            <span className="hor-line"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
