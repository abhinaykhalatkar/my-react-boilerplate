import { useEffect, useState } from "react";
import styles from "./FontSizeMenu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@Store/store";
import { increaseFontSize, decreaseFontSize } from "@Store/accessibilitySlice";
import { hasConsent } from "@Store/cookieConsentSlice";

const LOCALSTORAGE_FONT_KEY = "font_size";
const MIN_FONT_PX = 16;
const MAX_FONT_PX = 26;

export default function FontSizeMenu() {
  const dispatch: AppDispatch = useDispatch();
  const fontSizeMag = useSelector((state: RootState) => state.accessibility.fontSizeMag);
  const [fontLevel, setFontLevel] = useState(2);

  // Initialize from localStorage on mount
  useEffect(() => {
    if (hasConsent("consent_functional" as any)) {
      const stored = localStorage.getItem(LOCALSTORAGE_FONT_KEY);
      if (stored) {
        const px = parseInt(stored, 10);
        if (!isNaN(px) && px >= MIN_FONT_PX && px <= MAX_FONT_PX) {
          const diff = px - fontSizeMag;
          // Sync Redux store with localStorage if they don't match
          if (diff > 0) {
            for (let i = 0; i < diff / 2; i++) dispatch(increaseFontSize());
          } else if (diff < 0) {
            for (let i = 0; i < Math.abs(diff) / 2; i++) dispatch(decreaseFontSize());
          }
        }
      }
    }
    // eslint-disable-next-line
  }, []);

  // Sync fontLevel (UI) with Redux value
  useEffect(() => {
    setFontLevel((fontSizeMag - MIN_FONT_PX) / 2 + 1);
    // Optionally set the root font size for rem units
    document.documentElement.style.fontSize = `${fontSizeMag}px`;
  }, [fontSizeMag]);

  const handleIncrease = () => {
    if (fontSizeMag < MAX_FONT_PX) {
      dispatch(increaseFontSize());
      if (hasConsent("consent_functional" as any)) {
        localStorage.setItem(LOCALSTORAGE_FONT_KEY, (fontSizeMag + 2).toString());
      }
    }
  };

  const handleDecrease = () => {
    if (fontSizeMag > MIN_FONT_PX) {
      dispatch(decreaseFontSize());
      if (hasConsent("consent_functional" as any)) {
        localStorage.setItem(LOCALSTORAGE_FONT_KEY, (fontSizeMag - 2).toString());
      }
    }
  };

  return (
    <div className={styles["font-size-controls"]}>
      <button
        onClick={handleDecrease}
        className={styles["circle-button"]}
        aria-label="Decrease font size"
      >
        <span className={styles["hor-line"]} />
      </button>
      <span className={styles["font-label"]}>
        Font Size: {fontLevel}
      </span>
      <button
        onClick={handleIncrease}
        className={styles["circle-button"]}
        aria-label="Increase font size"
      >
        <span className={styles["hor-line"]} />
        <span className={styles["ver-line"]} />
      </button>
    </div>
  );
}
