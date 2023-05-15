import { createSlice } from "@reduxjs/toolkit";

export const passengerSlice = createSlice({
  name: "bookingPassengers",
  initialState: [],
  reducers: {
    setPassengers: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    addSeatNumbers: (state, action) => {
      const { departureSeats, returnSeats } = action.payload;
      console.log("return seats", returnSeats);
      console.log("departure seats", departureSeats);
      return {
        ...state,
        passengerData: state.passengerData.map((passenger, index) => ({
          ...passenger,
          departureSeatNumber: departureSeats[index],
          returnSeatNumber: returnSeats ? returnSeats[index] : null,
        })),
      };
      // return {
      //   ...state.bookingPassengers.map((passenger, index) => {
      //     return {
      //       ...passenger,
      //       seatNumber: seatNumbers[index],
      //     };
      //   }),
      // };
    },
  },
});

export const { setPassengers, addSeatNumbers } = passengerSlice.actions;

export const selectPassengers = (state) => state.bookingPassengers;

export default passengerSlice.reducer;
