import React, { useEffect, useState } from "react";
import { MdOutlineImageNotSupported, MdOutlineGrain } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import { MousePointer } from "lucide-react";
import styles from "./AppearanceAccessibilityFeatures.module.scss";
import { hasConsent } from "@Store/cookieConsentSlice";

type FeatureKey = "grayscale" | "pause-animations" | "big-cursor" | "hide-images";
type FeaturesState = Record<FeatureKey, boolean>;

type Feature = {
  key: FeatureKey;
  label: string;
  icon: React.ReactNode;
  cssClass: string;
};

const LOCALSTORAGE_KEY = "accessibility_features";

const features: Feature[] = [
  {
    key: "grayscale",
    label: "Grayscale",
    icon: <MdOutlineGrain className="w-5 h-5" />,
    cssClass: "grayscale",
  },
  {
    key: "pause-animations",
    label: "Pause Animations",
    icon: <FaRegStopCircle className="w-5 h-5" />,
    cssClass: "pause-animations",
  },
  {
    key: "big-cursor",
    label: "Big Cursor",
    icon: <MousePointer className="w-5 h-5" />,
    cssClass: "big-cursor",
  },
  {
    key: "hide-images",
    label: "Hide Images",
    icon: <MdOutlineImageNotSupported className="w-5 h-5" />,
    cssClass: "hide-images",
  },
];

const getDefaultState = (): FeaturesState => ({
  grayscale: false,
  "pause-animations": false,
  "big-cursor": false,
  "hide-images": false,
});

export default function AppearanceAccessibilityFeatures() {
  const [active, setActive] = useState<FeaturesState>(getDefaultState());

  // Initialization on mount: Load from localStorage
  useEffect(() => {
    const contentNode = document.getElementById("AppContent");
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);

    if (stored) {
      try {
        const parsed: FeaturesState = JSON.parse(stored);
        setActive(parsed);
        // Apply classes immediately from stored state
        Object.entries(parsed).forEach(([key, value]) => {
          const cssClass = features.find(f => f.key === key)?.cssClass;
          if (cssClass && contentNode) {
            if (value) {
              contentNode.classList.add(cssClass);
            } else {
              contentNode.classList.remove(cssClass);
            }
          }
        });
      } catch {
        console.error("Failed to parse accessibility features from storage");
      }
    }
  }, []);

  // Toggle features
  const toggleFeature = (key: FeatureKey, cssClass: string) => {
    const contentNode = document.getElementById("AppContent");
    
    setActive(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      
      // Check consent only for storage, not for applying state
      if (hasConsent("consent_functional" as any)) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newState));
      }

      // Always apply/remove classes regardless of consent
      if (contentNode) {
        if (newState[key]) {
          contentNode.classList.add(cssClass);
        } else {
          contentNode.classList.remove(cssClass);
        }
      }

      return newState;
    });
  };

  return (
    <div className={styles.accessibilityFeatures}>
      {features.map((feature) => (
        <button
          key={feature.key}
          type="button"
          onClick={() => toggleFeature(feature.key, feature.cssClass)}
          aria-pressed={active[feature.key]}
          className={`
            flex items-center gap-2 w-full my-1 px-3 py-2 rounded-md transition 
            ${active[feature.key] ? "bg-brand-light text-white" : "bg-bg-light dark:bg-bg-muted text-text-light dark:text-text-dark"}
            hover:bg-brand-faint dark:hover:bg-brand-dark
          `}
        >
          {feature.icon}
          <span className="text-sm font-medium">{feature.label}</span>
        </button>
      ))}
    </div>
  );
}
