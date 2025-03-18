// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import accessibilityReducer from './accessibilitySlice';

export const store = configureStore({
  reducer: {
    accessibility: accessibilityReducer,
  },
});

// Export RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
