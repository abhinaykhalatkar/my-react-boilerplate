import React, { useState, useContext } from "react";
import "./AccessibilityMenu.scss";
import accessIcon from "../../Assets/accessibility-icon.svg";
import arrowIcon from "../../Assets/double-arrow-right.svg";
import { AccessibilityContext } from "../../Context/accessibilityContext";
export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1);

  const { decreaseFontSize, increaseFontSize } =
    useContext(AccessibilityContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  function adjustFontSize(val) {
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
        <img
          src={accessIcon}
          className="accessibility-icon"
          alt="accessibility menu"
          onClick={toggleMenu}
        />
      )}
      <div className={`menu-content ${isOpen ? "open" : ""}`}>
        <div>
          <img
            src={arrowIcon}
            className="close-Icon"
            alt="close accessibility menu"
            onClick={toggleMenu}
          />
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
