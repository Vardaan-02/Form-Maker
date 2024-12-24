import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  showBorder: boolean;
  codeBorder: boolean;
}

const initialState: CounterState = {
  showBorder: true,
  codeBorder: false,
};

export const borderSlice = createSlice({
  name: "border",
  initialState,
  reducers: {
    toggleShowBorder: (state) => {
      return { ...state, showBorder: !state.showBorder };
    },
    toggleCodeBorder: (state) => {
      return { ...state, codeBorder: !state.codeBorder };
    },
  },
});

export const { toggleShowBorder, toggleCodeBorder } = borderSlice.actions;

export default borderSlice.reducer;
