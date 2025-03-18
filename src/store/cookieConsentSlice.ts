// src/store/cookieConsentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the consent types (enum) and the available items.
export enum ConsentTypes {
  Analytics = "consent_analytics",
  Marketing = "consent_marketing",
  Functional = "consent_functional"
}

// Define the cookie consent items.
// These can be updated in one place and will drive the UI.
export const consentItems = [
  { id: ConsentTypes.Analytics, label: "Analyse Cookies", isCheckedByDef: false },
  { id: ConsentTypes.Marketing, label: "Marketing Cookies", isCheckedByDef: false },
  { id: ConsentTypes.Functional, label: "Funktionale Cookies (For Internal Use)", disabled: true, isCheckedByDef: true },
];

interface CookieConsentState {
  consentSelection: ConsentTypes[];
  isCookieConsentFormVisible: boolean;
}

// Read stored consent from localStorage (if available)
const storedConsent = localStorage.getItem('cookie-consent');
let initialConsent: ConsentTypes[] = [];
let initialVisibility = true;
if (storedConsent) {
  try {
    initialConsent = JSON.parse(storedConsent) as ConsentTypes[];
    initialVisibility = false;
  } catch (error) {
    console.error("Failed to parse stored consent", error);
    initialConsent = consentItems.filter(item => item.isCheckedByDef).map(item => item.id);
    initialVisibility = true;
  }
} else {
  initialConsent = consentItems.filter(item => item.isCheckedByDef).map(item => item.id);
  initialVisibility = true;
}

const initialState: CookieConsentState = {
  consentSelection: initialConsent,
  isCookieConsentFormVisible: initialVisibility,
};

const cookieConsentSlice = createSlice({
  name: 'cookieConsent',
  initialState,
  reducers: {
    setConsentSelection(state, action: PayloadAction<ConsentTypes[]>) {
      state.consentSelection = action.payload;
    },
    toggleCookieConsentVisibility(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.isCookieConsentFormVisible = action.payload;
      } else {
        state.isCookieConsentFormVisible = !state.isCookieConsentFormVisible;
      }
    },
    acceptAllConsents(state) {
      state.consentSelection = consentItems.map(item => item.id);
      state.isCookieConsentFormVisible = false;
    },
    declineAllConsents(state) {
      state.consentSelection = [];
      state.isCookieConsentFormVisible = false;
    },
  },
});

export const { setConsentSelection, toggleCookieConsentVisibility, acceptAllConsents, declineAllConsents } =
  cookieConsentSlice.actions;

export default cookieConsentSlice.reducer;
