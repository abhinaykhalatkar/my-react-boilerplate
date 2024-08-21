
import styles from "./BackDrop.module.scss";


interface BackDropProps {
  showBackdrop: boolean;
  setShowBackdrop: (value:boolean) => void;
  children: React.ReactNode;
}

const BackDrop: React.FC<BackDropProps> = ({ showBackdrop, setShowBackdrop,children }) => {
  return (
    <>
      {showBackdrop && (
        <div onClick={() => setShowBackdrop(!showBackdrop)}  className={styles.backDrop}>
          {children}
        </div>
      )}

    </>
  );
};

export default BackDrop;