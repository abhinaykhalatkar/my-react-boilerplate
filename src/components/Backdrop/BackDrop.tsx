
import styles from "./BackDrop.module.scss";
import { useEffect } from "react";


interface BackDropProps {
  showBackdrop: boolean;
  setShowBackdrop: (value: boolean) => void;
  children: React.ReactNode;
}

const BackDrop: React.FC<BackDropProps> = ({ showBackdrop, setShowBackdrop, children }) => {
  useEffect(() => {
    if (showBackdrop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showBackdrop]);
  return (
    <>
      {showBackdrop && (
        <div onClick={() => setShowBackdrop(!showBackdrop)} className={styles.backDrop}>
          <div onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}

    </>
  );
};

export default BackDrop;