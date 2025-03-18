import { useState, useEffect } from "react";
import "./AccessibilityMenu.scss";
import { FaAnglesRight, FaUniversalAccess } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { increaseFontSize, decreaseFontSize } from "../../store/accessibilitySlice";

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // Local font level state for display (range 1-5)
  const [fontLevel, setFontLevel] = useState(1);

  const dispatch: AppDispatch = useDispatch();
  // Optionally, retrieve the actual global font size value if needed:
  const fontSizeMag = useSelector((state: RootState) => state.accessibility.fontSizeMag);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  function adjustFontSize(increase: boolean) {
    if (increase && fontLevel < 5) {
      setFontLevel(prev => prev + 1);
      dispatch(increaseFontSize());
    } else if (!increase && fontLevel > 1) {
      setFontLevel(prev => prev - 1);
      dispatch(decreaseFontSize());
    }
  }

  useEffect(() => {
    // Optionally, initialize global font size if needed.
    // This example assumes the default is already set in your Redux store.
  }, []);

  return (
    <div className={`accessibility-menu ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <FaUniversalAccess
          onClick={toggleMenu}
          className="accessibility-icon"
          title="open accessibility menu"
          aria-label="open accessibility menu"
        />
      )}
      <div className={`menu-content ${isOpen ? "open" : ""}`}>
        <div
          onClick={toggleMenu}
          className="close_Icon"
          title="close accessibility menu"
          aria-label="close accessibility menu"
        >
          <FaAnglesRight />
        </div>
        <div className="font-size-func">
          <div className="circle" onClick={() => adjustFontSize(false)}>
            <span className="hor-line"></span>
          </div>
          <h3>Font Size: {fontLevel}</h3>
          <div className="circle" onClick={() => adjustFontSize(true)}>
            <span className="hor-line"></span>
            <span className="ver-line"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
