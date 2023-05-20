import { Grid, Typography, capitalize } from "@mui/material";
import React from "react";
import { formatTimeDifference } from "../../../../utils/formatDates";
import { LightLateGrey } from "../../../../assets/colors";

const PassengersFares = ({ flight, date, flights, price }) => {
  const passengerFares = Object.entries(flights?.passengerCounts)
    .filter(([_, count]) => count !== "0")
    .map(([passengerType, count]) => (
      <Typography key={passengerType}>
        {count} x {capitalize(passengerType)} Value Fare
      </Typography>
    ));

  return (
    <Grid item xs={12} padding={"20px 30px 0px 30px"}>
      <Grid container direction={"column"}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {flight?.route?.originAirport?.city?.cityName} to{" "}
            <b style={{ color: `${LightLateGrey}` }}>
              {flight?.route?.destinationAirport?.city?.cityName}
            </b>
          </Typography>
        </Grid>
        <Grid item xs={12} container direction={"row"} color={"grey"}>
          <Grid item>
            <Typography variant="caption">
              {date} •{"\u00A0"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {flight?.route?.departureTime.substring(0, 5)} -{" "}
              {flight?.route?.arrivalTime.substring(0, 5)} •{"\u00A0"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {flight?.route?.flightNumber}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} color={"grey"}>
          <Typography variant="caption">
            Direct flight •{" "}
            {formatTimeDifference(
              flight?.route?.departureTime,
              flight?.route?.arrivalTime
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} container direction={"row"} padding={"10px"}>
          <Grid item container direction={"column"} xs={4}>
            <Grid item>{passengerFares}</Grid>
            <Grid item padding={"5px 0px 0px 10px"} color={"grey"}>
              <Typography variant="body2">
                {Object.values(flights?.passengerCounts).reduce(
                  (acc, count) => acc + parseInt(count),
                  0
                )}{" "}
                x Small Bag (40cm x 20cm x 25cm)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="body1">
                Price for the departure flight:
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              container
              direction={"row"}
              alignItems={"flex-end"}
              color={LightLateGrey}
            >
              <Typography variant="caption" marginRight={"2px"}>
                €
              </Typography>
              <Typography variant="body1" fontWeight={"bold"}>
                {price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PassengersFares;
