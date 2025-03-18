// src/store/accessibilitySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DisplaySize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface AccessibilityState {
  darkTheme: boolean;
  fontSizeMag: number;
  displaySize: DisplaySize;
}

const initialState: AccessibilityState = {
  darkTheme: false,
  fontSizeMag: 16,
  displaySize: {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 450,
    isTablet: window.innerWidth > 450 && window.innerWidth <= 1000,
    isDesktop: window.innerWidth > 1000,
  },
};

const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
    increaseFontSize(state) {
      if (state.fontSizeMag < 26) {
        state.fontSizeMag += 2;
      }
    },
    decreaseFontSize(state) {
      if (state.fontSizeMag > 16) {
        state.fontSizeMag -= 2;
      }
    },
    setDisplaySize(state, action: PayloadAction<DisplaySize>) {
      state.displaySize = action.payload;
    },
  },
});

export const { toggleTheme, increaseFontSize, decreaseFontSize, setDisplaySize } =
  accessibilitySlice.actions;

export default accessibilitySlice.reducer;
