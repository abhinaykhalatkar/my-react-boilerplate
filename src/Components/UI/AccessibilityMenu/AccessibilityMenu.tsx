import { useState } from "react";
import "./AccessibilityMenu.scss";
import { FaAnglesRight, FaUniversalAccess } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@Store/store";
import { increaseFontSize, decreaseFontSize } from "@Store/accessibilitySlice";
import DarkModeToggle from '@UI/Buttons/DarkModeToggle/DarkModeToggleBtn';
export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // Local font level state for display (range 1-5)
  const [fontLevel, setFontLevel] = useState(2);

  const dispatch: AppDispatch = useDispatch();
  // Optionally, retrieve the actual global font size value if needed:
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
          className="h-full close_Icon border-r-2 pr-1"
          title="close accessibility menu"
          aria-label="close accessibility menu"
        >
          <FaAnglesRight />
        </div>
        <div className="justify-items-center mb-1">
                <DarkModeToggle/>
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
    </div>
  );
}
