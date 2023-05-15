import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import flightReducer from "../features/flightSlice";
import passengerReducer from "../features/passengerSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    flight: flightReducer,
    bookingPassengers: passengerReducer,
  },
});
