import { Alert, Box, Snackbar } from "@mui/material";
import React, { useState } from "react";
import FlightInfo from "./FlightInfo";
import Fares from "./Fares";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/userSlice";

const Flights = ({
  originCity,
  destinationCity,
  departureFlights,
  setSelectedDepartureTicket,
  setDeparturePrice,
  selectedDepartureTicket,
  isReturn,
  setSelectedReturnTicket,
  selectedReturnTicket,
  setReturnPrice,
  returnFlights,
  goToPassengers,
  departurePrice,
  returnPrice,
  passengers,
  totalPrice,
  setTotalPrice,
}) => {
  const user = useSelector(selectUser);

  const [openError, setOpenError] = useState(false);

  const handleGoToPassangers = () => {
    if (user?.isAuthenticated) {
      goToPassengers();
    } else {
      setOpenError(true);
    }
  };

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  return (
    <Box>
      <FlightInfo
        id="departure"
        originCity={originCity}
        destinationCity={destinationCity}
        flights={departureFlights}
        setSelectedTicket={setSelectedDepartureTicket}
        selectedTicket={selectedDepartureTicket}
        setPrice={setDeparturePrice}
      ></FlightInfo>
      <FlightInfo
        id="return"
        originCity={destinationCity}
        destinationCity={originCity}
        flights={returnFlights}
        isReturn={isReturn}
        setSelectedTicket={setSelectedReturnTicket}
        selectedTicket={selectedReturnTicket}
        setPrice={setReturnPrice}
      ></FlightInfo>

      {/* Add luggage fares after selecting a plane ticket */}
      {selectedDepartureTicket && (isReturn ? selectedReturnTicket : true) && (
        <Fares
          passengers={passengers}
          departurePrice={departurePrice}
          returnPrice={returnPrice}
          goToPassengers={handleGoToPassangers}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        ></Fares>
      )}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Please log in to continue with your booking.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Flights;
