"use client";
import React, { useEffect, useState } from "react";
import styles from "./AlertModule.module.scss";


interface AlertModuleProps {
  alertContent: string;
  visibleTime: number; // in seconds
}

const AlertModule: React.FC<AlertModuleProps> = ({ alertContent, visibleTime }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the alert after the specified visible time
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, visibleTime * 1000);

    // Clear the timer if the component unmounts before the time is up
    return () => clearTimeout(timer);
  }, [visibleTime]);

  return (
    <>
      {isVisible && (
        <div 
          className={styles.alertModule} 
          style={{ animationDuration: `${visibleTime + 1}s` }} 
          onClick={()=>{setIsVisible(false)}}
        >
          {alertContent}
        </div>
      )}
    </>
  );
};

export default AlertModule;