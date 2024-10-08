import { useState, useContext ,useEffect} from "react";
import "./AccessibilityMenu.scss";
import { FaAnglesRight, FaUniversalAccess } from "react-icons/fa6";
import "../../Assets/accessibility-icon.svg";
import { AccessibilityContext } from "../../Context/accessibilityContext";
export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  //default font mag size
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
  useEffect(()=>{
    let count = 0;
    //to set the default font size
    while(count<fontSize){
      increaseFontSize();
      count++
    }
  },[])

  return (
    <div className={`accessibility-menu ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <></>
      ) : (
    
          <FaUniversalAccess onClick={toggleMenu} className="accessibility-icon" title="close accessibility menu"
          aria-label="close accessibility menu"/>
       
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
