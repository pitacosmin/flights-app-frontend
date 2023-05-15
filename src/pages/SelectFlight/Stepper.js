import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Flights from "./Steps/Flights/Flights";
import Passengers from "./Steps/Passengers/Passengers";
import Seats from "./Steps/Seats/Seats";
import Payment from "./Steps/Payment/Payment";

const componentStepMap = {
  Flights: 0,
  Passengers: 1,
  Seats: 2,
  Payment: 3,
};

const HorizontalStepper = ({
  departureFlights,
  destinationCity,
  isReturn,
  originCity,
  selectedDepartureTicket,
  selectedReturnTicket,
  setSelectedDepartureTicket,
  setSelectedReturnTicket,
  returnFlights,
  passengers,
  setDeparturePrice,
  departurePrice,
  setReturnPrice,
  returnPrice,
  totalPrice,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [passengersData, setPassengersData] = useState([]);

  const handleStepChange = (component, step) => {
    const componentStep = componentStepMap[component];
    setActiveStep(step === undefined ? componentStep : step);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Flights
            departureFlights={departureFlights}
            setSelectedReturnTicket={setSelectedReturnTicket}
            setSelectedDepartureTicket={setSelectedDepartureTicket}
            selectedReturnTicket={selectedReturnTicket}
            destinationCity={destinationCity}
            isReturn={isReturn}
            originCity={originCity}
            selectedDepartureTicket={selectedDepartureTicket}
            returnFlights={returnFlights}
            goToPassengers={() => handleStepChange("Passengers")}
            setDeparturePrice={setDeparturePrice}
            setReturnPrice={setReturnPrice}
            departurePrice={departurePrice}
            returnPrice={returnPrice}
            passengers={passengers}
            totalPrice={totalPrice}
          />
        );
      case 1:
        return (
          <Passengers
            passengers={passengers}
            setPassengersData={setPassengersData}
            goToSeats={() => handleStepChange("Seats")}
            goBack={() => handleStepChange("Flights")}
          />
        );
      case 2:
        return (
          <Seats
            passengers={passengersData}
            setPassengers={setPassengersData}
            returnTicket={selectedReturnTicket}
            departureTicket={selectedDepartureTicket}
            originCity={originCity}
            destinationCity={destinationCity}
            goToPayment={() => handleStepChange("Payment")}
            goBack={() => handleStepChange("Passengers")}
          />
        );
      case 3:
        return (
          <Payment
            passengers={passengersData}
            goBack={() => handleStepChange("Seats")}
            totalPrice={totalPrice}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {Object.keys(componentStepMap)
          .sort((a, b) => componentStepMap[a] - componentStepMap[b])
          .map((component) => (
            <Step key={component}>
              <StepLabel>{component}</StepLabel>
            </Step>
          ))}
      </Stepper>
      {renderStepContent()}
    </Box>
  );
};

export default HorizontalStepper;
