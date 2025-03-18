// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import accessibilityReducer from './accessibilitySlice';
import cookieConsentReducer from './cookieConsentSlice';

export const store = configureStore({
  reducer: {
    accessibility: accessibilityReducer,
    cookieConsent: cookieConsentReducer,
  },
});

// Export RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
