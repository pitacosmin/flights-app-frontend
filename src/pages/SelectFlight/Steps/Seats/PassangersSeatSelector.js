import { Button, Grid } from "@mui/material";
import React from "react";
import RouteTitle from "./RouteTitle";
import { useSearchParams } from "react-router-dom";
import PassengersTable from "./PassengersTable";

const PassangersSeatSelector = ({
  originCity,
  destinationCity,
  returnTicket,
  passengers,
  setIsReturnSelected,
  isReturnSelected,
}) => {
  const [searchParams] = useSearchParams();
  const { origin, destination } = Object.fromEntries(searchParams.entries());

  const goToNextFlight = () => {
    setIsReturnSelected(true);
  };

  const goToPreviousFlight = () => {
    setIsReturnSelected(false);
  };

  return (
    <Grid item xs={6}>
      <RouteTitle
        originCity={!isReturnSelected ? originCity : destinationCity}
        destinationCity={!isReturnSelected ? destinationCity : originCity}
      ></RouteTitle>
      <Grid item xs={11}>
        <PassengersTable
          passengers={passengers}
          origin={origin}
          destination={destination}
          returnTicket={returnTicket}
          isReturnSelected={isReturnSelected}
        ></PassengersTable>
      </Grid>
      <Grid
        container
        direction={"row"}
        item
        xs={11}
        justifyContent={isReturnSelected ? "flex-start" : "flex-end"}
      >
        {isReturnSelected ? (
          <Button onClick={goToPreviousFlight}>Previous flight</Button>
        ) : null}

        {!isReturnSelected ? (
          <Button onClick={goToNextFlight}>Next flight</Button>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default PassangersSeatSelector;
