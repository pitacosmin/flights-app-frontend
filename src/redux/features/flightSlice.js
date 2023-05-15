import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flight",
  initialState: {},
  reducers: {
    setFlight: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setFlight } = flightSlice.actions;

export const selectFlight = (state) => state.flight;

export default flightSlice.reducer;
