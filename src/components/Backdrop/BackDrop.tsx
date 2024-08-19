"use client";
import styles from "./BackDrop.module.scss";

interface BackDropProps {
  showBackdrop: boolean;
  setShowBackdrop: (value:boolean) => void;
}

const BackDrop: React.FC<BackDropProps> = ({ showBackdrop, setShowBackdrop }) => {
  return (
    <>
      {showBackdrop && (
        <div onClick={() => setShowBackdrop(!showBackdrop)}  className={styles.backDrop}></div>
      )}
    </>
  );
};

export default BackDrop;