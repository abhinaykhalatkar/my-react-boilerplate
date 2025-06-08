// src/store/cookieConsentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the consent types (enum) and the available items.
export const consentDefinitions = [
  // { key: 'Analytics',  value: 'consent_analytics',  label: 'Analyse Cookies',         isCheckedByDef: false, disabled: false },
  // { key: 'Marketing',  value: 'consent_marketing',  label: 'Marketing Cookies',       isCheckedByDef: false, disabled: false },
  {
    key: "Functional",
    value: "consent_functional",
    label: "Funktionale Cookies (For Internal Use)",
    isCheckedByDef: true,
    disabled: true,
  },
];

// auto-generate enum
export const ConsentTypes = Object.freeze(
  consentDefinitions.reduce((acc, cur) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {} as Record<string, string>)
) as { [K in (typeof consentDefinitions)[number]["key"]]: string };

// For type safety
// DONT remove
export type ConsentTypes = (typeof ConsentTypes)[keyof typeof ConsentTypes];

// UI items
export const consentItems = consentDefinitions.map((d) => ({
  id: d.value,
  label: d.label,
  isCheckedByDef: d.isCheckedByDef,
  disabled: d.disabled,
}));

export function hasConsent(flag: ConsentTypes): boolean {
  try {
    const stored = JSON.parse(localStorage.getItem("cookie-consent") ?? "[]");
    return stored.includes(flag);
  } catch {
    return false;
  }
}

interface CookieConsentState {
  consentSelection: ConsentTypes[];
  isCookieConsentFormVisible: boolean;
}

// Read stored consent from localStorage (if available)
const storedConsent = localStorage.getItem("cookie-consent");
let initialConsent: ConsentTypes[] = [];
let initialVisibility = true;
if (storedConsent) {
  try {
    initialConsent = JSON.parse(storedConsent) as ConsentTypes[];
    initialVisibility = false;
  } catch (error) {
    console.error("Failed to parse stored consent", error);
    initialConsent = consentItems
      .filter((item) => item.isCheckedByDef)
      .map((item) => item.id);
    initialVisibility = true;
  }
} else {
  initialConsent = consentItems
    .filter((item) => item.isCheckedByDef)
    .map((item) => item.id);
  initialVisibility = true;
}

const initialState: CookieConsentState = {
  consentSelection: initialConsent,
  isCookieConsentFormVisible: initialVisibility,
};

const cookieConsentSlice = createSlice({
  name: "cookieConsent",
  initialState,
  reducers: {
    setConsentSelection(state, action: PayloadAction<ConsentTypes[]>) {
      state.consentSelection = action.payload;
    },
    toggleCookieConsentVisibility(
      state,
      action: PayloadAction<boolean | undefined>
    ) {
      if (action.payload !== undefined) {
        state.isCookieConsentFormVisible = action.payload;
      } else {
        state.isCookieConsentFormVisible = !state.isCookieConsentFormVisible;
      }
    },
    acceptAllConsents(state) {
      state.consentSelection = consentItems.map((item) => item.id);
      state.isCookieConsentFormVisible = false;
    },
    declineAllConsents(state) {
      state.consentSelection = [];
      state.isCookieConsentFormVisible = false;
    },
   resetCookies() {
      localStorage.removeItem("cookie-consent");
      return { ...initialState,isCookieConsentFormVisible:false };
    },
  },
});

export const {
  setConsentSelection,
  toggleCookieConsentVisibility,
  acceptAllConsents,
  declineAllConsents,
  resetCookies
} = cookieConsentSlice.actions;

export default cookieConsentSlice.reducer;
