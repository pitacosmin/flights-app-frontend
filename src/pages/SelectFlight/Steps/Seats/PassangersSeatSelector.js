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
  handleRandomSeatsPicker,
}) => {
  const [searchParams] = useSearchParams();
  const { origin, destination } = Object.fromEntries(searchParams.entries());
  return (
    <Grid item xs={5}>
      <Button fullWidth variant="contained" onClick={handleRandomSeatsPicker}>
        Continue without selecting seats
      </Button>
      <RouteTitle
        originCity={originCity}
        destinationCity={destinationCity}
      ></RouteTitle>
      <Grid item xs={11}>
        <PassengersTable
          passengers={passengers}
          origin={origin}
          destination={destination}
          returnTicket={returnTicket}
        ></PassengersTable>
      </Grid>
      <Grid
        container
        direction={"row"}
        item
        xs={11}
        justifyContent={"flex-end"}
      >
        <Button>Next flight</Button>
      </Grid>
    </Grid>
  );
};

export default PassangersSeatSelector;
