import { createSlice } from "@reduxjs/toolkit";

export const ViewModes = {
  HOMELESS: "homeless",
  VOLUNTEER: "volunteer",
};
export const globalSlice = createSlice({
  name: "global",
  initialState: {
    viewMode: ViewModes.HOMELESS,
  },
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setViewMode } = globalSlice.actions;

export default globalSlice.reducer;
