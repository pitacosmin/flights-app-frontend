import { Box, Divider, Grid } from "@mui/material";
import React from "react";
import FlightContent from "./FlightContent";

const DetailsContent = ({ reservation }) => {
  const isReturn = reservation.returnFlight !== null ? true : false;
  console.log(isReturn);
  return (
    <Grid container direction={"row"}>
      <Grid item xs={isReturn ? 6 : 12}>
        <FlightContent reservation={reservation}></FlightContent>
      </Grid>
      {isReturn ? (
        <Grid item xs={6} container direction={"row"}>
          <Grid item xs={0.2}>
            <Divider
              orientation="vertical"
              style={{
                width: "2px",
                color: "grey",
              }}
            ></Divider>
          </Grid>
          <Grid item xs={11.8}>
            <FlightContent
              reservation={reservation}
              isReturn={isReturn}
            ></FlightContent>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default DetailsContent;
