import { createSlice } from "@reduxjs/toolkit";

export const ViewModes = {
  HOMELESS: "homeless",
  VOLUNTEER: "volunteer",
};
export const globalSlice = createSlice({
  name: "global",
  initialState: {
    viewMode: ViewModes.HOMELESS,
    markerPosition: null,
    events: [],
    // formInfo: null,
  },
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setMarkerPosition: (state, action) => {
      state.markerPosition = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setViewMode, setMarkerPosition, setEvents } =
  globalSlice.actions;

export default globalSlice.reducer;
